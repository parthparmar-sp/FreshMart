import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../state/CartContext';
import { useAuth } from '../state/AuthContext';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error('Please log in to add to cart');
      return;
    }
    try {
      await addToCart(product._id, 1);
      toast.success('Added to cart');
    } catch {
      toast.error('Could not add to cart');
    }
  };

  const price = product.price != null ? product.price : 0;
  const fallbackImage = 'https://via.placeholder.com/400x400?text=FreshMart+Product';
  const image = product.image || fallbackImage;

  return (
    <Link to={`/product/${product._id}`} className="group block">
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="aspect-square bg-slate-100">
          <img
            src={image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              if (e.currentTarget.src !== fallbackImage) {
                e.currentTarget.src = fallbackImage;
              }
            }}
          />
        </div>
        <div className="p-4">
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
            {product.category || 'Uncategorized'}
          </span>
          <h3 className="font-semibold text-slate-800 mt-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-slate-500 mt-1 line-clamp-2">{product.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg font-bold text-primary">₹{price}</span>
            <button
              type="button"
              onClick={handleAddToCart}
              className="bg-primary text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary-light transition-colors"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
