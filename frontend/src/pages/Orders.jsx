import React, { useEffect, useState } from 'react';
import api from '../api/client';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/orders/my-orders');
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      toast.error('Failed to load order history');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-slate-600">Loading your orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">My Orders</h1>
        <div className="bg-white rounded-xl border border-slate-200 p-8">
          <p className="text-slate-600 mb-6">You haven't placed any orders yet.</p>
          <Link
            to="/products"
            className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-light transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            {/* Order Header */}
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex flex-wrap justify-between items-center gap-4">
              <div>
                <p className="text-sm text-slate-500">Order ID</p>
                <p className="font-mono text-sm font-medium text-slate-800">#{order._id.slice(-6).toUpperCase()}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Date Placed</p>
                <p className="font-medium text-slate-800">
                  {new Date(order.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Amount</p>
                <p className="font-bold text-slate-800">₹{order.totalAmount}</p>
              </div>
              <div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${order.status === 'Delivered'
                  ? 'bg-green-100 text-green-800'
                  : order.status === 'Cancelled'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-blue-100 text-blue-800'
                  }`}>
                  {order.status}
                </span>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-6">
              <div className="space-y-4">
                {order.items.map((item, index) => {
                  const product = item.product || {};
                  return (
                    <div key={index} className="flex gap-4 items-center">
                      <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            No Img
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-800">{product.name || 'Unknown Product'}</h3>
                        <p className="text-sm text-slate-500">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-slate-800">₹{(product.price || 0) * item.quantity}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-sm">
                <div className="text-slate-500">
                  Payment: <span className="font-medium text-slate-800">{order.paymentMethod}</span>
                  <span className={`ml-2 px-2 py-0.5 rounded text-xs ${order.paymentStatus === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                    {order.paymentStatus}
                  </span>
                </div>
                {order.deliveryAddress && (
                  <div className="text-right text-slate-500 max-w-xs truncate">
                    Delivering to: {order.deliveryAddress.city}, {order.deliveryAddress.pincode}
                  </div>
                )}
                <Link
                  to={`/orders/${order._id}`}
                  className="bg-primary text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-primary-light transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
