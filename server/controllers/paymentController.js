import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order for online payment
export const createRazorpayOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ message: "Invalid amount" });
        }

        // Mock mode for testing without keys
        if (!process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID.includes('YOUR_KEY_HERE')) {
            console.log("⚠️ Using Mock Razorpay Order (Keys not configured)");
            return res.json({
                orderId: `order_mock_${Date.now()}`,
                amount: amount * 100,
                currency: "INR",
                keyId: "test_key_id_mock",
                isMock: true
            });
        }

        const options = {
            amount: amount * 100, // Amount in paise (smallest currency unit)
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        res.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            keyId: process.env.RAZORPAY_KEY_ID,
        });
    } catch (error) {
        console.error("Razorpay Order Error:", error);
        res.status(500).json({ message: "Failed to create payment order" });
    }
};

// Verify payment and create order
export const verifyPaymentAndCreateOrder = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            deliveryAddress,
        } = req.body;

        // Mock verification
        if (razorpay_order_id.startsWith('order_mock_')) {
            console.log("⚠️ Verifying Mock Payment");
            // Skip signature check for mock
        } else {
            // Verify signature
            const sign = razorpay_order_id + "|" + razorpay_payment_id;
            const expectedSign = crypto
                .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                .update(sign.toString())
                .digest("hex");

            if (razorpay_signature !== expectedSign) {
                return res.status(400).json({ message: "Invalid payment signature" });
            }
        }

        // Validate delivery address
        if (
            !deliveryAddress ||
            !deliveryAddress.fullName ||
            !deliveryAddress.phone ||
            !deliveryAddress.address ||
            !deliveryAddress.city ||
            !deliveryAddress.pincode
        ) {
            return res
                .status(400)
                .json({ message: "Complete delivery address is required" });
        }

        // Get user cart
        const cart = await Cart.findOne({ user: req.user._id }).populate(
            "items.product"
        );

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Calculate total amount
        let totalAmount = 0;
        cart.items.forEach((item) => {
            totalAmount += item.product.price * item.quantity;
        });

        // Create order with payment details
        const order = await Order.create({
            user: req.user._id,
            items: cart.items,
            totalAmount,
            deliveryAddress: {
                fullName: deliveryAddress.fullName.trim(),
                phone: deliveryAddress.phone.trim(),
                address: deliveryAddress.address.trim(),
                city: deliveryAddress.city.trim(),
                state: deliveryAddress.state?.trim(),
                pincode: deliveryAddress.pincode.trim(),
            },
            paymentMethod: "Online",
            paymentStatus: "Completed",
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            razorpaySignature: razorpay_signature,
            status: "Placed",
        });

        // Clear cart after order
        cart.items = [];
        await cart.save();

        res.status(201).json({
            message: "Payment verified and order placed successfully",
            order,
        });
    } catch (error) {
        console.error("Payment Verification Error:", error);
        res.status(500).json({ message: "Payment verification failed" });
    }
};
