"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Bot,
    Users,
    Briefcase,
    LogOut
} from "lucide-react";
import clsx from "clsx";

const navigation = [
    { name: "Analytics Hub", href: "/", icon: LayoutDashboard },
    { name: "AI Shortlister", href: "/shortlist", icon: Bot },
    { name: "Talent Pool", href: "/students", icon: Users },
    { name: "Corporate Placements", href: "/placements", icon: Briefcase },
];

export function Sidebar() {
    const pathname = usePathname();

    // Hide sidebar on the login page
    if (pathname === "/login") return null;

    return (
        <div className="flex flex-col w-64 glass border-r border-slate-800/50 min-h-screen text-slate-300">
            <div className="h-16 flex items-center px-6 border-b border-slate-800/50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 neon-border flex items-center justify-center">
                        <span className="font-display font-bold text-cyan-400">S</span>
                    </div>
                    <span className="font-display font-semibold text-white tracking-wide">Synapse AI</span>
                </div>
            </div>

            <div className="flex-1 py-6 px-3 space-y-1">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={clsx(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                                isActive
                                    ? "bg-slate-800/50 text-cyan-400 shadow-[inset_2px_0_0_0_rgba(6,182,212,1)]"
                                    : "hover:bg-slate-800/30 hover:text-white"
                            )}
                        >
                            <item.icon className={clsx("w-5 h-5", isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-white")} />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t border-slate-800/50">
                <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/30 transition-all">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Sign Out</span>
                </button>
            </div>
        </div>
    );
}
