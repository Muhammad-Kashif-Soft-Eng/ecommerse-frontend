"use client";

import Image from "next/image";
import { FaBoxOpen, FaDollarSign, FaTags, FaWarehouse } from "react-icons/fa";
import Link from "next/link";

export default function ProductCard({ products }) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.data.map((product) => (
                <Link
                    key={product._id}
                    href={`/products/${product._id}`}
                    className="flex flex-col bg-white/80 backdrop-blur-md shadow-md rounded-xl overflow-hidden border border-slate-200 hover:shadow-lg transition-transform hover:-translate-y-1"
                >
                    {/* Product Image */}
                    <div className="relative w-full h-40">
                        <Image
                            src={product.image}
                            alt={product.productname}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw,
                     (max-width: 1024px) 50vw,
                     25vw"
                            placeholder="blur"
                            blurDataURL={product.image.replace("/upload/", "/upload/w_10,q_10/")}
                        />
                    </div>

                    {/* Card Content */}
                    <div className="flex flex-col flex-grow p-4 space-y-2">
                        <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                            <FaBoxOpen className="text-cyan-600 w-4 h-4" />
                            {product.productname}
                        </h3>

                        <p className="text-slate-600 text-sm line-clamp-2">{product.description}</p>

                        <div className="flex items-center gap-2 text-green-600 font-medium text-sm">
                            <FaDollarSign className="w-3 h-3" />
                            <span>${product.price}</span>
                        </div>

                        <div className="flex items-center gap-2 text-pink-600 text-sm">
                            <FaTags className="w-3 h-3" />
                            <span>{product.category}</span>
                        </div>

                        <div className="flex items-center gap-2 text-indigo-600 text-sm">
                            <FaWarehouse className="w-3 h-3" />
                            <span>{product.countInStock} in stock</span>
                        </div>

                        <p className="text-[11px] text-slate-400 mt-auto">
                            Created: {new Date(product.createdAt).toLocaleDateString()} <br />
                            Updated: {new Date(product.updatedAt).toLocaleDateString()}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
