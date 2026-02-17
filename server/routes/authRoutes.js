import express from 'express';
import { registerUser , loginUser } from '../controllers/authController.js';
import { protect } from "../middleware/authMiddleware.js";

const router =express.Router();

// Registration Route
router.post('/register',registerUser);

//Login Route
router.post('/login',loginUser);

export default router;