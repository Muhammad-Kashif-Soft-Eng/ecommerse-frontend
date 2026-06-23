"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaUserAlt, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar({ cartCount = 0 }) {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`relative z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 shadow-lg backdrop-blur-md' : 'bg-white/60 backdrop-blur-sm'}`}>
            {/* Decorative background */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
                <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-cyan-400/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-purple-500/15 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo & Brand */}
                    <Link href="/" className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-teal-400/50 rounded-xl p-1 transition-transform duration-200 hover:scale-[1.02]">
                        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 shadow-md shadow-teal-500/30 transition-transform duration-300 group-hover:rotate-6">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">Byte Bazaar</span>
                            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Premium Store</span>
                        </div>
                    </Link>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2 md:gap-3">
                        <Link href="/register" className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-teal-600 hover:bg-teal-50/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400/50">
                            <FaUserAlt className="w-4 h-4" />
                            <span>Register</span>
                        </Link>

                        <Link
                            href="/login"
                            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-teal-600 hover:bg-teal-50/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400/50"
                        >
                            <FaUserAlt className="w-4 h-4" />
                            <span>Sign in</span>
                        </Link>


                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setOpen((s) => !s)}
                            aria-label="Toggle menu"
                            aria-expanded={open}
                            className="inline-flex items-center justify-center p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors sm:hidden focus:outline-none focus:ring-2 focus:ring-teal-400/50"
                        >
                            {open ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="px-4 pb-4 pt-2 bg-white/90 backdrop-blur-sm border-t border-gray-100">
                    <div className="space-y-1">
                        <Link href="/register" className="flex items-center justify-between gap-2 px-4 py-3 rounded-lg text-slate-700 hover:bg-teal-50 hover:text-teal-600 transition-colors">
                            <span className="flex items-center gap-2"><FaUserAlt className="w-4 h-4" /> Register</span>
                            <span className="text-xs text-slate-400">Join us</span>
                        </Link>
                        <Link href="/login" className="flex items-center justify-between gap-2 px-4 py-3 rounded-lg text-slate-700 hover:bg-teal-50 hover:text-teal-600 transition-colors">
                            <span>Sign in</span>
                            <span className="text-xs text-slate-400">Welcome back</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
