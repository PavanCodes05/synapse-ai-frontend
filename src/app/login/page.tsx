"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState<"Admin" | "Faculty">("Admin");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Fake login delay
        setTimeout(() => {
            // Set a fake auth token cookie to bypass middleware on frontend
            document.cookie = "auth_token=dev_admin_token_xyz; path=/";
            router.push("/");
        }, 1500);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-slate-950">

            {/* Animated Background Gradients */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen animate-pulse [animation-delay:2s]" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

            <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-slate-900 border-2 border-cyan-500/50 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                        <ShieldCheck className="w-8 h-8 text-cyan-400" />
                    </div>
                    <h1 className="font-display text-3xl font-bold text-white tracking-tight text-center">
                        Synapse <span className="text-cyan-400">AI</span>
                    </h1>
                    <p className="text-slate-400 mt-2 text-center text-sm">Centralized Placement Authority</p>
                </div>

                <div className="glass rounded-3xl p-8 border border-white/5 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500" />

                    <div className="flex bg-slate-900/50 p-1 rounded-lg mb-8">
                        <button
                            onClick={() => setRole("Admin")}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${role === "Admin" ? "bg-cyan-500/20 text-cyan-400 shadow-[inset_0_0_0_1px_rgba(6,182,212,0.3)]" : "text-slate-400 hover:text-white"
                                }`}
                        >
                            Administrator
                        </button>
                        <button
                            onClick={() => setRole("Faculty")}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${role === "Faculty" ? "bg-purple-500/20 text-purple-400 shadow-[inset_0_0_0_1px_rgba(168,85,247,0.3)]" : "text-slate-400 hover:text-white"
                                }`}
                        >
                            Faculty
                        </button>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-400 ml-1 uppercase tracking-wider">Username</label>
                            <div className="relative group">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                                <input
                                    type="text"
                                    defaultValue={role === "Admin" ? "admin" : "faculty_cs"}
                                    className="w-full bg-slate-900/50 border border-slate-700/80 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-400 ml-1 uppercase tracking-wider">Security Key</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                                <input
                                    type="password"
                                    defaultValue="••••••••"
                                    className="w-full bg-slate-900/50 border border-slate-700/80 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono tracking-widest"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full relative group overflow-hidden rounded-xl bg-slate-800 p-[1px] mt-8"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-70 group-hover:opacity-100 transition-opacity bg-[length:200%_auto] animate-gradient" />
                            <div className="relative bg-slate-900 px-6 py-3 rounded-xl flex items-center justify-center gap-2 group-hover:bg-slate-900/80 transition-all">
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-slate-500 border-t-cyan-400 rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span className="text-sm font-semibold text-white tracking-wide">AUTHENTICATE</span>
                                        <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </div>
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center text-xs text-slate-600 font-mono">
                    SECURE ENCLAVE v1.0.0
                </div>
            </div>
        </div>
    );
}
