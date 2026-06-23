"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    FaUserAlt,
    FaBars,
    FaTimes,
    FaHome,
    FaShoppingCart,
    FaInfoCircle,
    FaPhoneAlt,
} from "react-icons/fa";

export default function Navbar({ cartCount = 0 }) {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLinkClick = () => setOpen(false);

    return (
        <header
            className={`relative z-50 transition-all duration-300 ${scrolled
                    ? "bg-white/80 shadow-lg backdrop-blur-md"
                    : "bg-white/60 backdrop-blur-sm"
                }`}
        >
            {/* Decorative background (unchanged theme) */}
            <div
                className="absolute inset-0 -z-10 pointer-events-none overflow-hidden"
                aria-hidden="true"
            >
                <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-cyan-400/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-purple-500/15 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link
                        href="/"
                        onClick={handleLinkClick}
                        className="group flex items-center gap-3"
                    >
                        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 shadow-md shadow-teal-500/30">
                            <FaHome className="text-white w-5 h-5" />
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
                                Byte Bazaar
                            </span>
                            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
                                Premium Store
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden sm:flex gap-4 items-center">
                        <Link href="/products" className="flex items-center gap-2 hover:text-teal-600">
                            <FaShoppingCart className="w-4 h-4" /> Products
                        </Link>
                        <Link href="/about" className="flex items-center gap-2 hover:text-teal-600">
                            <FaInfoCircle className="w-4 h-4" /> About
                        </Link>
                        <Link href="/contact" className="flex items-center gap-2 hover:text-teal-600">
                            <FaPhoneAlt className="w-4 h-4" /> Contact
                        </Link>
                        <Link href="/register" className="flex items-center gap-2 hover:text-teal-600">
                            <FaUserAlt className="w-4 h-4" /> Register
                        </Link>
                        <Link href="/login" className="flex items-center gap-2 hover:text-teal-600">
                            <FaUserAlt className="w-4 h-4" /> Sign in
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="sm:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
                    >
                        {open ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="px-4 pb-4 pt-2 bg-white/90 backdrop-blur-sm border-t border-gray-100">
                    <nav className="space-y-2">
                        <Link href="/" onClick={handleLinkClick} className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-teal-50 hover:text-teal-600">
                            <FaHome className="w-4 h-4" /> Home
                        </Link>
                        <Link href="/products" onClick={handleLinkClick} className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-teal-50 hover:text-teal-600">
                            <FaShoppingCart className="w-4 h-4" /> Products
                        </Link>
                        <Link href="/about" onClick={handleLinkClick} className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-teal-50 hover:text-teal-600">
                            <FaInfoCircle className="w-4 h-4" /> About
                        </Link>
                        <Link href="/contact" onClick={handleLinkClick} className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-teal-50 hover:text-teal-600">
                            <FaPhoneAlt className="w-4 h-4" /> Contact
                        </Link>
                        <Link href="/register" onClick={handleLinkClick} className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-teal-50 hover:text-teal-600">
                            <FaUserAlt className="w-4 h-4" /> Register
                        </Link>
                        <Link href="/login" onClick={handleLinkClick} className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-teal-50 hover:text-teal-600">
                            <FaUserAlt className="w-4 h-4" /> Sign in
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
