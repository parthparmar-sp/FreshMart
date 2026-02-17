import React, { useEffect, useState } from 'react';
import api from '../api/client';
import toast from 'react-hot-toast';

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await api.get('/orders/all');
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
            toast.error('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await api.put(`/orders/${orderId}/status`, { status: newStatus });
            toast.success('Order status updated');
            fetchOrders(); // Refresh list
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const handlePaymentStatusUpdate = async (orderId, newStatus) => {
        try {
            await api.put(`/orders/${orderId}/status`, { paymentStatus: newStatus });
            toast.success('Payment status updated');
            fetchOrders(); // Refresh list
        } catch (error) {
            toast.error('Failed to update payment status');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-8">Admin Dashboard - Orders</h1>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-700">Order ID</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Customer</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Date</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Items</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Total</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Payment</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {orders.map((order) => (
                                <tr key={order._id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-sm text-slate-600">
                                        #{order._id.slice(-6).toUpperCase()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-slate-800">{order.deliveryAddress?.fullName || 'N/A'}</div>
                                        <div className="text-xs text-slate-500">{order.user?.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        {order.items.length} items
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-800">
                                        ₹{order.totalAmount}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs text-slate-500">{order.paymentMethod}</span>
                                            <select
                                                value={order.paymentStatus}
                                                onChange={(e) => handlePaymentStatusUpdate(order._id, e.target.value)}
                                                className={`text-xs font-medium px-2 py-1 rounded border-0 cursor-pointer ${order.paymentStatus === 'Completed' ? 'bg-green-100 text-green-700' :
                                                        order.paymentStatus === 'Failed' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                                    }`}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Completed">Completed</option>
                                                <option value="Failed">Failed</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                            className={`text-sm font-medium px-3 py-1.5 rounded-lg border-slate-200 cursor-pointer outline-none focus:ring-2 focus:ring-primary/20 ${order.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-200' :
                                                    order.status === 'Cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
                                                        'bg-blue-50 text-blue-700 border-blue-200'
                                                }`}
                                        >
                                            <option value="Placed">Placed</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-slate-500">
                                        No orders found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
