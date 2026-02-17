import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import StatsCard from '../../components/StatsCard';
import { FaBox, FaShoppingBag, FaRupeeSign } from 'react-icons/fa';

export default function VendorDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/vendor/stats');
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch vendor stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Vendor Dashboard</h1>
      <p className="text-slate-600 mb-8">Manage your profile and business performance.</p>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Revenue"
            value={`₹${stats.totalRevenue.toLocaleString()}`}
            icon={<FaRupeeSign />}
            color="bg-green-500"
          />
          <StatsCard
            title="My Products"
            value={stats.totalProducts}
            icon={<FaBox />}
            color="bg-orange-500"
          />
          <StatsCard
            title="Product Orders"
            value={stats.totalOrders}
            icon={<FaShoppingBag />}
            color="bg-blue-500"
          />
        </div>
      )}

      <h2 className="text-xl font-bold text-slate-800 mb-4">Quick Actions</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/vendor/products/new"
          className="block bg-white rounded-xl border border-slate-200 p-6 hover:border-primary hover:shadow-md transition-all"
        >
          <h2 className="font-semibold text-slate-800 mb-2">Add product</h2>
          <p className="text-sm text-slate-500">Create a new product; it will wait for admin approval.</p>
        </Link>
        <Link
          to="/vendor/products"
          className="block bg-white rounded-xl border border-slate-200 p-6 hover:border-primary hover:shadow-md transition-all"
        >
          <h2 className="font-semibold text-slate-800 mb-2">My products</h2>
          <p className="text-sm text-slate-500">View and manage your product catalog.</p>
        </Link>
        <Link
          to="/vendor/orders"
          className="block bg-white rounded-xl border border-slate-200 p-6 hover:border-primary hover:shadow-md transition-all"
        >
          <h2 className="font-semibold text-slate-800 mb-2">My Orders</h2>
          <p className="text-sm text-slate-500">View orders containing your products.</p>
        </Link>
      </div>
    </div>
  );
}
