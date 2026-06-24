"use client";

import Image from "next/image";
import { FaBoxOpen, FaDollarSign, FaTags, FaWarehouse } from "react-icons/fa";

export default function ProductDetails({ product }) {
    if (!product) return null;

    const hasImage = product?.image;

    return (
        <div className="px-6 py-12">
            <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-xl shadow-md p-8 space-y-8 hover:shadow-lg transition-shadow duration-200">
                {/* Product Image */}
                {hasImage ? (
                    <div className="relative w-full h-72 rounded-lg overflow-hidden shadow-md">
                        <Image
                            src={product.image}
                            alt={product.productname}
                            fill
                            className="object-cover"
                            sizes="100vw"
                            unoptimized
                        />
                    </div>
                ) : (
                    <div className="w-full h-72 flex items-center justify-center bg-slate-100 rounded-lg text-slate-400">
                        No image available
                    </div>
                )}

                {/* Product Info */}
                <div className="space-y-6">
                    <h2 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
                        <FaBoxOpen className="text-cyan-600 w-7 h-7" />
                        {product.productname}
                    </h2>

                    <p className="text-slate-600 text-lg leading-relaxed">
                        {product.description}
                    </p>

                    {/* Product Meta */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
                        <div className="flex items-center gap-2 text-green-600 font-medium">
                            <FaDollarSign className="w-4 h-4" />
                            <span>${product.price}</span>
                        </div>
                        <div className="flex items-center gap-2 text-pink-600">
                            <FaTags className="w-4 h-4" />
                            <span>{product.category}</span>
                        </div>
                        <div className="flex items-center gap-2 text-indigo-600">
                            <FaWarehouse className="w-4 h-4" />
                            <span>{product.countInStock} in stock</span>
                        </div>
                    </div>

                    {/* Dates */}
                    <p className="text-xs text-slate-400 border-t pt-4">
                        Created:{" "}
                        {product.createdAt
                            ? new Date(product.createdAt).toLocaleDateString()
                            : "N/A"}{" "}
                        <br />
                        Updated:{" "}
                        {product.updatedAt
                            ? new Date(product.updatedAt).toLocaleDateString()
                            : "N/A"}
                    </p>
                </div>
            </div>
        </div>
    );
}
