import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../state/CartContext';
import { useAuth } from '../state/AuthContext';

export default function Cart() {
  const { cart, loading, removeFromCart } = useCart();
  const { user } = useAuth();

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  const items = cart.items || [];
  const total = items.reduce((sum, item) => {
    const product = item.product;
    const price = product?.price ?? 0;
    const qty = item.quantity ?? 0;
    return sum + price * qty;
  }, 0);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-600 mb-6">Your cart is empty.</p>
        <Link to="/products" className="text-primary font-semibold hover:underline">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-8">Your cart</h1>
      <div className="space-y-4">
        {items.map((item) => {
          const product = item.product;
          const id = typeof product === 'object' ? product?._id : product;
          const name = product?.name ?? 'Product';
          const price = product?.price ?? 0;
          const qty = item.quantity ?? 0;
          const subtotal = price * qty;
          return (
            <div
              key={item._id || id}
              className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl border border-slate-200"
            >
              <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={product?.image || 'https://via.placeholder.com/100'}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${id}`} className="font-medium text-slate-800 hover:text-primary">
                  {name}
                </Link>
                <p className="text-sm text-slate-500">₹{price} × {qty} = ₹{subtotal}</p>
              </div>
              <button
                type="button"
                onClick={() => removeFromCart(id)}
                className="text-red-600 text-sm font-medium hover:underline"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
      <div className="mt-8 p-6 bg-slate-50 rounded-xl">
        <div className="flex justify-between text-lg font-semibold text-slate-800">
          <span>Total</span>
          <span>₹{total.toFixed(0)}</span>
        </div>
        <Link
          to="/checkout"
          className="mt-4 block w-full bg-primary text-white text-center font-semibold py-3 rounded-lg hover:bg-primary-light transition-colors"
        >
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
}
