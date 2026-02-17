import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";


const router = express.Router();
import {
  getAdminStats,
  getAllUsers,
  getAllVendors,
  deleteUser
} from "../controllers/adminController.js";

// example admin route
router.get("/dashboard", protect, isAdmin, (req, res) => {
  res.json({ message: "Welcome Admin" });
});

router.get("/stats", protect, isAdmin, getAdminStats);
router.get("/users", protect, isAdmin, getAllUsers);
router.get("/vendors", protect, isAdmin, getAllVendors);
router.delete("/users/:id", protect, isAdmin, deleteUser);

export default router;
