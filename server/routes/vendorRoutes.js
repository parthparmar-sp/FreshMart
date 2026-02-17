import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { isVendor } from "../middleware/roleMiddleware.js";
import { createProduct, getVendorProducts, updateProduct, deleteProduct } from "../controllers/productController.js";
import { getVendorOrders } from "../controllers/orderController.js";

const router = express.Router();

// Product Management
router.post("/products", protect, isVendor, createProduct);
router.get("/products", protect, isVendor, getVendorProducts);
router.put("/products/:id", protect, isVendor, updateProduct);
router.delete("/products/:id", protect, isVendor, deleteProduct);

// Order Management
router.get("/orders", protect, isVendor, getVendorOrders);

import { getVendorStats } from "../controllers/vendorController.js";
router.get("/stats", protect, isVendor, getVendorStats);

export default router;
