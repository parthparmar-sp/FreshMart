# FRESHMART E-COMMERCE - ULTIMATE MASTER PROMPT
## 100% Complete Production-Ready Frontend Implementation

---

# ⚠️ CRITICAL INSTRUCTIONS FOR AI/DEVELOPER

**READ THIS FIRST:**

This is NOT a partial implementation prompt. You MUST build a COMPLETE, FULLY FUNCTIONAL e-commerce application with ALL features working end-to-end. 

**COMPLETION REQUIREMENTS:**
- ✅ ALL 20+ pages fully implemented and functional
- ✅ Complete Redux state management working
- ✅ ALL API integrations connected to backend
- ✅ Full authentication flow (login, register, protected routes)
- ✅ Complete cart system with add/remove/update
- ✅ Full checkout with Razorpay payment integration
- ✅ Complete order management (create, view, track, cancel)
- ✅ Full admin panel with ALL CRUD operations
- ✅ Full vendor panel with ALL features
- ✅ Search, filter, sort - ALL working
- ✅ Responsive design on ALL pages
- ✅ Error handling on ALL forms and API calls
- ✅ Loading states on ALL async operations

**DO NOT:**
- ❌ Leave placeholder comments like "// Add logic here"
- ❌ Create partial implementations
- ❌ Skip any features mentioned in requirements
- ❌ Leave any "TODO" comments
- ❌ Create non-functional UI elements
- ❌ Skip error handling or validation

**BUILD EVERYTHING. MAKE IT WORK. NO SHORTCUTS.**

---

## 🎯 PROJECT OVERVIEW

**Project:** FreshMart - E-Commerce Grocery Platform  
**Backend:** Already completed (Node.js, Express, MongoDB, JWT, Razorpay)  
**Backend URL:** http://localhost:5000/api  
**Tech Stack:** React 18 + Vite + Redux Toolkit + Tailwind CSS + React Router v6

**Backend Modules Available:**
- ✅ User authentication (JWT)
- ✅ Product management
- ✅ Cart operations
- ✅ Order processing
- ✅ Vendor management
- ✅ Admin operations
- ✅ Razorpay payment integration

---

## 🎨 DESIGN SYSTEM (MANDATORY)

### Color Palette
```css
/* Primary Colors */
--primary-green: #2D5016;
--primary-dark: #1A3409;
--primary-light: #7A9B76;

/* Neutral Colors */
--white: #FFFFFF;
--bg-light: #F5F5F5;
--border-gray: #E0E0E0;
--text-dark: #333333;
--text-heading: #1F1F1F;
--text-muted: #666666;

/* Status Colors */
--success: #28A745;
--error: #DC3545;
--warning: #FFC107;
--info: #0066CC;

/* Accent */
--accent-orange: #FF6B35;
```

### Typography
```css
Font Family: 'Inter', system-ui, sans-serif
Headings: 'Poppins', sans-serif

Font Sizes:
- h1: 2.5rem (40px)
- h2: 2rem (32px)
- h3: 1.5rem (24px)
- body: 1rem (16px)
- small: 0.875rem (14px)
```

### Design Rules
- Clean, minimal, professional
- White backgrounds with subtle borders
- 8px spacing grid system
- Hover effects on interactive elements
- Consistent button styles
- NO emoji, NO purple colors, NO gradients

---

## 📁 COMPLETE PROJECT STRUCTURE

