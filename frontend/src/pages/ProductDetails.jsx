import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/client';
import { useCart } from '../state/CartContext';
import { useAuth } from '../state/AuthContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    api.get('/products')
      .then(({ data }) => {
        const list = Array.isArray(data) ? data : [];
        const found = list.find((p) => p._id === id);
        setProduct(found || null);
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = async (qty = 1) => {
    if (!isAuthenticated) {
      toast.error('Please log in to add to cart');
      return;
    }
    if (!product) return;
    try {
      await addToCart(product._id, qty);
      toast.success('Added to cart');
    } catch {
      toast.error('Could not add to cart');
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-slate-600">
        Product not found.
      </div>
    );
  }

  const fallbackImage = 'https://via.placeholder.com/600x600?text=FreshMart+Product';
  const image = product.image || fallbackImage;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden md:flex">
        <div className="md:w-1/2 aspect-square bg-slate-100">
          <img
            src={image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              if (e.currentTarget.src !== fallbackImage) {
                e.currentTarget.src = fallbackImage;
              }
            }}
          />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full w-fit">
            {product.category || 'Uncategorized'}
          </span>
          <h1 className="text-3xl font-bold text-slate-800 mt-4">{product.name}</h1>
          <p className="text-slate-600 mt-4">{product.description}</p>
          {product.vendor?.name && (
            <p className="text-sm text-slate-500 mt-2">Vendor: {product.vendor.name}</p>
          )}

          <div className="flex items-center justify-between mt-6">
            <p className="text-2xl font-bold text-primary">₹{product.price}</p>
            {product.stock > 0 ? (
              <span className={`text-sm font-medium px-2 py-1 rounded ${product.stock < 10 ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                {product.stock < 10 ? `Only ${product.stock} left` : 'In Stock'}
              </span>
            ) : (
              <span className="text-sm font-medium px-2 py-1 rounded bg-red-100 text-red-800">
                Out of Stock
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => handleAddToCart(1)}
            disabled={product.stock <= 0}
            className={`mt-6 font-semibold px-6 py-3 rounded-lg transition-colors w-full md:w-auto ${product.stock > 0
                ? 'bg-primary text-white hover:bg-primary-light'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
          >
            {product.stock > 0 ? 'Add to cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}
