"use client";

import Image from "next/image";

export default function AboutPage() {
    return (
        <main className="relative min-h-screen px-6 py-12">
            {/* Decorative background */}
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 pointer-events-none overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-cyan-400/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-purple-500/15 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />
            </div>

            {/* App Section */}
            <section className="max-w-5xl mx-auto mb-16 bg-white/80 backdrop-blur-md rounded-xl shadow-md p-8 space-y-6">
                <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600 text-center">
                    About Byte Bazaar
                </h1>
                <p className="text-slate-700 leading-relaxed text-lg">
                    Byte Bazaar is a modern e‑commerce platform designed to provide a secure,
                    elegant, and seamless shopping experience. Customers can browse a curated
                    catalog of high‑quality products, while administrators manage inventory,
                    orders, and users through a powerful dashboard.
                </p>
                <p className="text-slate-700 leading-relaxed text-lg">
                    Our mission is to combine cutting‑edge technology with user‑friendly design,
                    ensuring that every interaction — from product discovery to checkout — feels
                    smooth, trustworthy, and enjoyable.
                </p>
            </section>

            {/* Developer Section */}
            <section className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0 w-44 h-44 rounded-full overflow-hidden shadow-md">
                    <Image
                        src="/developer.jpg" 
                        alt="Developer portrait"
                        width={180}
                        height={180}
                        className="object-cover"
                    />
                </div>
                <div className="space-y-3 text-center md:text-left">
                    <h2 className="text-2xl font-bold text-slate-800">Meet the Developer</h2>
                    <p className="text-slate-600 leading-relaxed">
                        Hi, I’m the creator of Byte Bazaar. I’m passionate about building secure,
                        scalable, and visually appealing web applications using Next.js,Tailwind CSS, Expessjs and MongoDB.
                    </p>
                    <p className="text-slate-600 leading-relaxed text-sm">
                        My focus is on delivering clean architecture, responsive design, and seamless
                        user experiences that empower both businesses and customers.
                    </p>
                </div>
            </section>


        </main>
    );
}