```
freshmart-frontend/
├── public/
│   ├── index.html
│   └── vite.svg
├── src/
│   ├── api/
│   │   ├── axios.config.js
│   │   ├── endpoints.js
│   │   └── services/
│   │       ├── authService.js
│   │       ├── productService.js
│   │       ├── cartService.js
│   │       ├── orderService.js
│   │       ├── vendorService.js
│   │       └── adminService.js
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Toast.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Spinner.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Table.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── Breadcrumb.jsx
│   │   │   └── ErrorBoundary.jsx
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── RoleBasedRoute.jsx
│   │   ├── product/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductFilter.jsx
│   │   │   ├── ProductSort.jsx
│   │   │   ├── ProductSearch.jsx
│   │   │   └── ProductImageGallery.jsx
│   │   ├── cart/
│   │   │   ├── CartItem.jsx
│   │   │   ├── CartSummary.jsx
│   │   │   ├── CartDrawer.jsx
│   │   │   └── EmptyCart.jsx
│   │   ├── order/
│   │   │   ├── OrderCard.jsx
│   │   │   ├── OrderDetails.jsx
│   │   │   ├── OrderTimeline.jsx
│   │   │   └── OrderStatusBadge.jsx
│   │   ├── admin/
│   │   │   ├── StatsCard.jsx
│   │   │   ├── UserTable.jsx
│   │   │   ├── VendorTable.jsx
│   │   │   ├── ProductTable.jsx
│   │   │   └── OrderTable.jsx
│   │   └── vendor/
│   │       ├── VendorStatsCard.jsx
│   │       ├── ProductForm.jsx
│   │       └── OrderManagement.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Orders.jsx
│   │   ├── OrderDetails.jsx
│   │   ├── Profile.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── NotFound.jsx
│   │   ├── admin/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Users.jsx
│   │   │   ├── Vendors.jsx
│   │   │   ├── Products.jsx
│   │   │   └── Orders.jsx
│   │   └── vendor/
│   │       ├── Dashboard.jsx
│   │       ├── MyProducts.jsx
│   │       ├── MyOrders.jsx
│   │       └── Profile.jsx
│   ├── redux/
│   │   ├── store.js
│   │   └── slices/
│   │       ├── authSlice.js
│   │       ├── productSlice.js
│   │       ├── cartSlice.js
│   │       ├── orderSlice.js
│   │       ├── vendorSlice.js
│   │       ├── adminSlice.js
│   │       └── uiSlice.js
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useCart.js
│   │   ├── useDebounce.js
│   │   ├── useLocalStorage.js
│   │   └── useToast.js
│   ├── utils/
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   ├── validators.js
│   │   ├── formatters.js
│   │   └── storage.js
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── .env
├── .env.example
├── .gitignore
├── package.json
├── tailwind.config.js
├── vite.config.js
├── postcss.config.js
└── README.md
```

---

## 🔥 COMPLETE BACKEND API ENDPOINTS

### Authentication APIs
```javascript
POST /api/auth/register
Body: { name, email, password, phone, role }
Response: { token, user }

POST /api/auth/login
Body: { email, password }
Response: { token, user }

GET /api/auth/profile
Headers: { Authorization: "Bearer <token>" }
Response: { user }

PUT /api/auth/profile
Headers: { Authorization: "Bearer <token>" }
Body: { name, phone, address }
Response: { user }
```

### Product APIs
```javascript
GET /api/products
Query: ?page=1&limit=12&category=&search=&minPrice=&maxPrice=&sort=
Response: { products, totalPages, currentPage, total }

GET /api/products/:id
Response: { product }

POST /api/products (Vendor/Admin only)
Headers: { Authorization: "Bearer <token>" }
Body: { name, description, price, category, stock, images }
Response: { product }

PUT /api/products/:id (Vendor/Admin only)
Headers: { Authorization: "Bearer <token>" }
Body: { name, description, price, category, stock }
Response: { product }

DELETE /api/products/:id (Vendor/Admin only)
Headers: { Authorization: "Bearer <token>" }
Response: { message }
```

### Cart APIs
```javascript
GET /api/cart
Headers: { Authorization: "Bearer <token>" }
Response: { cart: { items, totalAmount } }

POST /api/cart/add
Headers: { Authorization: "Bearer <token>" }
Body: { productId, quantity }
Response: { cart }

PUT /api/cart/update/:productId
Headers: { Authorization: "Bearer <token>" }
Body: { quantity }
Response: { cart }

DELETE /api/cart/remove/:productId
Headers: { Authorization: "Bearer <token>" }
Response: { cart }

DELETE /api/cart/clear
Headers: { Authorization: "Bearer <token>" }
Response: { message }
```

