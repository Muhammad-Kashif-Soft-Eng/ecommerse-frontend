"use client";

import Link from "next/link";

export default function HomePage() {

  return (
    <main className="p-6">
      {/* Hero */}
      <section className="text-center py-10">
        <h1 className="text-3xl font-bold">My E-Commerce Store</h1>
        <p className="text-gray-600 mt-2">
          Best products at affordable prices
        </p>

        <Link
          href="/products"
          className="mt-4 inline-block bg-black text-white px-5 py-2 rounded"
        >
          Shop Now
        </Link>
      </section>
    </main>
  );
}