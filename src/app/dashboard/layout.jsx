"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
    FaUserCircle,
    FaTachometerAlt,
    FaBoxOpen,
    FaShoppingCart,
    FaUsers,
    FaSignOutAlt,
    FaBars,
    FaTimes,
} from "react-icons/fa";

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "Profile", href: "/dashboard/profile", icon: <FaUserCircle /> },
    { name: "Products", href: "/dashboard/products", icon: <FaBoxOpen /> },
    { name: "Orders", href: "/dashboard/orders", icon: <FaShoppingCart /> },
    { name: "Users", href: "/dashboard/users", icon: <FaUsers /> },
    { name: "Logout", href: "/logout", icon: <FaSignOutAlt />, logout: true },
];

export default function DashboardLayout({ children }) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // track previous pathname so we only react to actual route changes (not mount)
    const prevPathRef = useRef(pathname);

    useEffect(() => {
        // only run when pathname actually changed (skip initial mount)
        if (prevPathRef.current !== pathname) {
            prevPathRef.current = pathname;

            // auto-close sidebar only on small screens (mobile)
            if (typeof window !== "undefined" && window.innerWidth < 768) {
                // schedule async to avoid synchronous setState inside effect body
                setTimeout(() => setSidebarOpen(false), 0);
            }
        }
        // intentionally depend only on pathname
    }, [pathname]);

    // optional: close sidebar when window is resized to small (keeps UI consistent)
    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth < 768 && sidebarOpen) {
                // keep user control intact on desktop; only auto-close on small screens
                setSidebarOpen(false);
            }
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [sidebarOpen]);

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-cyan-50 via-white to-purple-50">
            {/* Sidebar */}
            <aside
                className={`bg-white/80 backdrop-blur-md shadow-xl border-r border-slate-200 transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"
                    }`}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center gap-3">

                        <span className="font-bold text-cyan-600 text-lg select-none">
                            {sidebarOpen ? "Byte Bazaar Admin" : "BB"}
                        </span>
                        <button
                            onClick={() => setSidebarOpen((s) => !s)}
                            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                            className="cursor-pointer p-2 rounded-md text-slate-600 hover:text-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                        >
                            {sidebarOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>

                <nav className="mt-4">
                    {navItems.map((item) => {
                        const active = pathname === item.href;
                        const baseClasses =
                            "flex items-center gap-3 px-4 py-2 rounded-md mx-2 mb-2 transition";
                        const activeClasses = item.logout
                            ? "bg-red-600 text-white font-semibold shadow"
                            : "bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-semibold shadow";
                        const hoverClasses = item.logout
                            ? "hover:bg-red-500 hover:text-white text-slate-700"
                            : "hover:bg-slate-100 text-slate-700";

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`${baseClasses} ${active ? activeClasses : hoverClasses}`}
                            >
                                <span className="text-lg">{item.icon}</span>
                                {sidebarOpen && <span>{item.name}</span>}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1 p-6">
                {/* Topbar */}
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-slate-800">
                        {pathname === "/dashboard" ? "Dashboard Overview" : "Admin Panel"}
                    </h1>
                    <div className="flex items-center gap-4">
                        <FaUserCircle className="text-cyan-600 w-8 h-8" />
                        <span className="text-slate-700 font-medium">Admin</span>
                    </div>
                </header>

                {children}
            </div>
        </div>
    );
}
