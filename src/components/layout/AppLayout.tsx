"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { useState } from "react";
import { usePathname } from "next/navigation";

export function AppLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    // If we are on the login page, bypass layout wrappers
    if (pathname === "/login") {
        return <div className="flex-1 h-screen w-full">{children}</div>;
    }

    return (
        <div className="flex-1 flex h-screen w-full overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar Wrapper */}
            <div className={`fixed lg:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-spring lg:transform-none ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <Sidebar onClose={() => setIsSidebarOpen(false)} />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
                <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800/40 via-slate-900 to-slate-900 -z-10 pointer-events-none" />
                    {children}
                </main>
            </div>
        </div>
    );
}
