"use client";

import { useState } from "react";
import { Building2, FileText, ChevronRight, UploadCloud, X, Send } from "lucide-react";

export default function CorporatePlacements() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const jobDescriptions = [
        { title: "Software Engineer - Backend", company: "Google", requirements: "CGPA > 8.5, No arrears, Python/Go", date: "Oct 12, 2025", applicants: 45 },
        { title: "Data Scientist", company: "Amazon", requirements: "CGPA > 8.0, Machine Learning, AI Dept", date: "Oct 15, 2025", applicants: 32 },
        { title: "Frontend Developer", company: "Microsoft", requirements: "CGPA > 7.5, React, Next.js", date: "Nov 02, 2025", applicants: 56 },
        { title: "Systems Engineer", company: "TCS", requirements: "CGPA > 6.5, All Branches", date: "Jan 10, 2026", applicants: 210 },
    ];

    return (
        <div className="h-full flex flex-col gap-6 animate-in fade-in duration-700">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="font-display text-2xl font-semibold text-white">Corporate Placements</h1>
                    <p className="text-slate-400 text-sm mt-1">Manage Job Descriptions and track active recruitment drives.</p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex w-full sm:w-auto items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-medium transition-colors shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                >
                    <UploadCloud className="w-4 h-4" />
                    Upload New JD
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="glass rounded-2xl p-6 border-dashed border-2 hover:border-purple-500/50 hover:bg-slate-800/30 transition-all duration-300 flex flex-col items-center justify-center text-slate-500 hover:text-purple-400 h-64 group"
                >
                    <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <FileText className="w-8 h-8" />
                    </div>
                    <span className="font-display font-medium text-lg">Create Job Description</span>
                    <span className="text-sm mt-1 opacity-80 text-center">Paste JD text to extract shortlisting criteria</span>
                </button>
            </div>

            {/* Create JD Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                        onClick={() => setIsModalOpen(false)}
                    />

                    <div className="glass w-full max-w-2xl rounded-2xl border border-slate-700/50 shadow-2xl relative z-10 animate-in zoom-in-95 duration-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-800/80 flex justify-between items-center bg-slate-900/50 mt-0">
                            <h2 className="font-display text-xl font-semibold text-white flex items-center gap-2">
                                <UploadCloud className="w-5 h-5 text-purple-400" />
                                Extract JD Criteria
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Company Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Microsoft"
                                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Paste Job Description Text</label>
                                <textarea
                                    rows={6}
                                    placeholder="Paste the raw text here and our AI will automatically extract the exact CGPA, Arrears, and Department requirements..."
                                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all resize-none"
                                />
                            </div>
                        </div>

                        <div className="p-6 border-t border-slate-800/80 bg-slate-900/50 flex justify-end gap-3 mt-0">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-all font-medium text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-all font-medium text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                            >
                                <Send className="w-4 h-4" />
                                Extract via LLM
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

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
