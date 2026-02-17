import React, { useEffect, useState } from 'react';
import api from '../api/client';
import toast from 'react-hot-toast';

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const { data } = await api.get('/admin/users');
            setUsers(data);
        } catch (error) {
            toast.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure? This cannot be undone.')) return;
        try {
            await api.delete(`/admin/users/${id}`);
            toast.success('User deleted');
            setUsers(users.filter(u => u._id !== id));
        } catch (error) {
            toast.error('Failed to delete user');
        }
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Manage Users</h1>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3 font-semibold text-slate-600">Name</th>
                            <th className="px-6 py-3 font-semibold text-slate-600">Email</th>
                            <th className="px-6 py-3 font-semibold text-slate-600">Joined</th>
                            <th className="px-6 py-3 font-semibold text-slate-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-8 text-center text-slate-500">No users found</td>
                            </tr>
                        ) : (
                            users.map(user => (
                                <tr key={user._id} className="hover:bg-slate-50">
                                    <td className="px-6 py-3 font-medium text-slate-800">{user.name}</td>
                                    <td className="px-6 py-3 text-slate-600">{user.email}</td>
                                    <td className="px-6 py-3 text-slate-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-3">
                                        <button
                                            onClick={() => handleDelete(user._id)}
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
