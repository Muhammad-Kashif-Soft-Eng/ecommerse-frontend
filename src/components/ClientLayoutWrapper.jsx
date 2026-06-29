"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientLayoutWrapper({ children }) {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith("/dashboard");
    const isAuthRoute = pathname?.startsWith("/login") || pathname?.startsWith("/register");

    return (
        <>
            {!isDashboard && !isAuthRoute && <Navbar />}
            {children}
            {!isDashboard && !isAuthRoute && <Footer />}
        </>
    );
}
