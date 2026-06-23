"use client";

import Link from "next/link";
import { FaBoxOpen, FaTruck, FaShieldAlt } from "react-icons/fa";

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6">
      {/* Decorative background (same theme as Navbar) */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-cyan-400/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-purple-500/15 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Hero Section */}
      <section className="text-center py-16 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600">
          My E-Commerce Store
        </h1>
        <p className="text-slate-600 mt-4 text-lg">
          Discover premium products curated for quality, value, and style —
          delivered with speed and security for a seamless shopping experience.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/products"
            className="inline-block bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 w-full max-w-6xl mx-auto px-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center bg-white/80 backdrop-blur-md rounded-xl shadow-md p-6 hover:shadow-lg hover:-translate-y-1 transition-transform duration-200">
            <FaBoxOpen className="text-cyan-600 w-10 h-10 mb-4" />
            <h3 className="text-lg font-semibold text-slate-800">
              Quality Products
            </h3>
            <p className="text-slate-600 mt-2 text-sm">
              Browse a carefully selected collection of high-quality products.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center bg-white/80 backdrop-blur-md rounded-xl shadow-md p-6 hover:shadow-lg hover:-translate-y-1 transition-transform duration-200">
            <FaTruck className="text-purple-600 w-10 h-10 mb-4" />
            <h3 className="text-lg font-semibold text-slate-800">
              Fast Delivery
            </h3>
            <p className="text-slate-600 mt-2 text-sm">
              Reliable and timely delivery to your doorstep.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center bg-white/80 backdrop-blur-md rounded-xl shadow-md p-6 hover:shadow-lg hover:-translate-y-1 transition-transform duration-200">
            <FaShieldAlt className="text-indigo-600 w-10 h-10 mb-4" />
            <h3 className="text-lg font-semibold text-slate-800">
              Secure Shopping
            </h3>
            <p className="text-slate-600 mt-2 text-sm">
              Enjoy a safe and seamless shopping experience.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
