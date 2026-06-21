"use client";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaExclamationCircle,
    FaCheckCircle,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";

const API_URL = "http://localhost:5000/api";
// const API_URL = process.env.ECOMMERSE_BACKEND_URL || "http://localhost:5000/api";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false);
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        setError, // lets us manually attach a backend error to a specific field
        formState: { errors, isSubmitting },
        reset,
    } = useForm({ mode: "onBlur" });

    const onSubmit = async (formData) => {
        setServerError("");
        setSuccess(false);

        try {
            // If this line doesn't throw, the request succeeded (2xx response)
            await axios.post(`${API_URL}/auth/register`, formData);
            setSuccess(true);

            reset();

        } catch (err) {
            // axios puts the failed response here, NOT in the try block
            const status = err.response?.status;
            const message = err.response?.data?.message;

            if (status === 409) {
                // email already exists -> attach error to the email field
                setError("email", {
                    type: "manual",
                    message: message || "User with this email already exists.",
                });
            } else if (status === 400) {
                // missing fields
                setServerError(message || "Please fill in all fields.");
            } else if (status) {
                // any other error the server responded with (500, etc.)
                setServerError(message || "Something went wrong. Please try again.");
            } else {
                // no err.response at all = request never reached the server
                setServerError("Could not connect to the server. Please try again.");
            }
        }
    };

    // Small helper so we don't repeat the same className logic 3 times
    const fieldWrapperClass = (hasError) =>
        `flex items-center border rounded-lg px-3 py-2 transition-colors ${hasError
            ? "border-red-400 bg-red-50 focus-within:ring-2 focus-within:ring-red-300"
            : "border-gray-300 focus-within:ring-2 focus-within:ring-indigo-400"
        }`;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-1">
                    Create Your Account
                </h2>
                <p className="text-center text-sm text-gray-500 mb-6">
                    Fill in your details to get started
                </p>

                {/* Success message */}
                {success && (
                    <div className="mb-5 flex items-start gap-2 bg-green-50 border border-green-200 text-green-700 rounded-lg px-3 py-2.5">
                        <FaCheckCircle className="mt-0.5 shrink-0" />
                        <p className="text-sm">Account created successfully! You can now log in.</p>
                    </div>
                )}

                {/* General server error message (not tied to a single field) */}
                {serverError && (
                    <div className="mb-5 flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-3 py-2.5">
                        <FaExclamationCircle className="mt-0.5 shrink-0" />
                        <p className="text-sm">{serverError}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                    {/* Username */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                            Username
                        </label>
                        <div className={fieldWrapperClass(errors.username)}>
                            <FaUser className={`mr-2 ${errors.username ? "text-red-400" : "text-gray-400"}`} />
                            <input
                                id="username"
                                type="text"
                                placeholder="Enter username"
                                {...register("username", {
                                    required: "Username is required",
                                    minLength: { value: 3, message: "Username must be at least 3 characters" },
                                    maxLength: { value: 30, message: "Username must be under 30 characters" },
                                })}
                                className="w-full outline-none text-gray-700 bg-transparent"
                            />
                        </div>
                        {errors.username && (
                            <p className="flex items-center gap-1 text-red-500 text-xs mt-1.5">
                                <FaExclamationCircle className="shrink-0" />
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                            Email
                        </label>
                        <div className={fieldWrapperClass(errors.email)}>
                            <FaEnvelope className={`mr-2 ${errors.email ? "text-red-400" : "text-gray-400"}`} />
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+\.\S+$/, // same pattern as the backend schema
                                        message: "Please enter a valid email",
                                    },
                                })}
                                className="w-full outline-none text-gray-700 bg-transparent"
                            />
                        </div>
                        {errors.email && (
                            <p className="flex items-center gap-1 text-red-500 text-xs mt-1.5">
                                <FaExclamationCircle className="shrink-0" />
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                            Password
                        </label>
                        <div className={fieldWrapperClass(errors.password)}>
                            <FaLock className={`mr-2 ${errors.password ? "text-red-400" : "text-gray-400"}`} />
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 8, message: "Password must be at least 8 characters" }, // matches backend
                                })}
                                className="w-full outline-none text-gray-700 bg-transparent"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                className="ml-2 text-gray-400 hover:text-gray-600 shrink-0"
                                tabIndex={-1}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="flex items-center gap-1 text-red-500 text-xs mt-1.5">
                                <FaExclamationCircle className="shrink-0" />
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
                    >
                        {isSubmitting ? "Creating account..." : "Register"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{" "}
                    <a href="/login" className="text-indigo-600 font-semibold hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}