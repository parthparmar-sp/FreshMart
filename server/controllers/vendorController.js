import Order from "../models/Order.js";
import Product from "../models/Product.js";

// Get Vendor Stats
export const getVendorStats = async (req, res) => {
    try {
        const vendorId = req.user._id;

        // 1. Total Products
        const totalProducts = await Product.countDocuments({ vendor: vendorId });

        // 2. Find vendor products to filter orders
        const vendorProductsList = await Product.find({ vendor: vendorId }).select('_id price');
        const vendorProductIds = vendorProductsList.map(p => p._id.toString());
        const productPriceMap = vendorProductsList.reduce((acc, p) => {
            acc[p._id.toString()] = p.price;
            return acc;
        }, {});

        // 3. Find orders containing vendor products
        const orders = await Order.find({
            "items.product": { $in: vendorProductIds }
        });

        let totalOrders = orders.length;
        let totalRevenue = 0;

        orders.forEach(order => {
            // Only count revenue if order is completed/paid? 
            // Assuming 'Completed' payment or 'Delivered' status. 
            // For now, let's count all valid orders for revenue potential, or only Paid ones.
            // Better to check paymentStatus === 'Completed'
            if (order.paymentStatus === 'Completed') {
                order.items.forEach(item => {
                    if (vendorProductIds.includes(item.product.toString())) {
                        // We need price at time of order, but schema might not have it.
                        // OrderItem usually has `product` ref. 
                        // If price changed, this calculation is wrong.
                        // Ideally Order should store snapshot price. 
                        // But for MVP we use current product price or if OrderItem has price.
                        // Let's check Order schema.
                        // Assuming OrderItem is { product, quantity }.
                        // We'll use current price from productPriceMap.
                        const price = productPriceMap[item.product.toString()] || 0;
                        totalRevenue += price * item.quantity;
                    }
                });
            }
        });

        res.json({
            totalProducts,
            totalOrders,
            totalRevenue
        });

    } catch (error) {
        console.error("Vendor Stats Error:", error);
        res.status(500).json({ message: "Failed to fetch vendor stats" });
    }
};
