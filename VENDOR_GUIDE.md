# 🏪 Vendor Portal Guide

FreshMart now supports a multi-vendor marketplace model!

## 🚀 Getting Started as a Vendor

To access the Vendor Portal, you need a user account with the **`vendor`** role.

### How to Create a Vendor Account (Test Mode)
1. **Register** a new account on the signup page.
2. **Database Update**: Manually update the user's `role` to `"vendor"` in your MongoDB `users` collection.
   - *Note: In a future update, we can add a "Register as Vendor" checkbox to the signup form.*

## 📦 Managing Products

Go to **Vendor Dashboard** -> **My Products**.

- **Add Product**: Click "Add Product" and fill in the details.
  - *Note: Products are created with `isApproved: false` by default (Production Safety).*
  - **Admin Approval**: An Admin must log in and approve the product before it appears in the main store.
- **Delete Product**: Remove items you no longer sell.
- **View Status**: See if your product is "Live" or "Pending Review".

## 🚚 Managing Orders

Go to **Vendor Dashboard** -> **My Orders**.

- **View Orders**: See a list of all successful orders that contain **your** products.
- **Order Details**:
  - Customer Name & Location
  - Items ordered (quantity & price)
  - Current Status (Placed/Shipped/etc)

## 🔄 Workflow Example
1. **Vendor** adds "Organic Apples".
2. **Admin** approves "Organic Apples".
3. **User** buys "Organic Apples".
4. **Vendor** sees the order in "My Orders" and prepares shipment.
5. **Admin** updates order status to "Shipped" -> "Delivered".
