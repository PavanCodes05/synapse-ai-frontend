"use client";

import { Building2, FileText, ChevronRight, UploadCloud } from "lucide-react";

export default function CorporatePlacements() {
    const jobDescriptions = [
        { title: "Software Engineer - Backend", company: "Google", requirements: "CGPA > 8.5, No arrears, Python/Go", date: "Oct 12, 2025", applicants: 45 },
        { title: "Data Scientist", company: "Amazon", requirements: "CGPA > 8.0, Machine Learning, AI Dept", date: "Oct 15, 2025", applicants: 32 },
        { title: "Frontend Developer", company: "Microsoft", requirements: "CGPA > 7.5, React, Next.js", date: "Nov 02, 2025", applicants: 56 },
        { title: "Systems Engineer", company: "TCS", requirements: "CGPA > 6.5, All Branches", date: "Jan 10, 2026", applicants: 210 },
    ];

    return (
        <div className="h-full flex flex-col gap-6 animate-in fade-in duration-700">

            <div className="flex justify-between items-center">
                <div>
                    <h1 className="font-display text-2xl font-semibold text-white">Corporate Placements</h1>
                    <p className="text-slate-400 text-sm mt-1">Manage Job Descriptions and track active recruitment drives.</p>
                </div>

                <button className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-medium transition-colors shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                    <UploadCloud className="w-4 h-4" />
                    Upload New JD
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {jobDescriptions.map((jd, idx) => (
                    <div key={idx} className="glass rounded-2xl p-6 group hover:neon-border-purple transition-all duration-300 relative overflow-hidden flex flex-col h-64">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-colors pointer-events-none" />

                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className="p-3 bg-slate-800/80 border border-slate-700/50 rounded-xl">
                                <Building2 className="w-6 h-6 text-purple-400" />
                            </div>
                            <span className="text-xs font-medium px-2.5 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded-full">
                                {jd.date}
                            </span>
                        </div>

                        <div className="relative z-10 flex-1">
                            <h3 className="font-display font-semibold text-lg text-white mb-1 group-hover:text-purple-400 transition-colors line-clamp-1">{jd.title}</h3>
                            <p className="text-cyan-400 font-medium text-sm mb-4">{jd.company}</p>

                            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3">
                                <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Criteria</p>
                                <p className="text-sm text-slate-300 line-clamp-2">{jd.requirements}</p>
                            </div>
                        </div>

                        <div className="pt-4 mt-auto border-t border-slate-700/50 flex justify-between items-center relative z-10">
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                <UsersIcon className="w-4 h-4" />
                                <span>{jd.applicants} Shortlisted</span>
                            </div>
                            <button className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-purple-500 group-hover:text-white transition-all">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}

                {/* Empty State / Add New Card */}
                <button className="glass rounded-2xl p-6 border-dashed border-2 hover:border-purple-500/50 hover:bg-slate-800/30 transition-all duration-300 flex flex-col items-center justify-center text-slate-500 hover:text-purple-400 h-64 group">
                    <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <FileText className="w-8 h-8" />
                    </div>
                    <span className="font-display font-medium text-lg">Create Job Description</span>
                    <span className="text-sm mt-1 opacity-80">Paste JD text to extract shortlisting criteria</span>
                </button>
            </div>
        </div>
    );
}

// Temporary icon to avoid importing lucide-react again in the middle
function UsersIcon(props: any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 00-4-4H6a4 00-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 00-3-3.87" />
            <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
    );
}
