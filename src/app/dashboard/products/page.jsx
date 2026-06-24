"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api/product.api";
import ProductList from "@/components/products/ProductList";

export default function ProductsDashboardPage() {
    const [productsData, setProductsData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getProducts();
            setProductsData(data ?? { data: [] });
        } catch (err) {
            setError(err?.message || "Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <section>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Products</h2>
                    <p className="text-sm text-slate-500">Manage your product catalog</p>
                </div>
                <div>
                    <a
                        href="/dashboard/products/create"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow hover:opacity-95"
                    >
                        + Add Product
                    </a>
                </div>
            </div>

            {/* Content wrapper */}
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow p-6 border border-slate-200">
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                        <span className="ml-3 text-slate-600 font-medium">Loading products...</span>
                    </div>
                )}

                {error && (
                    <div className="flex justify-center items-center py-12">
                        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-sm">
                            <span className="font-medium">Error:</span>
                            <span>{error}</span>
                        </div>
                    </div>
                )}

                {!loading && !error && (
                    <>
                        {productsData?.data?.length > 0 ? (
                            <ProductList products={productsData} onRefresh={fetchProducts} />
                        ) : (
                            <div className="flex justify-center items-center py-12">
                                <p className="text-slate-500 italic">No products found.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
