# FreshMart Frontend

**The Green Leaf Grocers** — Production-ready React frontend for the FreshMart MERN e-commerce platform.

## Stack

- **React 18** + **Vite**
- **React Router** v6
- **Tailwind CSS** v3
- **Axios** (API client with JWT interceptors)
- **React Hot Toast**
- **React Icons**

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure API URL (create `.env` from example):
   ```bash
   cp .env.example .env
   ```
   Set `VITE_API_URL` to your backend base URL, e.g. `http://localhost:5000/api`.

3. Run dev server:
   ```bash
   npm run dev
   ```
   App runs at `http://localhost:5173`. Ensure the backend is running (e.g. `npm run dev` in `../server`).

## Scripts

- `npm run dev` — Start Vite dev server
- `npm run build` — Production build (output in `dist/`)
- `npm run preview` — Preview production build locally

## Features (aligned with project brief)

- **User**: Browse products, add to cart, checkout (COD; Razorpay-ready), view orders & profile.
- **Vendor**: Dashboard, add products (admin approval flow), my products.
- **Admin**: Dashboard, manage users/vendors/products/orders (backend endpoints can be extended).
- **Auth**: JWT-based login/register; role-based routes (user, vendor, admin).
- **UI**: Responsive layout, Tailwind styling, toasts for feedback.

## Backend

Expects a Node/Express API mounted at `VITE_API_URL` with:

- `POST /auth/register`, `POST /auth/login`
- `GET /user/profile`
- `GET /products`, `POST /products` (vendor), `PUT /products/approve/:id` (admin)
- `GET /cart`, `POST /cart`, `DELETE /cart/:productId`
- `POST /orders`
- `GET /admin/dashboard`

See `server/` in the repo for the reference backend.
