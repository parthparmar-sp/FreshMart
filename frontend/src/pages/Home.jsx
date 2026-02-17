import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../state/AuthContext';
import api from '../api/client';
import toast from 'react-hot-toast';
import { useCart } from '../state/CartContext';

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    api.get('/products')
      .then(({ data }) => setProducts(data.slice(0, 4)))
      .catch(() => { });
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="py-12 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Featured Freshness</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden bg-slate-100 relative group">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-slate-800 mb-1 truncate">{product.name}</h3>
                <p className="text-primary font-bold">₹{product.price}</p>
                <button
                  onClick={() => {
                    addToCart(product);
                    toast.success('Added to cart');
                  }}
                  className="mt-3 w-full bg-slate-100 hover:bg-primary hover:text-white text-slate-700 font-medium py-2 rounded-lg transition-colors text-sm"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/products" className="text-primary font-semibold hover:underline">View All Products &rarr;</Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div>
      <section className="bg-gradient-to-br from-primary to-primary-light text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            FreshMart — The Green Leaf Grocers
          </h1>
          <p className="text-lg text-white/90 mb-8">
            Premium grocery e‑commerce. Browse fresh products, secure checkout, and role-based dashboards for Admin, Vendor & User.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/products"
              className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
            >
              Browse products
            </Link>
            {!isAuthenticated && (
              <Link
                to="/register"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Sign up
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Why FreshMart</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md border border-slate-100">
              <div className="text-3xl mb-3">🛒</div>
              <h3 className="font-bold text-slate-800 mb-2">User</h3>
              <p className="text-slate-600 text-sm">Browse products, add to cart, pay via Razorpay (or COD), track orders and download invoices.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border border-slate-100">
              <div className="text-3xl mb-3">🏪</div>
              <h3 className="font-bold text-slate-800 mb-2">Vendor</h3>
              <p className="text-slate-600 text-sm">Manage profile and products. Add items for admin approval; track your catalog.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border border-slate-100">
              <div className="text-3xl mb-3">⚙️</div>
              <h3 className="font-bold text-slate-800 mb-2">Admin</h3>
              <p className="text-slate-600 text-sm">Manage users, vendors, products (approve/update/delete) and orders from one dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      <FeaturedProducts />

      <section className="py-12 px-4 bg-slate-100">
        <div className="max-w-4xl mx-auto text-center text-slate-600">
          {/* <p className="text-sm">
            Built with <strong>MERN</strong> (MongoDB, Express, React, Node.js), <strong>JWT</strong> auth, <strong>Tailwind CSS</strong>, and RESTful APIs. Production-ready.
          </p> */}
        </div>
      </section>
    </div>
  );
}