### Order APIs
```javascript
POST /api/orders
Headers: { Authorization: "Bearer <token>" }
Body: { 
  items, 
  shippingAddress: { name, phone, addressLine1, city, state, pincode },
  paymentMethod: "razorpay" or "cod",
  razorpayOrderId, razorpayPaymentId, razorpaySignature
}
Response: { order }

GET /api/orders
Headers: { Authorization: "Bearer <token>" }
Response: { orders }

GET /api/orders/:id
Headers: { Authorization: "Bearer <token>" }
Response: { order }

PUT /api/orders/:id/cancel
Headers: { Authorization: "Bearer <token>" }
Response: { order }

GET /api/orders/:id/invoice
Headers: { Authorization: "Bearer <token>" }
Response: PDF file
```

### Vendor APIs
```javascript
GET /api/vendor/products
Headers: { Authorization: "Bearer <token>" }
Response: { products }

GET /api/vendor/orders
Headers: { Authorization: "Bearer <token>" }
Response: { orders }

PUT /api/vendor/orders/:id/status
Headers: { Authorization: "Bearer <token>" }
Body: { status: "pending" | "processing" | "shipped" | "delivered" }
Response: { order }

GET /api/vendor/stats
Headers: { Authorization: "Bearer <token>" }
Response: { totalProducts, totalOrders, totalRevenue, pendingOrders }
```

### Admin APIs
```javascript
GET /api/admin/users
Headers: { Authorization: "Bearer <token>" }
Response: { users }

GET /api/admin/vendors
Headers: { Authorization: "Bearer <token>" }
Response: { vendors }

PUT /api/admin/vendors/:id/approve
Headers: { Authorization: "Bearer <token>" }
Response: { vendor }

DELETE /api/admin/users/:id
Headers: { Authorization: "Bearer <token>" }
Response: { message }

GET /api/admin/stats
Headers: { Authorization: "Bearer <token>" }
Response: { totalUsers, totalVendors, totalProducts, totalOrders, totalRevenue }
```

### Payment APIs
```javascript
POST /api/payment/create-order
Headers: { Authorization: "Bearer <token>" }
Body: { amount }
Response: { orderId, amount, currency }

POST /api/payment/verify
Headers: { Authorization: "Bearer <token>" }
Body: { razorpayOrderId, razorpayPaymentId, razorpaySignature }
Response: { success: true/false }
```

---

## 💻 STEP-BY-STEP IMPLEMENTATION GUIDE

### STEP 1: Initial Setup & Configuration

#### 1.1 Create Vite React Project
```bash
npm create vite@latest freshmart-frontend -- --template react
cd freshmart-frontend
npm install
```

#### 1.2 Install ALL Dependencies
```bash
# Core dependencies
npm install react-router-dom @reduxjs/toolkit react-redux axios

# UI & Forms
npm install react-hook-form @hookform/resolvers yup react-hot-toast react-icons

# Utilities
npm install date-fns clsx

# Razorpay
npm install razorpay

# Dev dependencies
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### 1.3 Configure Tailwind CSS

**tailwind.config.js:**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D5016',
          dark: '#1A3409',
          light: '#7A9B76',
        },
        accent: {
          orange: '#FF6B35',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

**src/styles/index.css:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply font-sans text-gray-900 bg-white;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-heading;
  }
}

@layer components {
  .btn-primary {
    @apply bg-primary hover:bg-primary-dark text-white font-medium px-6 py-2.5 rounded-lg transition-colors duration-200;
  }
  
  .btn-secondary {
    @apply bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-6 py-2.5 rounded-lg transition-colors duration-200;
  }
  
  .input-field {
    @apply w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent;
  }
  
  .card {
    @apply bg-white rounded-lg border border-gray-200 shadow-sm;
  }
}
```

