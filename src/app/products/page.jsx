"use client";

import ProductList from "@/components/products/ProductList";
import { getProducts } from "@/lib/api/product.api";
import { useEffect, useState } from "react";

export default function ProductsPage() {
    const [productsData, setProductsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProductsCaller = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getProducts();
                setProductsData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getProductsCaller();
    }, []);

    return (
        <div className="relative min-h-screen px-6 py-12">
            {/* Decorative background */}
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 pointer-events-none overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-cyan-400/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-purple-500/15 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />
            </div>

            {/* Page Header */}
            <header className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600">
                    Products
                </h1>
                <p className="text-slate-600 mt-2 text-lg">
                    Explore our curated catalog of high-quality products.
                </p>
            </header>

            {/* Content */}
            <div className="max-w-7xl mx-auto">
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="ml-3 text-slate-600 font-medium">Loading products...</span>
                    </div>
                )}

                {error && (
                    <div className="flex justify-center items-center py-12">
                        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-sm">
                            {/* Error Icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-red-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01M12 5a7 7 0 100 14a7 7 0 000-14z"
                                />
                            </svg>
                            {/* Error Message */}
                            <span className="font-medium">Error:</span>
                            <span>{error}</span>
                        </div>
                    </div>
                )}


                {!loading && !error && (
                    <div className="mb-4">
                        {productsData?.data?.length > 0 ? (
                            <ProductList products={productsData} />
                        ) : (
                            <div className="flex justify-center items-center py-12">
                                <p className="text-slate-500 italic">No products found.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
