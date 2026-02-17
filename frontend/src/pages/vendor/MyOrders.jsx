import React, { useEffect, useState } from 'react';
import api from '../../api/client';
import toast from 'react-hot-toast';

export default function VendorOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await api.get('/vendor/orders');
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
            toast.error('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Vendor Orders</h1>
            <p className="text-slate-600 mb-8">View orders containing your products.</p>

            {orders.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                    <p className="text-slate-500">No orders found for your products yet.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex flex-wrap justify-between items-center gap-4">
                                <div>
                                    <span className="text-sm text-slate-500">Order ID:</span>
                                    <span className="ml-2 font-mono font-medium text-slate-800">#{order._id.slice(-6).toUpperCase()}</span>
                                </div>
                                <div>
                                    <span className="text-sm text-slate-500">Date:</span>
                                    <span className="ml-2 font-medium text-slate-800">{new Date(order.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                            order.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-4 border-b border-slate-50 last:border-0 pb-4 last:pb-0">
                                            <div className="w-12 h-12 bg-slate-100 rounded overflow-hidden flex-shrink-0">
                                                {item.product?.image && <img src={item.product.image} alt="" className="w-full h-full object-cover" />}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-slate-800">{item.product?.name || 'Unknown Product'}</p>
                                                <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-slate-800">₹{(item.product?.price || 0) * item.quantity}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 pt-4 border-t border-slate-100 text-right">
                                    <p className="text-sm text-slate-500">Customer: {order.deliveryAddress?.fullName} ({order.deliveryAddress?.city})</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
