"use client";

import { useState } from "react";
import { fetchApi } from "@/lib/api";
import { Send, Bot, FileText, Download, CheckCircle2 } from "lucide-react";

export default function AIShortlister() {
    const [query, setQuery] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [results, setResults] = useState<any[] | null>(null);
    const [explanation, setExplanation] = useState<string | null>(null);

    const handleQuery = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query) return;

        setIsProcessing(true);
        setResults(null);
        setExplanation(null);

        try {
            const data = await fetchApi("/chatbot/shortlist", {
                method: "POST",
                body: JSON.stringify({ job_description: query })
            });

            // Map backend student models to frontend grid layout
            const formattedResults = data.students.map((student: any) => ({
                id: student.register_number,
                name: student.name,
                dept: student.department,
                cgpa: student.cgpa,
                offers: student.is_placed ? 1 : 0
            }));

            setResults(formattedResults);
            setExplanation(data.explanation);
        } catch (error) {
            console.error("AI Query Error:", error);
            // In a real app we'd show a toast error notification here
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-6 animate-in fade-in duration-700">

            {/* Left Pane - Command Center */}
            <div className="w-full lg:w-1/3 flex flex-col gap-4">
                <div className="glass rounded-2xl p-6 flex-1 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full" />

                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-purple-500/20 rounded-lg border border-purple-500/30">
                            <Bot className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <h2 className="font-display font-semibold text-lg text-white">AI Command Center</h2>
                            <p className="text-xs text-slate-400">Natural Language to SQL Engine</p>
                        </div>
                    </div>

                    <div className="flex-1 bg-slate-900/50 rounded-xl border border-slate-700/50 p-4 mb-4 overflow-y-auto space-y-4">
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex-shrink-0 flex items-center justify-center">
                                <Bot className="w-4 h-4 text-purple-400" />
                            </div>
                            <div className="bg-slate-800/80 rounded-2xl rounded-tl-none px-4 py-3 border border-slate-700/50 text-sm text-slate-300">
                                Hello! Paste a Job Description or type your criteria below (e.g., "Find all unplaced students with CGPA &gt; 8.0 and no arrears").
                            </div>
                        </div>

                        {isProcessing && (
                            <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2">
                                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex-shrink-0 flex items-center justify-center">
                                    <Bot className="w-4 h-4 text-purple-400 animate-pulse" />
                                </div>
                                <div className="bg-slate-800/80 rounded-2xl rounded-tl-none px-4 py-3 border border-purple-500/30 text-sm text-purple-200 flex items-center gap-2">
                                    <div className="flex space-x-1">
                                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" />
                                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                    <span className="ml-2 font-mono text-xs">Translating to SQL...</span>
                                </div>
                            </div>
                        )}

                        {results && (
                            <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2">
                                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex-shrink-0 flex items-center justify-center">
                                    <Bot className="w-4 h-4 text-cyan-400" />
                                </div>
                                <div className="bg-slate-800/80 rounded-2xl rounded-tl-none px-4 py-3 border border-cyan-500/30 text-sm text-cyan-50 flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-cyan-400 font-medium">
                                        <CheckCircle2 className="w-4 h-4" />
                                        Query Execution Successful
                                    </div>
                                    <div className="text-slate-300">
                                        {explanation || `Found ${results.length} eligible candidates matching your criteria.`}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleQuery} className="relative group">
                        <textarea
                            placeholder="Enter criteria or paste job description..."
                            className="w-full h-24 bg-slate-800/50 border border-slate-700/80 rounded-xl p-3 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all resize-none"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleQuery(e);
                                }
                            }}
                        />
                        <button
                            type="submit"
                            disabled={!query || isProcessing}
                            className="absolute right-3 bottom-3 p-2 bg-purple-500 hover:bg-purple-600 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg transition-colors"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </div>

            {/* Right Pane - Results DataGrid */}
            <div className="w-full lg:w-2/3 glass rounded-2xl p-6 flex flex-col relative overflow-hidden transition-all duration-500">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-cyan-500/20 rounded-lg border border-cyan-500/30">
                            <FileText className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                            <h2 className="font-display font-semibold text-lg text-white">Shortlisted Candidates</h2>
                            <p className="text-xs text-slate-400">Interactive Datagrid</p>
                        </div>
                    </div>

                    <button
                        disabled={!results}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-300 hover:text-white hover:border-slate-500 disabled:opacity-50 transition-all font-medium"
                    >
                        <Download className="w-4 h-4" />
                        Export Selected
                    </button>
                </div>

                <div className="flex-1 bg-slate-900/50 rounded-xl border border-slate-700/50 overflow-hidden flex flex-col">
                    {!results && !isProcessing && (
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-500 p-8 text-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center">
                                <FileText className="w-8 h-8 text-slate-600" />
                            </div>
                            <p className="max-w-xs text-sm">Awaiting constraints from the Command Center. Datagrid will populate automatically.</p>
                        </div>
                    )}

                    {isProcessing && (
                        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                            <div className="w-12 h-12 border-4 border-slate-800 border-t-purple-500 rounded-full animate-spin"></div>
                            <div className="text-purple-400 font-mono text-sm tracking-widest animate-pulse">EXECUTING SQL QUERY...</div>
                        </div>
                    )}

                    {results && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-400 bg-slate-800/50 uppercase border-b border-slate-700/50 font-display tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">Register No.</th>
                                        <th className="px-6 py-4 font-medium">Name</th>
                                        <th className="px-6 py-4 font-medium">Department</th>
                                        <th className="px-6 py-4 font-medium">CGPA</th>
                                        <th className="px-6 py-4 font-medium">Offers</th>
                                        <th className="px-6 py-4 font-medium text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/60">
                                    {results.map((student) => (
                                        <tr key={student.id} className="hover:bg-slate-800/30 transition-colors group cursor-pointer">
                                            <td className="px-6 py-4 font-mono text-slate-300 group-hover:text-cyan-400 transition-colors">{student.id}</td>
                                            <td className="px-6 py-4 font-medium text-white">{student.name}</td>
                                            <td className="px-6 py-4 text-slate-400">{student.dept}</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                    {student.cgpa}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-400">{student.offers}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-cyan-400 hover:text-cyan-300 text-xs font-medium">
                                                    View details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
