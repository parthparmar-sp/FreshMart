import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api/client';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState({ items: [], itemCount: 0 });
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCart({ items: [], itemCount: 0 });
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.get('/cart');
      const items = data?.items || [];
      const itemCount = items.reduce((sum, i) => sum + (i.quantity || 0), 0);
      setCart({ ...data, items, itemCount });
    } catch {
      setCart({ items: [], itemCount: 0 });
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId, quantity = 1) => {
    const { data } = await api.post('/cart', { productId, quantity });
    const items = data?.items || [];
    const itemCount = items.reduce((sum, i) => sum + (i.quantity || 0), 0);
    setCart({ ...data, items, itemCount });
    return data;
  };

  const removeFromCart = async (productId) => {
    const { data } = await api.delete(`/cart/${productId}`);
    const items = data?.items || [];
    const itemCount = items.reduce((sum, i) => sum + (i.quantity || 0), 0);
    setCart({ ...data, items, itemCount });
    return data;
  };

  const value = {
    cart,
    loading,
    fetchCart,
    addToCart,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
