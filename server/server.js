import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import connectDB from './config/db.js';
// Route Imports
import authRoutes from './routes/authRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from './routes/adminRoutes.js'
import vendorRoutes from './routes/vendorRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';


connectDB();

const app = express();
// Middleware
app.use(cors());
app.use(express.json());

// Routes MOUNTS
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/admin', adminRoutes)
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);


//ROOT TESTING ROUTE
app.get("/", (req, res) => {
    res.send("FreshMart Server is Running");
});

//SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

})

