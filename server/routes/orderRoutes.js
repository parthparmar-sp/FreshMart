import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
    createOrder,
    getUserOrders,
    getAllOrders,
    updateOrderStatus,
    getOrderById,
    cancelOrder
} from "../controllers/orderController.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

// User Routes
router.post("/", protect, createOrder);
router.get("/my-orders", protect, getUserOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/cancel", protect, cancelOrder);

// Admin Routes
router.get("/all", protect, isAdmin, getAllOrders);
router.put("/:id/status", protect, isAdmin, updateOrderStatus);

export default router;