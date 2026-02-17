import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span>🥬</span> FreshMart
            </h3>
            <p className="text-slate-300 text-sm">
              The Green Leaf Grocers — premium grocery e‑commerce. MERN stack, JWT auth, role-based access for Admin, Vendor & User.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Quick links</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Register</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Tech</h3>
            <p className="text-slate-300 text-sm">
              React · Node.js · Express · MongoDB · JWT · Tailwind CSS
            </p>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-slate-400 text-sm">
          © {new Date().getFullYear()} FreshMart. Production-ready MERN e‑commerce.
        </div>
      </div>
    </footer>
  );
}
