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
                        <p className="text-slate-600 animate-pulse">Loading products...</p>
                    </div>
                )}

                {error && (
                    <div className="flex justify-center items-center py-12">
                        <p className="text-red-600 font-medium">Error: {error}</p>
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
