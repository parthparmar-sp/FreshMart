import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import StatsCard from '../../components/StatsCard';
import { FaUsers, FaShoppingBag, FaBox, FaRupeeSign } from 'react-icons/fa';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/stats');
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch admin stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Admin Dashboard</h1>
      <p className="text-slate-600 mb-8">Overview of platform performance.</p>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Revenue"
            value={`₹${stats.totalRevenue.toLocaleString()}`}
            icon={<FaRupeeSign />}
            color="bg-green-500"
          />
          <StatsCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={<FaShoppingBag />}
            color="bg-blue-500"
          />
          <StatsCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<FaUsers />}
            color="bg-purple-500"
          />
          <StatsCard
            title="Total Products"
            value={stats.totalProducts}
            icon={<FaBox />}
            color="bg-orange-500"
          />
        </div>
      )}

      <h2 className="text-xl font-bold text-slate-800 mb-4">Quick Actions</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* ... existing cards ... */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-800 mb-1">Users</h2>
          <p className="text-sm text-slate-500 mb-4">Manage user accounts.</p>
          <Link to="/admin/users" className="text-primary text-sm font-medium hover:underline">
            Manage Users &rarr;
          </Link>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-800 mb-1">Vendors</h2>
          <p className="text-sm text-slate-500 mb-4">Approve and manage vendors.</p>
          <Link to="/admin/vendors" className="text-primary text-sm font-medium hover:underline">
            Manage Vendors &rarr;
          </Link>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-800 mb-1">Products</h2>
          <p className="text-sm text-slate-500 mb-4">Approve incoming vendor products.</p>
          <Link to="/admin/products" className="text-primary text-sm font-medium hover:underline">
            Manage Products &rarr;
          </Link>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-800 mb-1">Orders</h2>
          <p className="text-sm text-slate-500 mb-4">View and manage all orders.</p>
          <Link to="/admin/orders" className="text-primary text-sm font-medium hover:underline">
            Go to Orders &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
