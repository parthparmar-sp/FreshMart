import React, { useEffect, useState } from 'react';
import api from '../api/client';
import toast from 'react-hot-toast';

export default function AdminProducts() {
    const [pendingProducts, setPendingProducts] = useState([]);
    const [approvedProducts, setApprovedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const [pendingRes, approvedRes] = await Promise.all([
                api.get('/products/pending'),
                api.get('/products') // This returns approved products
            ]);
            setPendingProducts(pendingRes.data);
            setApprovedProducts(approvedRes.data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            await api.put(`/products/approve/${id}`);
            toast.success('Product approved');
            fetchProducts(); // Refresh lists
        } catch (error) {
            toast.error('Failed to approve product');
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
            <h1 className="text-3xl font-bold text-slate-800 mb-8">Product Approvals</h1>

            {/* Pending Products Section */}
            <div className="mb-12">
                <h2 className="text-xl font-bold text-slate-700 mb-4 flex items-center gap-2">
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                        {pendingProducts.length} Pending
                    </span>
                    Awaiting Approval
                </h2>

                {pendingProducts.length === 0 ? (
                    <div className="bg-slate-50 rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
                        No pending products.
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pendingProducts.map((product) => (
                            <div key={product._id} className="bg-white rounded-xl border border-yellow-200 shadow-sm overflow-hidden">
                                <div className="p-4 border-b border-yellow-100 bg-yellow-50 flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-slate-800">{product.name}</h3>
                                        <p className="text-sm text-slate-600">Vendor: {product.vendor?.name || 'Unknown'}</p>
                                    </div>
                                    <span className="font-bold text-primary">₹{product.price}</span>
                                </div>
                                <div className="p-4">
                                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">{product.description}</p>
                                    <p className="text-xs text-slate-500 mb-4">Category: {product.category}</p>
                                    <button
                                        onClick={() => handleApprove(product._id)}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition-colors"
                                    >
                                        Approve Product
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Approved Products List (Read-only for now) */}
            <div>
                <h2 className="text-xl font-bold text-slate-700 mb-4">Live Products ({approvedProducts.length})</h2>
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 text-sm font-semibold text-slate-600">Product</th>
                                <th className="px-6 py-3 text-sm font-semibold text-slate-600">Vendor</th>
                                <th className="px-6 py-3 text-sm font-semibold text-slate-600">Price</th>
                                <th className="px-6 py-3 text-sm font-semibold text-slate-600">Category</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {approvedProducts.map((product) => (
                                <tr key={product._id} className="hover:bg-slate-50">
                                    <td className="px-6 py-3 font-medium text-slate-800">{product.name}</td>
                                    <td className="px-6 py-3 text-sm text-slate-600">{product.vendor?.name || 'FreshMart'}</td>
                                    <td className="px-6 py-3 text-sm text-slate-600">₹{product.price}</td>
                                    <td className="px-6 py-3 text-sm text-slate-600">{product.category}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
