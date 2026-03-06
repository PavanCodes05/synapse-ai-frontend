"use client";

import { useState, useEffect } from "react";
import { fetchApi } from "@/lib/api";
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
import { motion, Variants } from "framer-motion";

export default function AnalyticsDashboard() {
  const [loading, setLoading] = useState(true);

  // Dashboard State
  const [stats, setStats] = useState({
    total_students: 0,
    placed_students: 0,
    total_offers: 0,
    unique_companies: 0,
    placement_rate: 0
  });
  const [topCompanies, setTopCompanies] = useState<any[]>([]);
  const [performanceData, setPerformanceData] = useState<any[]>([]);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        // Fetch overview stats
        const overview = await fetchApi("/analytics/overview");
        setStats(overview);

        // Fetch top recruiters
        const recruiters = await fetchApi("/analytics/top-recruiters?limit=5");
        // Map the backend format to our frontend format
        setTopCompanies(recruiters.map((r: any) => ({
          name: r.company_name,
          offers: r.offer_count
        })));

        // TODO: We will need a specific timeseries endpoint for the chart
        // For now, keeping the mock performance data to maintain the visual
        setPerformanceData([
          { name: 'Aug', value: 30 },
          { name: 'Sep', value: 45 },
          { name: 'Oct', value: 70 },
          { name: 'Nov', value: 120 },
          { name: 'Dec', value: Math.floor(overview.total_offers * 0.4) },
          { name: 'Jan', value: Math.floor(overview.total_offers * 0.7) },
          { name: 'Feb', value: overview.total_offers || 340 },
        ]);

      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-slate-700 border-t-cyan-500 rounded-full animate-spin"></div>
        <div className="text-cyan-400 font-display animate-pulse tracking-widest text-glow-cyan">INITIALIZING DATA TERMINAL...</div>
      </div>
    );
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >

      {/* Bento Box Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <MetricCard
          title="Total Students"
          value={stats.total_students.toLocaleString()}
          icon={<Users className="w-6 h-6 text-cyan-400" />}
          trend="Registered in System"
          variants={itemVariants}
        />
        <MetricCard
          title="Placement Rate"
          value={`${stats.placement_rate.toFixed(1)}%`}
          icon={<TrendingUp className="w-6 h-6 text-purple-400" />}
          trend={`${stats.placed_students} students placed`}
          glow="purple"
          variants={itemVariants}
        />
        <MetricCard
          title="Total Offers"
          value={stats.total_offers.toLocaleString()}
          icon={<Briefcase className="w-6 h-6 text-emerald-400" />}
          trend="Generated across drives"
          variants={itemVariants}
        />
        <MetricCard
          title="Companies Visited"
          value={stats.unique_companies.toLocaleString()}
          icon={<Building2 className="w-6 h-6 text-blue-400" />}
          trend="Actively recruiting"
          variants={itemVariants}
        />

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2 glass rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-50 group-hover:opacity-100 transition-opacity" />
          <h2 className="font-display text-lg font-semibold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
            <span className="text-glow-cyan">Placement Trajectory (2025-2026)</span>
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
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                  itemStyle={{ color: '#22d3ee', fontWeight: 'bold' }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top Companies List */}
        <motion.div variants={itemVariants} className="glass rounded-2xl p-6">
          <h2 className="font-display text-lg font-semibold mb-6">Top Recruiters</h2>
          <div className="space-y-4">
            {topCompanies.length === 0 ? (
              <div className="text-slate-500 text-sm py-4 italic text-center">Data processing...</div>
            ) : topCompanies.map((company, i) => (
              <motion.div
                whileHover={{ x: 5, backgroundColor: 'rgba(30, 41, 59, 0.8)' }}
                key={company.name}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-slate-700/50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-slate-300 shadow-inner">
                    {i + 1}
                  </div>
                  <span className="font-medium text-slate-200">{company.name}</span>
                </div>
                <div className="text-cyan-400 font-semibold bg-cyan-500/10 px-3 py-1 rounded-full text-sm border border-cyan-500/20">
                  {company.offers} offers
                </div>
              </motion.div>
            ))}
          </div>
          <button className="w-full mt-6 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-500 transition-all text-sm font-medium">
            View All Companies
          </button>
        </motion.div>
      </div>

    </motion.div>
  );
}

function MetricCard({ title, value, icon, trend, glow = "cyan", variants }: { title: string, value: string, icon: React.ReactNode, trend: string, glow?: "cyan" | "purple", variants: any }) {
  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`glass rounded-2xl p-6 relative group overflow-hidden ${glow === "purple" ? "hover:neon-border-purple" : "hover:neon-border"} transition-all duration-300 cursor-pointer`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 shadow-inner group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
        <div className="font-display text-3xl font-bold text-white tracking-tight mb-2">
          {value}
        </div>
        <div className="text-xs text-slate-500 font-medium">{trend}</div>
      </div>

      {/* Background subtle glow */}
      <div className={`absolute -bottom-6 -right-6 w-32 h-32 rounded-full blur-3xl opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none ${glow === "purple" ? "bg-purple-500" : "bg-cyan-500"}`} />
    </motion.div>
  );
}
