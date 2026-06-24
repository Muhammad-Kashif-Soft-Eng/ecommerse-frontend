"use client";

import ProductDetails from "@/components/products/ProductDetails";
import { getProductById } from "@/lib/api/product.api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import NotFound from "@/app/not-found";

export default function SingleProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            setLoading(true);
            setError(null);
            try {
                const res = await getProductById(id);
                setProduct(res.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-3 text-slate-600 font-medium">Loading product Details...</span>
            </div>
        )

    }

    if (error) {
        return (
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
                    <span className="font-semibold">Error:</span>
                    <span>{error}</span>
                </div>
            </div>
        );
    }


    return (
        <div className="px-6 py-10">
            {product ? (
                <ProductDetails product={product} />
            ) : (
                <NotFound product={" Product "} />
            )}
        </div>
    );
}
