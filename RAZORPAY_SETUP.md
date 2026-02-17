# 🎉 Razorpay Payment Gateway - Setup Guide

## ✅ What's Been Implemented

Your FreshMart app now has a complete Razorpay payment integration with:

### Backend
- ✅ Razorpay SDK installed
- ✅ Payment controller with order creation and signature verification
- ✅ Payment routes (`/api/payment/create-order`, `/api/payment/verify`)
- ✅ Order model enhanced with payment tracking fields
- ✅ Support for both COD and Online payments

### Frontend
- ✅ Razorpay checkout script added
- ✅ Enhanced checkout UI with payment method selection
- ✅ Razorpay payment modal integration
- ✅ Payment verification and order creation flow

---

## 🚀 Setup Instructions

### Step 1: Get Razorpay API Keys

1. **Create a Razorpay account** (if you don't have one):
   - Go to https://razorpay.com/
   - Click "Sign Up" and create your account
   - Verify your email

2. **Get Test API Keys:**
   - Log in to Razorpay Dashboard
   - Go to **Settings** → **API Keys**
   - Click "Generate Test Key" (if not already generated)
   - You'll see:
     - **Key ID** (starts with `rzp_test_`)
     - **Key Secret** (click "Show" to reveal)

### Step 2: Configure Backend

1. **Create `.env` file** in `server` directory:

```bash
cd d:\FRESHMART\server
```

2. **Create/Edit `.env` file** with the following content:

```env
MONGO_URI=mongodb://localhost:27017/freshmart
JWT_SECRET=your_jwt_secret_key_here
PORT=5000

# Razorpay Test Credentials
RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXX
RAZORPAY_KEY_SECRET=YYYYYYYYYYYYYYYY
```

**Replace:**
- `rzp_test_XXXXXXXXXXXX` with your actual Test Key ID
- `YYYYYYYYYYYYYYYY` with your actual Test Key Secret

3. **Restart your backend server:**
   - Stop the running `npm run dev` in server terminal (Ctrl+C)
   - Start it again: `npm run dev`

---

## 💳 Testing the Payment Flow

### Test with COD (Cash on Delivery)

1. Navigate to http://localhost:5173/products
2. Add items to cart
3. Go to checkout
4. Fill delivery address
5. Select **"Cash on Delivery (COD)"**
6. Click "Place Order"
7. Order should be created successfully

### Test with Online Payment (Razorpay)

1. Navigate to http://localhost:5173/products
2. Add items to cart
3. Go to checkout
4. Fill delivery address
5. Select **"Pay Online (Razorpay)"**
6. Click "Place Order - Pay ₹XXX"
7. Razorpay modal opens
8. **Use these test card details:**
   - Card Number: `4111 1111 1111 1111`
   - CVV: Any 3 digits (e.g., `123`)
   - Expiry: Any future date (e.g., `12/25`)
   - Cardholder Name: Your name
9. Click "Pay"
10. Payment should succeed and order should be created

### Other Test Payment Methods

**Test UPI IDs:**
- `success@razorpay`
- `failure@razorpay`

**Test Wallets:**
- Select any wallet in test mode (all will work)

---

## 📋 Payment Method Features

### COD (Cash on Delivery)
- Direct order placement
- No payment gateway involved
- Payment status: "Completed"
- Best for: Testing, customers who prefer cash

### Online Payment (Razorpay)
- Secure payment gateway
- Multiple payment options:
  - Credit/Debit Cards
  - UPI
  - Net Banking
  - Wallets (Paytm, PhonePe, etc.)
- Payment verification with signature
- Payment status: "Completed" only after successful payment
- Best for: Real e-commerce transactions

---

## 🔍 Verifying Orders

After placing orders, you can verify them:

1. Navigate to http://localhost:5173/orders
2. You'll see all your orders with:
   - Order items
   - Delivery address
   - Payment method (COD or Online)
   - Payment status
   - Order status

---

## ⚠️ Important Notes

> [!IMPORTANT]
> **Test Mode Only**: The current setup uses Razorpay Test Mode. No real money will be charged.

> [!WARNING]
> **Don't Share Secrets**: Never commit your `.env` file to Git. It's already in `.gitignore`.

> [!NOTE]
> **Going Live**: To accept real payments, you'll need to:
> 1. Complete KYC verification in Razorpay Dashboard
> 2. Switch to Live API Keys (starts with `rzp_live_`)
> 3. Update `.env` with live keys

---

## 🛠️ Troubleshooting

### Backend server not starting?
- Make sure `.env` file exists in `d:\FRESHMART\server`
- Check if Razorpay keys are correctly set
- Restart the server

### Razorpay modal not opening?
- Check browser console for errors
- Ensure Razorpay script is loaded in `index.html`
- Verify internet connection (Razorpay needs to load externally)

### Payment verification failed?
- Check if backend `.env` has correct Razorpay keys
- Ensure backend server is running
- Check backend console logs for errors

---

## 📁 Files Modified/Created

### Backend
- ✅ `server/controllers/paymentController.js` - NEW
- ✅ `server/routes/paymentRoutes.js` - NEW
- ✅ `server/.env.example` - NEW
- ✅ `server/models/Order.js` - MODIFIED (added payment fields)
- ✅ `server/controllers/orderController.js` - MODIFIED
- ✅ `server/server.js` - MODIFIED (added payment routes)

### Frontend
- ✅ `frontend/index.html` - MODIFIED (added Razorpay script)
- ✅ `frontend/src/pages/Checkout.jsx` - MODIFIED (complete payment integration)

---

### Mock Payment Mode (No Keys Required)
The application now includes a **Mock Mode** for development.
- If you haven't added valid Razorpay keys to `.env`, the system will automatically use Mock Mode.
- You can click "Pay Online" and the order will be placed successfully without opening the Razorpay modal.
- This allows you to test the full order flow immediately!

## 🎯 Next Steps

1. ✅ Create your Razorpay account
2. ✅ Get Test API keys
3. ✅ Create `.env` file with keys
4. ✅ Restart backend server
5. ✅ Test COD order
6. ✅ Test Online payment order

**Your FreshMart app is now a real e-commerce platform! 🚀**