#### 1.4 Environment Variables

**.env:**
```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

**.env.example:**
```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

---

### STEP 2: Axios Configuration & API Services

#### 2.1 Axios Instance

**src/api/axios.config.js:**
```javascript
import axios from 'axios';
import toast from 'react-hot-toast';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      toast.error('Session expired. Please login again.');
    } else {
      toast.error(message);
    }
    
    return Promise.reject(error);
  }
);

export default API;
```

#### 2.2 API Endpoints

**src/api/endpoints.js:**
```javascript
export const AUTH_ENDPOINTS = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  PROFILE: '/auth/profile',
  UPDATE_PROFILE: '/auth/profile',
};

export const PRODUCT_ENDPOINTS = {
  GET_ALL: '/products',
  GET_BY_ID: (id) => `/products/${id}`,
  CREATE: '/products',
  UPDATE: (id) => `/products/${id}`,
  DELETE: (id) => `/products/${id}`,
};

export const CART_ENDPOINTS = {
  GET: '/cart',
  ADD: '/cart/add',
  UPDATE: (productId) => `/cart/update/${productId}`,
  REMOVE: (productId) => `/cart/remove/${productId}`,
  CLEAR: '/cart/clear',
};

export const ORDER_ENDPOINTS = {
  CREATE: '/orders',
  GET_ALL: '/orders',
  GET_BY_ID: (id) => `/orders/${id}`,
  CANCEL: (id) => `/orders/${id}/cancel`,
  INVOICE: (id) => `/orders/${id}/invoice`,
};

export const VENDOR_ENDPOINTS = {
  PRODUCTS: '/vendor/products',
  ORDERS: '/vendor/orders',
  UPDATE_ORDER_STATUS: (id) => `/vendor/orders/${id}/status`,
  STATS: '/vendor/stats',
};

export const ADMIN_ENDPOINTS = {
  USERS: '/admin/users',
  VENDORS: '/admin/vendors',
  APPROVE_VENDOR: (id) => `/admin/vendors/${id}/approve`,
  DELETE_USER: (id) => `/admin/users/${id}`,
  STATS: '/admin/stats',
};

export const PAYMENT_ENDPOINTS = {
  CREATE_ORDER: '/payment/create-order',
  VERIFY: '/payment/verify',
};
```

#### 2.3 Complete API Services

**src/api/services/authService.js:**
```javascript
import API from '../axios.config';
import { AUTH_ENDPOINTS } from '../endpoints';

export const authService = {
  register: async (userData) => {
    const response = await API.post(AUTH_ENDPOINTS.REGISTER, userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await API.post(AUTH_ENDPOINTS.LOGIN, credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getProfile: async () => {
    const response = await API.get(AUTH_ENDPOINTS.PROFILE);
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await API.put(AUTH_ENDPOINTS.UPDATE_PROFILE, userData);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  },
};
```

**src/api/services/productService.js:**
```javascript
import API from '../axios.config';
import { PRODUCT_ENDPOINTS } from '../endpoints';

export const productService = {
  getAllProducts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await API.get(`${PRODUCT_ENDPOINTS.GET_ALL}?${queryString}`);
    return response.data;
  },

  getProductById: async (id) => {
    const response = await API.get(PRODUCT_ENDPOINTS.GET_BY_ID(id));
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await API.post(PRODUCT_ENDPOINTS.CREATE, productData);
    return response.data;
  },

  updateProduct: async (id, productData) => {
    const response = await API.put(PRODUCT_ENDPOINTS.UPDATE(id), productData);
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await API.delete(PRODUCT_ENDPOINTS.DELETE(id));
    return response.data;
  },
};
```

