"use client";

import { useState } from "react";
import { Search, Filter, MoreHorizontal, Download, UserPlus } from "lucide-react";

export default function StudentDirectory() {
    const [students] = useState([
        { id: "REG20220015", name: "Sarah Connor", dept: "Computer Science", cgpa: 9.2, status: "Placed", company: "Google" },
        { id: "REG20220023", name: "John Smith", dept: "Mechanical Eng", cgpa: 7.8, status: "Unplaced", company: "-" },
        { id: "REG20220042", name: "Emma Davis", dept: "AI & DS", cgpa: 8.5, status: "Placed", company: "TCS" },
        { id: "REG20220076", name: "Michael Chen", dept: "Information Tech", cgpa: 8.1, status: "Unplaced", company: "-" },
        { id: "REG20220091", name: "Akash Patel", dept: "Electronics", cgpa: 7.2, status: "Unplaced", company: "-" },
        { id: "REG20220112", name: "Lisa Wong", dept: "Computer Science", cgpa: 9.6, status: "Placed", company: "Microsoft" },
        { id: "REG20220145", name: "Rahul Sharma", dept: "AI & DS", cgpa: 8.8, status: "Placed", company: "Amazon" },
    ]);

    return (
        <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-700">

            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative group w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search by name, register no, or department..."
                        className="w-full bg-slate-800/50 border border-slate-700/80 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all text-white placeholder-slate-500"
                    />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl text-sm font-medium text-slate-300 hover:text-white transition-colors flex-1 sm:flex-none justify-center">
                        <Filter className="w-4 h-4" />
                        Filters
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-sm font-medium transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)] flex-1 sm:flex-none justify-center">
                        <UserPlus className="w-4 h-4" />
                        Add Student
                    </button>
                </div>
            </div>

            {/* Main Data Table */}
            <div className="flex-1 glass rounded-2xl border border-slate-700/50 overflow-hidden flex flex-col relative">
                <div className="absolute top-0 right-1/4 w-64 h-64 bg-cyan-500/5 blur-3xl rounded-full pointer-events-none" />

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left relative z-10">
                        <thead className="text-xs text-slate-400 bg-slate-900/50 uppercase border-b border-slate-700/80 font-display tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-medium whitespace-nowrap">Register No.</th>
                                <th className="px-6 py-4 font-medium">Student Name</th>
                                <th className="px-6 py-4 font-medium">Department</th>
                                <th className="px-6 py-4 font-medium">CGPA</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Company</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                            {students.map((student) => (
                                <tr key={student.id} className="hover:bg-slate-800/40 transition-colors group cursor-pointer lg:table-row flex flex-col lg:flex-row mb-4 lg:mb-0">
                                    <td className="px-6 py-4 font-mono text-slate-400 group-hover:text-cyan-400 transition-colors">{student.id}</td>
                                    <td className="px-6 py-4 font-medium text-slate-200">{student.name}</td>
                                    <td className="px-6 py-4 text-slate-400">{student.dept}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-800 border border-slate-700 text-slate-300 group-hover:border-cyan-500/30 transition-colors">
                                            {student.cgpa}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${student.status === 'Placed'
                                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${student.status === 'Placed' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-400 font-medium">{student.company}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-1 text-slate-500 hover:text-cyan-400 transition-colors rounded-lg hover:bg-slate-800">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="py-4 px-6 border-t border-slate-700/80 bg-slate-900/30 flex items-center justify-between text-sm text-slate-400 mt-auto">
                    <span>Showing 1 to 7 of 1,024 students</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 rounded border border-slate-700 hover:bg-slate-800 hover:text-white disabled:opacity-50">Prev</button>
                        <button className="px-3 py-1 rounded border border-slate-700 hover:bg-slate-800 hover:text-white bg-slate-800 text-white">1</button>
                        <button className="px-3 py-1 rounded border border-slate-700 hover:bg-slate-800 hover:text-white">2</button>
                        <button className="px-3 py-1 rounded border border-slate-700 hover:bg-slate-800 hover:text-white">3</button>
                        <span className="px-2 py-1">...</span>
                        <button className="px-3 py-1 rounded border border-slate-700 hover:bg-slate-800 hover:text-white disabled:opacity-50">Next</button>
                    </div>
                </div>
            </div>

        </div>
    );
}
