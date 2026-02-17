import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

// Get Admin Stats
export const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalOrders = await Order.countDocuments();
        const totalProducts = await Product.countDocuments();

        // Calculate total revenue
        const orders = await Order.find({ paymentStatus: "Completed" });
        const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

        // ... existing stats code ...
        res.json({
            totalUsers,
            totalOrders,
            totalProducts,
            totalRevenue
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch admin stats" });
    }
};

// Get All Users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: "user" }).select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users" });
    }
};

// Get All Vendors
export const getAllVendors = async (req, res) => {
    try {
        const vendors = await User.find({ role: "vendor" }).select("-password");
        res.json(vendors);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch vendors" });
    }
};

// Delete User (Generic for any role)
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await user.deleteOne();
        res.json({ message: "User removed" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user" });
    }
};
