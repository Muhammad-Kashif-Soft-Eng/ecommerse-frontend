"use client";

import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="mt-auto border-t border-gray-200 bg-white/80 backdrop-blur-md relative">
            {/* Decorative background */}
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 pointer-events-none overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-cyan-400/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-purple-500/15 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                {/* Brand */}
                <Link
                    href="/"
                    className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-400/50 rounded-xl p-1 hover:scale-[1.02] transition-transform duration-200"
                >
                    Byte Bazaar
                </Link>

                {/* Navigation */}
                <nav className="flex flex-wrap justify-center gap-6 text-sm text-slate-600">
                    <Link
                        href="/"
                        className="hover:text-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400/50 rounded"
                    >
                        Home
                    </Link>
                    <Link
                        href="/about"
                        className="hover:text-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400/50 rounded"
                    >
                        About
                    </Link>
                    <Link
                        href="/contact"
                        className="hover:text-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400/50 rounded"
                    >
                        Contact
                    </Link>
                    <Link
                        href="/products"
                        className="hover:text-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400/50 rounded"
                    >
                        Products
                    </Link>
                </nav>  

                {/* Copyright */}
                <p className="text-sm text-slate-500 text-center md:text-left">
                    © {new Date().getFullYear()} Byte Bazaar. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
