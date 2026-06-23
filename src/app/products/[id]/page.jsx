"use client";

import ProductDetails from "@/components/products/ProductDetails";
import { getProductById } from "@/lib/api/product.api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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
        return <p className="text-center text-slate-600">Loading product...</p>;
    }

    if (error) {
        return <p className="text-center text-red-600">Error: {error}</p>;
    }

    return (
        <div className="px-6 py-10">
            {product ? (
                <ProductDetails product={product} />
            ) : (
                <p className="text-center text-slate-500 italic">No Product Found.</p>
            )}
        </div>
    );
}
