import React from 'react';

export default function StatsCard({ title, value, icon, color }) {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex items-center gap-4">
            <div className={`p-4 rounded-full ${color} text-white text-2xl`}>
                {icon}
            </div>
            <div>
                <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
                <p className="text-2xl font-bold text-slate-800">{value}</p>
            </div>
        </div>
    );
}
