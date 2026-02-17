import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import PDFDocument from "pdfkit";
import fs from "fs";
import sendEmail from "../utils/sendEmail.js";

export const createOrder = async (req, res) => {
  try {
    // 1. Validate delivery address
    const { deliveryAddress, paymentMethod } = req.body;

    if (!deliveryAddress || !deliveryAddress.fullName || !deliveryAddress.phone ||
      !deliveryAddress.address || !deliveryAddress.city || !deliveryAddress.pincode) {
      return res.status(400).json({ message: "Complete delivery address is required" });
    }

    // Validate phone (10 digits)
    if (!/^\d{10}$/.test(deliveryAddress.phone)) {
      return res.status(400).json({ message: "Phone must be 10 digits" });
    }

    // Validate pincode (6 digits)
    if (!/^\d{6}$/.test(deliveryAddress.pincode)) {
      return res.status(400).json({ message: "Pincode must be 6 digits" });
    }

    // 2. Get user cart
    const cart = await Cart.findOne({ user: req.user._id })
      .populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 3. check stock and Calculate total amount
    let totalAmount = 0;

    // Check stock availability
    for (const item of cart.items) {
      if (item.product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${item.product.name}. Available: ${item.product.stock}`
        });
      }
      totalAmount += item.product.price * item.quantity;
    }

    // 4. Create order
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
        pincode: deliveryAddress.pincode.trim()
      },
      paymentMethod: paymentMethod || "COD",
      paymentStatus: "Completed", // COD is considered completed on order placement
      status: "Placed"
    });

    // 5. Decrement stock
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { stock: -item.quantity }
      });
    }

    // 6. Clear cart after order
    cart.items = [];
    await cart.save();

    // Send Order Confirmation Email
    try {
      await sendEmail({
        email: req.user.email,
        subject: `Order Confirmation - #${order._id}`,
        message: `Hi ${req.user.name},\n\nThank you for your order! Your order ID is ${order._id}. Total Amount: Rs. ${order.totalAmount}.\n\nWe will notify you once it's shipped.\n\nBest Regards,\nThe FreshMart Team`,
        html: `
          <h1>Order Confirmation</h1>
          <p>Hi <strong>${req.user.name}</strong>,</p>
          <p>Thank you for your order! Your order ID is <strong>#${order._id}</strong>.</p>
          <p><strong>Total Amount:</strong> Rs. ${order.totalAmount}</p>
          <p>We will notify you once it's shipped.</p>
          <br/>
          <p>Best Regards,<br/>The FreshMart Team</p>
        `,
      });
    } catch (emailError) {
      console.error("Order confirmation email failed:", emailError.message);
    }

    res.status(201).json({
      message: "Order placed successfully",
      order
    });

  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({ message: "Order creation failed" });
  }
};

// Get logged-in user's orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("items.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// Get single order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Ensure user can only see their own order (unless admin)
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

// Cancel order
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (order.status !== 'Placed') {
      return res.status(400).json({ message: "Cannot cancel order at this stage" });
    }

    order.status = 'Cancelled';
    const updatedOrder = await order.save();

    // Send Cancellation Email
    try {
      // Ensure we have user email (might need populating if not already in req.user)
      const userEmail = req.user.email;
      await sendEmail({
        email: userEmail,
        subject: `Order Cancelled - #${order._id}`,
        message: `Hi,\n\nYour order #${order._id} has been cancelled successfully.\n\nBest Regards,\nThe FreshMart Team`,
        html: `
          <h1>Order Cancelled</h1>
          <p>Your order <strong>#${order._id}</strong> has been cancelled successfully.</p>
          <br/>
          <p>Best Regards,<br/>The FreshMart Team</p>
        `,
      });
    } catch (emailError) {
      console.error("Cancellation email failed:", emailError.message);
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to cancel order" });
  }
};

// --- ADMIN CONTROLLERS ---

// Get all orders (Admin only)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .populate("user", "name email") // Get user details
      .populate("items.product");

    res.json(orders);
  } catch (error) {
    console.error("Get All Orders Error:", error);
    res.status(500).json({ message: "Failed to fetch all orders" });
  }
};

