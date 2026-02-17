import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/client';
import toast from 'react-hot-toast';

export default function OrderDetails() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrder();
    }, [id]);

    const fetchOrder = async () => {
        try {
            const { data } = await api.get(`/orders/${id}`);
            setOrder(data);
        } catch (error) {
            toast.error("Failed to load order");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async () => {
        if (!window.confirm("Are you sure you want to cancel this order?")) return;
        try {
            await api.put(`/orders/${id}/cancel`);
            toast.success("Order cancelled");
            fetchOrder();
        } catch (error) {
            toast.error("Failed to cancel order");
        }
    };

    const handleDownloadInvoice = async () => {
        try {
            toast.loading("Generating invoice...");
            const response = await api.get(`/orders/${id}/invoice`, { responseType: 'blob' });

            // Create blob link to download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Invoice-${id}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();

            toast.dismiss();
            toast.success("Invoice downloaded");
        } catch (error) {
            toast.dismiss();
            toast.error("Failed to download invoice");
        }
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (!order) return <div className="p-8 text-center text-red-500">Order not found</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Order #{order._id.slice(-6)}</h1>
                <Link to="/orders" className="text-primary hover:underline">&larr; Back to Orders</Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Header */}
                <div className="bg-slate-50 p-6 border-b border-slate-200 flex flex-wrap justify-between gap-4">
                    <div>
                        <p className="text-sm text-slate-500">Order Date</p>
                        <p className="font-medium text-slate-800">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Total Amount</p>
                        <p className="font-medium text-slate-800">₹{order.totalAmount}</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Status</p>
                        <span className={`inline-block px-3 py-1 bg-white border rounded-full text-sm font-medium ${order.status === 'Cancelled' ? 'text-red-600 border-red-200' :
                            order.status === 'Delivered' ? 'text-green-600 border-green-200' :
                                'text-blue-600 border-blue-200'
                            }`}>
                            {order.status}
                        </span>
                    </div>
                </div>

                {/* Items */}
                <div className="p-6 border-b border-slate-200">
                    <h2 className="font-bold text-slate-800 mb-4">Items</h2>
                    <div className="space-y-4">
                        {order.items.map((item, idx) => (
                            <div key={idx} className="flex gap-4 items-center">
                                <div className="w-16 h-16 bg-slate-100 rounded-md overflow-hidden">
                                    <img
                                        src={item.product?.image || 'https://via.placeholder.com/100'}
                                        alt={item.product?.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-slate-800">{item.product?.name || 'Unknown Product'}</p>
                                    <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                                </div>
                                <p className="font-medium text-slate-800">₹{item.product?.price * item.quantity}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Shipping & Actions */}
                <div className="p-6 bg-slate-50 flex flex-col sm:flex-row justify-between gap-6">
                    <div>
                        <h3 className="font-bold text-slate-800 mb-2">Delivery Address</h3>
                        <p className="text-sm text-slate-600">{order.deliveryAddress?.fullName}</p>
                        <p className="text-sm text-slate-600">{order.deliveryAddress?.address}</p>
                        <p className="text-sm text-slate-600">
                            {order.deliveryAddress?.city}, {order.deliveryAddress?.state} - {order.deliveryAddress?.pincode}
                        </p>
                        <p className="text-sm text-slate-600">Phone: {order.deliveryAddress?.phone}</p>
                    </div>

                    <div className="flex flex-col gap-3 items-end">
                        <button
                            onClick={handleDownloadInvoice}
                            className="bg-white text-slate-700 px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors text-sm font-medium flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download Invoice
                        </button>

                        {order.status === 'Placed' && (
                            <button
                                onClick={handleCancel}
                                className="bg-red-50 text-red-600 px-4 py-2 rounded-lg border border-red-200 hover:bg-red-100 transition-colors text-sm font-medium"
                            >
                                Cancel Order
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
