"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ContactPage() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [submitted, setSubmitted] = useState(false);

    const onSubmit = (data) => {
        setSubmitted(true);
        reset();
        setTimeout(() => {
            router.push("/");
        }, 2000);
    };

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

            <section className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md rounded-xl shadow-md p-8">
                <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600 text-center mb-6">
                    Contact Us
                </h1>

                {submitted ? (
                    <p className="text-center text-green-600 font-medium">
                        ✅ Thank you! Your message has been sent.
                    </p>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-slate-700 font-medium mb-2">Name</label>
                            <input
                                type="text"
                                {...register("name", { required: "Name is required", minLength: { value: 3, message: "Name must be at least 3 characters" } })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                            />
                            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-slate-700 font-medium mb-2">Email</label>
                            <input
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" },
                                })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                            />
                            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-slate-700 font-medium mb-2">Message</label>
                            <textarea
                                rows="5"
                                {...register("message", {
                                    required: "Message is required",
                                    minLength: { value: 10, message: "Message must be at least 10 characters" },
                                    maxLength: { value: 500, message: "Message cannot exceed 500 characters" },
                                })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                            />
                            {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full cursor-pointer py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow hover:bg-cyan-700 transition"
                        >
                            Send Message
                        </button>
                    </form>
                )}

                {/* Contact Info */}
                <div className="mt-10 text-center text-slate-600">
                    <p>Email: <span className="font-medium">muhammad.kashif.soft.eng@gmail.com</span></p>
                </div>
            </section>
        </main>
    );
}
