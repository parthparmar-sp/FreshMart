import express from 'express';
import {protect} from '../middleware/authMiddleware.js';
import {
    addToCart,
    getCart,
    removeFromCart
} from '../controllers/cartController.js';

const router = express.Router();
// Add item to cart
router.post('/', protect, addToCart);

// Get cart items
router.get('/', protect, getCart);      
// Remove item from cart
// Use :productId to match controller expectation
router.delete('/:productId', protect, removeFromCart);

export default router;