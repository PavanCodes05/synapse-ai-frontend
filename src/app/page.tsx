"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Briefcase,
  TrendingUp,
  Building2
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function AnalyticsDashboard() {
  const [loading, setLoading] = useState(true);

  // Fake data for the charts before connecting to backend
  const performanceData = [
    { name: 'Aug', value: 30 },
    { name: 'Sep', value: 45 },
    { name: 'Oct', value: 70 },
    { name: 'Nov', value: 120 },
    { name: 'Dec', value: 190 },
    { name: 'Jan', value: 250 },
    { name: 'Feb', value: 340 },
  ];

  const topCompanies = [
    { name: 'TCS', offers: 145 },
    { name: 'Cognizant', offers: 120 },
    { name: 'Infosys', offers: 95 },
    { name: 'Amazon', offers: 42 },
    { name: 'Google', offers: 18 },
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-slate-700 border-t-cyan-500 rounded-full animate-spin"></div>
        <div className="text-cyan-400 font-display animate-pulse tracking-widest">INITIALIZING DATA TERMINAL...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700">

      {/* Bento Box Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <MetricCard
          title="Total Students"
          value="1,024"
          icon={<Users className="w-6 h-6 text-cyan-400" />}
          trend="+12% from last year"
        />
        <MetricCard
          title="Placement Rate"
          value="68.5%"
          icon={<TrendingUp className="w-6 h-6 text-purple-400" />}
          trend="+5.2% from last year"
          glow="purple"
        />
        <MetricCard
          title="Total Offers"
          value="842"
          icon={<Briefcase className="w-6 h-6 text-emerald-400" />}
          trend="1.2 offers per student"
        />
        <MetricCard
          title="Companies Visited"
          value="45"
          icon={<Building2 className="w-6 h-6 text-blue-400" />}
          trend="8 new companies"
        />

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-50 group-hover:opacity-100 transition-opacity" />
          <h2 className="font-display text-lg font-semibold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Placement Trajectory (2025-2026)
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#22d3ee' }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Companies List */}
        <div className="glass rounded-2xl p-6">
          <h2 className="font-display text-lg font-semibold mb-6">Top Recruiters</h2>
          <div className="space-y-4">
            {topCompanies.map((company, i) => (
              <div key={company.name} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-slate-300">
                    {i + 1}
                  </div>
                  <span className="font-medium text-slate-200">{company.name}</span>
                </div>
                <div className="text-cyan-400 font-semibold bg-cyan-500/10 px-3 py-1 rounded-full text-sm">
                  {company.offers} offers
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-600 transition-all text-sm font-medium">
            View All Companies
          </button>
        </div>
      </div>

    </div>
  );
}

function MetricCard({ title, value, icon, trend, glow = "cyan" }: { title: string, value: string, icon: React.ReactNode, trend: string, glow?: "cyan" | "purple" }) {
  return (
    <div className={`glass rounded-2xl p-6 relative group overflow-hidden ${glow === "purple" ? "hover:neon-border-purple" : "hover:neon-border"} transition-all duration-300`}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
        <div className="font-display text-3xl font-bold text-white tracking-tight mb-2 group-hover:scale-105 origin-left transition-transform">
          {value}
        </div>
        <div className="text-xs text-slate-500 font-medium">{trend}</div>
      </div>

      {/* Background subtle glow */}
      <div className={`absolute -bottom-6 -right-6 w-32 h-32 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none ${glow === "purple" ? "bg-purple-500" : "bg-cyan-500"}`} />
    </div>
  );
}
