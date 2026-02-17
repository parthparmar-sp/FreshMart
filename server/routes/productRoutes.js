import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import {
  createProduct,
  approveProduct,
  getApprovedProducts,
  getPendingProducts
} from "../controllers/productController.js";

const router = express.Router();

// Vendor adds product
router.post(
  "/",
  protect,
  authorizeRoles("vendor"),
  createProduct
);

// Admin approves product
router.put(
  "/approve/:id",
  protect,
  authorizeRoles("admin"),
  approveProduct
);

// Admin views pending products
router.get(
  "/pending",
  protect,
  authorizeRoles("admin"),
  getPendingProducts
);

// Users view products
router.get("/", getApprovedProducts);

export default router;
