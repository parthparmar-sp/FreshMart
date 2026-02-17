import React, { useEffect, useState } from 'react';
import api from '../api/client';
import toast from 'react-hot-toast';

export default function AdminVendors() {
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVendors();
    }, []);

    const fetchVendors = async () => {
        try {
            const { data } = await api.get('/admin/vendors');
            setVendors(data);
        } catch (error) {
            toast.error('Failed to fetch vendors');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure? This will delete the vendor and their products.')) return;
        try {
            await api.delete(`/admin/users/${id}`);
            toast.success('Vendor deleted');
            setVendors(vendors.filter(v => v._id !== id));
        } catch (error) {
            toast.error('Failed to delete vendor');
        }
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Manage Vendors</h1>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3 font-semibold text-slate-600">Company / Name</th>
                            <th className="px-6 py-3 font-semibold text-slate-600">Email</th>
                            <th className="px-6 py-3 font-semibold text-slate-600">Joined</th>
                            <th className="px-6 py-3 font-semibold text-slate-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {vendors.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-8 text-center text-slate-500">No vendors found</td>
                            </tr>
                        ) : (
                            vendors.map(vendor => (
                                <tr key={vendor._id} className="hover:bg-slate-50">
                                    <td className="px-6 py-3 font-medium text-slate-800">{vendor.name}</td>
                                    <td className="px-6 py-3 text-slate-600">{vendor.email}</td>
                                    <td className="px-6 py-3 text-slate-500">{new Date(vendor.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-3">
                                        <button
                                            onClick={() => handleDelete(vendor._id)}
                                            className="text-red-500 hover:text-red-700 font-medium text-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
