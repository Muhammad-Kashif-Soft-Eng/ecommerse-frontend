"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NotFound({ product }) {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
            <h1 className="text-5xl font-extrabold text-slate-800 mb-4">
                404 -
                {
                    product ? product : "Page"
                }
                Not Found
            </h1>
            <p className="text-slate-600 mb-6 max-w-md">
                Sorry, the page you are looking for doesn’t exist or the product could not be found.
            </p>

            <div className="flex gap-4">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="cursor-pointer px-6 py-3 bg-slate-200 text-slate-800 rounded-lg shadow hover:bg-slate-300 transition"
                >
                    Go Back
                </button>

                {/* Homepage Button */}
                <Link
                    href="/"
                    className="px-6 py-3 bg-cyan-600 text-white rounded-lg shadow hover:bg-cyan-700 transition"
                >
                    Go to Homepage
                </Link>
            </div>
        </div>
    );
}
