"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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

import api from "@/lib/axios";

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
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);
    const prevPathRef = useRef(pathname);

    useEffect(() => {
        if (prevPathRef.current !== pathname) {
            prevPathRef.current = pathname;
            if (typeof window !== "undefined" && window.innerWidth < 768) {
                setTimeout(() => setSidebarOpen(false), 0);
            }
        }
    }, [pathname]);

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth < 768 && sidebarOpen) {
                setSidebarOpen(false);
            }
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [sidebarOpen]);

    // Logout handler
    const handleLogout = async () => {
        try {
            await api.post("/auth/logout");

            if (typeof window !== "undefined") {
                // Clear all auth-related data
                localStorage.removeItem("authToken");
                document.cookie = "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
            }

            router.push("/login");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

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

                        if (item.logout) {
                            return (
                                <button
                                    key={item.name}
                                    onClick={() => setShowLogoutDialog(true)}
                                    className={`${baseClasses} ${active ? activeClasses : hoverClasses} w-full text-left`}
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    {sidebarOpen && <span>{item.name}</span>}
                                </button>
                            );
                        }

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

            {/* Logout Confirmation Dialog */}
            {showLogoutDialog && (
                <dialog open className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                        <h2 className="text-lg font-bold text-slate-800 mb-4">Confirm Logout</h2>
                        <p className="text-slate-600 mb-6">Are you sure you want to log out?</p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowLogoutDialog(false)}
                                className="px-4 py-2 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
}
