import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../state/AuthContext';
import { useCart } from '../state/CartContext';
import { HiOutlineMenu, HiOutlineX, HiOutlineShoppingCart, HiOutlineUser } from 'react-icons/hi';

export default function Header() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
            <span className="text-2xl">🥬</span>
            FreshMart
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-slate-600 hover:text-primary font-medium transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                {(user.role === 'user' || user.role === 'admin') && (
                  <Link
                    to="/cart"
                    className="relative p-2 text-slate-600 hover:text-primary transition-colors"
                  >
                    <HiOutlineShoppingCart className="w-6 h-6" />
                    {cart.itemCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {cart.itemCount}
                      </span>
                    )}
                  </Link>
                )}
                <div className="relative group">
                  <button className="flex items-center gap-2 text-slate-600 hover:text-primary">
                    <HiOutlineUser className="w-5 h-5" />
                    <span className="font-medium">{user.name}</span>
                  </button>
                  <div className="absolute right-0 mt-1 w-48 py-2 bg-white rounded-lg shadow-lg border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      onClick={() => setMobileOpen(false)}
                    >
                      Profile
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    {user.role === 'admin' && (
                      <Link
                        to="/admin/orders"
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        Manage Orders
                      </Link>
                    )}
                    {user.role === 'vendor' && (
                      <>
                        <Link
                          to="/vendor/dashboard"
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/vendor/products"
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          My Products
                        </Link>
                      </>
                    )}
                    {(user.role === 'user' || user.role === 'admin') && (
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        My Orders
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-600 hover:text-primary font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-light transition-colors"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-slate-100">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="block py-2 text-slate-600"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}
            {user ? (
              <div className="pt-4 space-y-2">
                <Link to="/profile" className="block py-2" onClick={() => setMobileOpen(false)}>
                  Profile
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin/dashboard" className="block py-2" onClick={() => setMobileOpen(false)}>
                    Admin
                  </Link>
                )}
                {user.role === 'vendor' && (
                  <>
                    <Link to="/vendor/dashboard" className="block py-2" onClick={() => setMobileOpen(false)}>
                      Dashboard
                    </Link>
                    <Link to="/vendor/products" className="block py-2" onClick={() => setMobileOpen(false)}>
                      My Products
                    </Link>
                  </>
                )}
                <Link to="/cart" className="block py-2" onClick={() => setMobileOpen(false)}>
                  Cart {cart.itemCount > 0 && `(${cart.itemCount})`}
                </Link>
                <Link to="/orders" className="block py-2" onClick={() => setMobileOpen(false)}>
                  Orders
                </Link>
                <button onClick={handleLogout} className="block py-2 text-red-600">
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-4 flex gap-4">
                <Link to="/login" className="text-primary font-medium" onClick={() => setMobileOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="text-primary font-medium" onClick={() => setMobileOpen(false)}>
                  Sign up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
