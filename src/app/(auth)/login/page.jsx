"use client";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
    FaEnvelope,
    FaLock,
    FaExclamationCircle,
    FaCheckCircle,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";

const API = "http://localhost:5000/api";
// const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function LoginPage() {

    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false);
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({ mode: "onBlur" });

    const onSubmit = async (formData) => {
        setServerError("");
        setSuccess(false);

        try {
            await axios.post(`${API}/auth/login`, formData);
            setSuccess(true);
            reset();

            setTimeout(() => {
                router.push("/dashboard");
            }, 2000);

        } catch (err) {
            console.error(err);
            const status = err.response?.status;
            const message = err.response?.data?.message;

            if (status === 401) {
                setError("email", {
                    type: "manual",
                    message: message || "Invalid email or password.",
                });
                setError("password", {
                    type: "manual",
                    message: message || "Invalid email or password.",
                });
            } else if (status === 400) {
                setServerError(message || "Please fill in all fields.");
            } else if (status) {
                setServerError(message || "Something wrong. Please try again.");
            } else {
                setServerError("Could not connect to the server. Please try again.");
            }
        }
    };

    const fieldWrapperClass = (hasError) =>
    `flex items-center border rounded-xl px-4 py-3 transition-all duration-200 ${
        hasError
            ? "border-red-300 bg-red-50 shadow-sm"
            : "border-gray-200 bg-white hover:border-gray-300 shadow-sm"
    } focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500`;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 sm:p-6 md:p-8 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-fade-in"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-fade-in"></div>
            </div>

            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10 relative z-10 backdrop-blur-sm">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
                        Welcome Back
                    </h2>
                    <p className="text-gray-500 mt-2 text-sm md:text-base">
                        Log in to your account to continue.
                    </p>
 </div>

                {/* Success Message */}
                {success && (
                    <div className="mb-6 flex items-start gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 shadow-sm transition-all duration-300">
                        <FaCheckCircle className="mt-0.5 shrink-0 text-green-500 text-lg" />
                        <p className="font-medium text-sm">Logged in successfully!</p>
                    </div>
                )}

                {/* Server Error Message */}
                {serverError && (
                    <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 shadow-sm transition-all duration-300">
                        <FaExclamationCircle className="mt-0.5 shrink-0 text-red-500 text-lg" />
                        <div>
                            <p className="font-medium text-sm">Error</p>
                            <p className="text-xs text-red-600 mt-1">{serverError}</p>
                        </div>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                            Email Address
                        </label>
                        <div className={fieldWrapperClass(errors.email)}>
                            <FaEnvelope className={`mr-3 ${errors.email ? "text-red-400" : "text-gray-400"}`} />
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+\.\S+$/,
                                        message: "Please enter a valid email",
                                    },
                                })}
                                className="w-full outline-none text-gray-800 bg-transparent placeholder:text-gray-400"
                            />
                        </div>
                        {errors.email && (
                            <p className="flex items-center gap-1.5 text-red-500 text-xs mt-2 ml-1 font-medium">
                                <FaExclamationCircle className="shrink-0" />
                                {errors.email.message}
                            </p>
                        )}
                    </div>                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                            Password
                        </label>
                        <div className={fieldWrapperClass(errors.password)}>
                            <FaLock className={`mr-3 ${errors.password ? "text-red-400" : "text-gray-400"}`} />
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 8, message: "Password must be at least 8 characters" },
                                })}
                                className="w-full outline-none text-gray-800 bg-transparent placeholder:text-gray-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                className="ml-2 text-gray-400 hover:text-gray-600 shrink-0 transition-colors"
                                tabIndex={-1}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="flex items-center gap-1.5 text-red-500 text-xs mt-2 ml-1 font-medium">
                                <FaExclamationCircle className="shrink-0" />
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-indigo-300 disabled:to-purple-300 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2-5.999a6 6 0 00-6 6v4.001a6 6 0 006-6h-4z"></path>
                                </svg>
                                Logging in...
                            </span>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Don&apos;t have an account?{" "}
                    <a href="/register" className="text-indigo-600 font-semibold hover:underline">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
}