**src/api/services/cartService.js:**
```javascript
import API from '../axios.config';
import { CART_ENDPOINTS } from '../endpoints';

export const cartService = {
  getCart: async () => {
    const response = await API.get(CART_ENDPOINTS.GET);
    return response.data;
  },

  addToCart: async (productId, quantity = 1) => {
    const response = await API.post(CART_ENDPOINTS.ADD, { productId, quantity });
    return response.data;
  },

  updateCartItem: async (productId, quantity) => {
    const response = await API.put(CART_ENDPOINTS.UPDATE(productId), { quantity });
    return response.data;
  },

  removeFromCart: async (productId) => {
    const response = await API.delete(CART_ENDPOINTS.REMOVE(productId));
    return response.data;
  },

  clearCart: async () => {
    const response = await API.delete(CART_ENDPOINTS.CLEAR);
    return response.data;
  },
};
```

**src/api/services/orderService.js:**
```javascript
import API from '../axios.config';
import { ORDER_ENDPOINTS } from '../endpoints';

export const orderService = {
  createOrder: async (orderData) => {
    const response = await API.post(ORDER_ENDPOINTS.CREATE, orderData);
    return response.data;
  },

  getAllOrders: async () => {
    const response = await API.get(ORDER_ENDPOINTS.GET_ALL);
    return response.data;
  },

  getOrderById: async (id) => {
    const response = await API.get(ORDER_ENDPOINTS.GET_BY_ID(id));
    return response.data;
  },

  cancelOrder: async (id) => {
    const response = await API.put(ORDER_ENDPOINTS.CANCEL(id));
    return response.data;
  },

  downloadInvoice: async (id) => {
    const response = await API.get(ORDER_ENDPOINTS.INVOICE(id), {
      responseType: 'blob',
    });
    return response.data;
  },
};
```

**src/api/services/vendorService.js:**
```javascript
import API from '../axios.config';
import { VENDOR_ENDPOINTS } from '../endpoints';

export const vendorService = {
  getVendorProducts: async () => {
    const response = await API.get(VENDOR_ENDPOINTS.PRODUCTS);
    return response.data;
  },

  getVendorOrders: async () => {
    const response = await API.get(VENDOR_ENDPOINTS.ORDERS);
    return response.data;
  },

  updateOrderStatus: async (orderId, status) => {
    const response = await API.put(VENDOR_ENDPOINTS.UPDATE_ORDER_STATUS(orderId), { status });
    return response.data;
  },

  getVendorStats: async () => {
    const response = await API.get(VENDOR_ENDPOINTS.STATS);
    return response.data;
  },
};
```

**src/api/services/adminService.js:**
```javascript
import API from '../axios.config';
import { ADMIN_ENDPOINTS } from '../endpoints';

export const adminService = {
  getAllUsers: async () => {
    const response = await API.get(ADMIN_ENDPOINTS.USERS);
    return response.data;
  },

  getAllVendors: async () => {
    const response = await API.get(ADMIN_ENDPOINTS.VENDORS);
    return response.data;
  },

  approveVendor: async (vendorId) => {
    const response = await API.put(ADMIN_ENDPOINTS.APPROVE_VENDOR(vendorId));
    return response.data;
  },

  deleteUser: async (userId) => {
    const response = await API.delete(ADMIN_ENDPOINTS.DELETE_USER(userId));
    return response.data;
  },

  getAdminStats: async () => {
    const response = await API.get(ADMIN_ENDPOINTS.STATS);
    return response.data;
  },
};
```

---

### STEP 3: Redux Store Setup

#### 3.1 Store Configuration

**src/redux/store.js:**
```javascript
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import vendorReducer from './slices/vendorSlice';
import adminReducer from './slices/adminSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
    vendor: vendorReducer,
    admin: adminReducer,
    ui: uiReducer,
  },
});
```

#### 3.2 Auth Slice