// Update order status (Admin only)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (status) order.status = status;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    const updatedOrder = await order.save();

    // Send Status Update Email
    try {
      // We need to populate user to get email for admin status updates
      const populatedOrder = await Order.findById(order._id).populate("user", "name email");

      await sendEmail({
        email: populatedOrder.user.email,
        subject: `Order Update - #${order._id}`,
        message: `Hi ${populatedOrder.user.name},\n\nYour order #${order._id} status has been updated to: ${status || order.status}.\n\nBest Regards,\nThe FreshMart Team`,
        html: `
          <h1>Order Status Update</h1>
          <p>Hi <strong>${populatedOrder.user.name}</strong>,</p>
          <p>Your order <strong>#${order._id}</strong> status has been updated to: <strong>${status || order.status}</strong>.</p>
          <br/>
          <p>Best Regards,<br/>The FreshMart Team</p>
        `,
      });
    } catch (emailError) {
      console.error("Status update email failed:", emailError.message);
    }

    res.json(updatedOrder);
  } catch (error) {
    console.error("Update Order Error:", error);
    res.status(500).json({ message: "Failed to update order" });
  }
};

// Get orders containing vendor's products
export const getVendorOrders = async (req, res) => {
  try {
    // 1. Find all products belonging to this vendor
    const vendorProducts = await Product.find({ vendor: req.user._id }).select('_id');
    const vendorProductIds = vendorProducts.map(p => p._id);

    // 2. Find orders that contain any of these products
    const orders = await Order.find({
      "items.product": { $in: vendorProductIds }
    })
      .sort({ createdAt: -1 })
      .populate("user", "name email")
      .populate("items.product");

    res.json(orders);
  } catch (error) {
    console.error("Get Vendor Orders Error:", error);
    res.status(500).json({ message: "Failed to fetch vendor orders" });
  }
};

// Generate Invoice PDF
export const generateInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Ensure authorized
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Not authorized" });
    }

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=invoice-${order._id}.pdf`);

    doc.pipe(res);

    // Header
    doc.fontSize(20).text("FreshMart Invoice", { align: "center" });
    doc.moveDown();

    // Order Details
    doc.fontSize(12).text(`Order ID: ${order._id}`);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`);
    doc.text(`Status: ${order.status}`);
    doc.moveDown();

    // Customer / Shipping
    doc.text(`Billed To:`, { underline: true });
    doc.text(order.deliveryAddress.fullName);
    doc.text(order.deliveryAddress.address);
    doc.text(`${order.deliveryAddress.city}, ${order.deliveryAddress.pincode}`);
    doc.text(`Phone: ${order.deliveryAddress.phone}`);
    doc.moveDown();

    // Table Header
    const tableTop = 250;
    const itemX = 50;
    const qtyX = 300;
    const priceX = 370;
    const totalX = 450;

    doc.font("Helvetica-Bold");
    doc.text("Item", itemX, tableTop);
    doc.text("Qty", qtyX, tableTop);
    doc.text("Price", priceX, tableTop);
    doc.text("Total", totalX, tableTop);
    doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

    // Items
    let y = tableTop + 25;
    doc.font("Helvetica");

    order.items.forEach(item => {
      const productName = item.product?.name || "Unknown Item";
      const itemTotal = (item.product?.price || 0) * item.quantity;

      doc.text(productName.substring(0, 30), itemX, y);
      doc.text(item.quantity.toString(), qtyX, y);
      doc.text(`Rs. ${item.product?.price}`, priceX, y);
      doc.text(`Rs. ${itemTotal}`, totalX, y);
      y += 20;
    });

    doc.moveTo(50, y).lineTo(550, y).stroke();
    y += 10;

    // Totals
    doc.font("Helvetica-Bold");
    doc.text(`Total Amount: Rs. ${order.totalAmount}`, totalX - 50, y, { align: 'right', width: 150 });

    doc.end();

  } catch (error) {
    console.error("Invoice generation error:", error);
    res.status(500).json({ message: "Failed to generate invoice" });
  }
};

// ... existing admin controllers ...
