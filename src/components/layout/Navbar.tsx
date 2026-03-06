"use client";

import { usePathname } from "next/navigation";
import { Search, Bell } from "lucide-react";

export function Navbar() {
    const pathname = usePathname();

    if (pathname === "/login") return null;

    // Simple title generator from pathname
    const title = pathname === "/" ? "Analytics Hub"
        : pathname === "/shortlist" ? "AI Shortlister"
            : pathname === "/students" ? "Talent Pool"
                : pathname === "/placements" ? "Corporate Placements"
                    : "Synapse AI";

    return (
        <div className="h-16 flex items-center justify-between px-8 glass border-b border-slate-800/50 sticky top-0 z-10 w-full">
            <div className="flex items-center gap-4">
                <h1 className="font-display text-xl font-semibold text-white tracking-wide">
                    {title}
                </h1>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative group hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search students..."
                        className="w-64 bg-slate-800/30 border border-slate-700/50 rounded-full py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                    />
                </div>

                <button className="relative text-slate-400 hover:text-white transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute 0 right-0 w-2 h-2 rounded-full bg-purple-500 neon-border-purple shadow-lg"></span>
                </button>

                <div className="flex items-center gap-3 pl-6 border-l border-slate-700/50">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 neon-border-purple flex items-center justify-center">
                        <span className="text-purple-400 font-bold text-sm">A</span>
                    </div>
                    <div className="text-sm">
                        <div className="font-medium text-white">Admin Profile</div>
                        <div className="text-xs text-slate-400">All Departments</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
