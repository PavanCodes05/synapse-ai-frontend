"use client";

import { useState, useEffect } from "react";
import { fetchApi } from "@/lib/api";
import { Building2, FileText, ChevronRight, UploadCloud, X, Send } from "lucide-react";

export default function CorporatePlacements() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jobDescriptions, setJobDescriptions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal Form State
    const [newJdTitle, setNewJdTitle] = useState("");
    const [newJdText, setNewJdText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const loadJobs = async () => {
        try {
            const data = await fetchApi("/jobs/");
            setJobDescriptions(data);
        } catch (error) {
            console.error("Failed to load jobs", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadJobs();
    }, []);

    const handleCreateJD = async () => {
        if (!newJdTitle || !newJdText) return;

        setIsSubmitting(true);
        try {
            await fetchApi("/jobs/", {
                method: "POST",
                body: JSON.stringify({
                    title: newJdTitle,
                    description_text: newJdText
                })
            });
            setIsModalOpen(false);
            setNewJdTitle("");
            setNewJdText("");
            loadJobs(); // Refresh the list
        } catch (error) {
            console.error("Failed to create JD", error);
        } finally {
            setIsSubmitting(false);
        }
    };

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
                {loading ? (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center py-12">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-8 h-8 border-4 border-slate-700 border-t-purple-500 rounded-full animate-spin"></div>
                            <span className="text-purple-400 font-mono text-sm tracking-widest animate-pulse">FETCHING DRIVES...</span>
                        </div>
                    </div>
                ) : jobDescriptions.map((jd) => (
                    <div key={jd.id} className="glass rounded-2xl p-6 group hover:neon-border-purple transition-all duration-300 relative overflow-hidden flex flex-col h-64">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-colors pointer-events-none" />

                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className="p-3 bg-slate-800/80 border border-slate-700/50 rounded-xl">
                                <Building2 className="w-6 h-6 text-purple-400" />
                            </div>
                            <span className="text-xs font-medium px-2.5 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded-full">
                                Active
                            </span>
                        </div>

                        <div className="relative z-10 flex-1">
                            <h3 className="font-display font-semibold text-lg text-white mb-1 group-hover:text-purple-400 transition-colors line-clamp-1">{jd.title}</h3>
                            <p className="text-cyan-400 font-medium text-sm mb-4">Partner Company</p>

                            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3">
                                <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Criteria Snippet</p>
                                <p className="text-sm text-slate-300 line-clamp-2">{jd.description_text}</p>
                            </div>
                        </div>

                        <div className="pt-4 mt-auto border-t border-slate-700/50 flex justify-between items-center relative z-10">
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                <UsersIcon className="w-4 h-4" />
                                <span>Parse internally</span>
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
                                <label className="block text-sm font-medium text-slate-400 mb-1">Company / Job Title</label>
                                <input
                                    type="text"
                                    value={newJdTitle}
                                    onChange={(e) => setNewJdTitle(e.target.value)}
                                    placeholder="e.g. Microsoft - Software Engineer"
                                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Paste Job Description Text</label>
                                <textarea
                                    value={newJdText}
                                    onChange={(e) => setNewJdText(e.target.value)}
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
                                onClick={handleCreateJD}
                                disabled={isSubmitting || !newJdTitle || !newJdText}
                                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 disabled:opacity-50 text-white transition-all font-medium text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.3)] disabled:shadow-none"
                            >
                                {isSubmitting ? (
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <Send className="w-4 h-4" />
                                )}
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