**src/redux/slices/authSlice.js:**
```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../api/services/authService';
import toast from 'react-hot-toast';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user || null,
  isAuthenticated: !!user,
  loading: false,
  error: null,
};

// Async thunks
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await authService.register(userData);
      toast.success('Registration successful!');
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await authService.login(credentials);
      toast.success('Login successful!');
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await authService.updateProfile(userData);
      toast.success('Profile updated successfully!');
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Update failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      authService.logout();
      state.user = null;
      state.isAuthenticated = false;
      toast.success('Logged out successfully');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
```

#### 3.3 Product Slice

**src/redux/slices/productSlice.js:**
```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from '../../api/services/productService';

const initialState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    total: 0,
  },
  filters: {
    category: '',
    search: '',
    minPrice: '',
    maxPrice: '',
    sort: '',
  },
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params, { rejectWithValue }) => {
    try {
      const data = await productService.getAllProducts(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await productService.getProductById(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          total: action.payload.total,
        };
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload.product;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer;
```

#### 3.4 Cart Slice

**src/redux/slices/cartSlice.js:**
```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cartService } from '../../api/services/cartService';
import toast from 'react-hot-toast';

const initialState = {
  items: [],
  totalAmount: 0,
  itemCount: 0,
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const data = await cartService.getCart();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const data = await cartService.addToCart(productId, quantity);
      toast.success('Added to cart');
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add to cart');
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const data = await cartService.updateCartItem(productId, quantity);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update cart');
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId, { rejectWithValue }) => {
    try {
      const data = await cartService.removeFromCart(productId);
      toast.success('Removed from cart');
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove from cart');
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      await cartService.clearCart();
      toast.success('Cart cleared');
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to clear cart');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.cart?.items || [];
        state.totalAmount = action.payload.cart?.totalAmount || 0;
        state.itemCount = action.payload.cart?.items?.length || 0;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add to cart
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.cart?.items || [];
        state.totalAmount = action.payload.cart?.totalAmount || 0;
        state.itemCount = action.payload.cart?.items?.length || 0;
      })
      // Update cart item
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload.cart?.items || [];
        state.totalAmount = action.payload.cart?.totalAmount || 0;
      })
      // Remove from cart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload.cart?.items || [];
        state.totalAmount = action.payload.cart?.totalAmount || 0;
        state.itemCount = action.payload.cart?.items?.length || 0;
      })
      // Clear cart
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
        state.totalAmount = 0;
        state.itemCount = 0;
      });
  },
});

export default cartSlice.reducer;
```

#### 3.5 Order Slice

**src/redux/slices/orderSlice.js:**
```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderService } from '../../api/services/orderService';
import toast from 'react-hot-toast';

const initialState = {
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null,
};

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const data = await orderService.createOrder(orderData);
      toast.success('Order placed successfully!');
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create order');
    }
  }
);

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const data = await orderService.getAllOrders();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await orderService.getOrderById(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch order');
    }
  }
);

export const cancelOrder = createAsyncThunk(
  'orders/cancelOrder',
  async (id, { rejectWithValue }) => {
    try {
      const data = await orderService.cancelOrder(id);
      toast.success('Order cancelled successfully');
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to cancel order');
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload.order;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex(order => order._id === action.payload.order._id);
        if (index !== -1) {
          state.orders[index] = action.payload.order;
        }
        if (state.selectedOrder?._id === action.payload.order._id) {
          state.selectedOrder = action.payload.order;
        }
      });
  },
});

export default orderSlice.reducer;
```

#### 3.6 Vendor & Admin Slices

**src/redux/slices/vendorSlice.js:**
```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { vendorService } from '../../api/services/vendorService';
import { productService } from '../../api/services/productService';
import toast from 'react-hot-toast';

const initialState = {
  products: [],
  orders: [],
  stats: null,
  loading: false,
  error: null,
};

export const fetchVendorProducts = createAsyncThunk(
  'vendor/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const data = await vendorService.getVendorProducts();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const fetchVendorOrders = createAsyncThunk(
  'vendor/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const data = await vendorService.getVendorOrders();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const fetchVendorStats = createAsyncThunk(
  'vendor/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const data = await vendorService.getVendorStats();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const createVendorProduct = createAsyncThunk(
  'vendor/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const data = await productService.createProduct(productData);
      toast.success('Product created successfully');
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const updateVendorProduct = createAsyncThunk(
  'vendor/updateProduct',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const data = await productService.updateProduct(id, productData);
      toast.success('Product updated successfully');
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const deleteVendorProduct = createAsyncThunk(
  'vendor/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      await productService.deleteProduct(id);
      toast.success('Product deleted successfully');
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'vendor/updateOrderStatus',
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const data = await vendorService.updateOrderStatus(orderId, status);
      toast.success('Order status updated');
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVendorProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
      })
      .addCase(fetchVendorOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
      })
      .addCase(fetchVendorStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })
      .addCase(createVendorProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload.product);
      })
      .addCase(updateVendorProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p._id === action.payload.product._id);
        if (index !== -1) {
          state.products[index] = action.payload.product;
        }
      })
      .addCase(deleteVendorProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p._id !== action.payload);
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex(o => o._id === action.payload.order._id);
        if (index !== -1) {
          state.orders[index] = action.payload.order;
        }
      });
  },
});

export default vendorSlice.reducer;
```

**src/redux/slices/adminSlice.js:**
```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adminService } from '../../api/services/adminService';
import toast from 'react-hot-toast';

const initialState = {
  users: [],
  vendors: [],
  stats: null,
  loading: false,
  error: null,
};

export const fetchAllUsers = createAsyncThunk(
  'admin/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const data = await adminService.getAllUsers();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const fetchAllVendors = createAsyncThunk(
  'admin/fetchVendors',
  async (_, { rejectWithValue }) => {
    try {
      const data = await adminService.getAllVendors();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const fetchAdminStats = createAsyncThunk(
  'admin/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const data = await adminService.getAdminStats();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const approveVendor = createAsyncThunk(
  'admin/approveVendor',
  async (vendorId, { rejectWithValue }) => {
    try {
      const data = await adminService.approveVendor(vendorId);
      toast.success('Vendor approved successfully');
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      await adminService.deleteUser(userId);
      toast.success('User deleted successfully');
      return userId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
      })
      .addCase(fetchAllVendors.fulfilled, (state, action) => {
        state.vendors = action.payload.vendors;
      })
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })
      .addCase(approveVendor.fulfilled, (state, action) => {
        const index = state.vendors.findIndex(v => v._id === action.payload.vendor._id);
        if (index !== -1) {
          state.vendors[index] = action.payload.vendor;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(u => u._id !== action.payload);
      });
  },
});

export default adminSlice.reducer;
```

**src/redux/slices/uiSlice.js:**
```javascript
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarOpen: false,
  isCartDrawerOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
    toggleCartDrawer: (state) => {
      state.isCartDrawerOpen = !state.isCartDrawerOpen;
    },
    closeCartDrawer: (state) => {
      state.isCartDrawerOpen = false;
    },
  },
});

export const { toggleSidebar, closeSidebar, toggleCartDrawer, closeCartDrawer } = uiSlice.actions;
export default uiSlice.reducer;
```

---

### STEP 4: Common Components

[CONTINUING IN NEXT PART DUE TO LENGTH - THIS IS PART 1 OF 3]

**This master prompt will continue with:**
- Complete common components (Header, Footer, Navbar, etc.)
- All page implementations
- Forms with validation
- Protected routes
- Razorpay integration
- Complete routing setup
- Everything working end-to-end

**TOTAL LENGTH: ~15,000 lines of complete, production-ready code**

Would you like me to continue with Parts 2 and 3?
