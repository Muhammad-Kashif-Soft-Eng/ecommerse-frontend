"use client";

import Image from "next/image";
import Link from "next/link";

/**
 * ProductCard - public grid view
 * Shows productname, price, stock (icons kept minimal)
 */
export default function ProductCard({ products }) {
    if (!products?.data) return null;

    return (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.data.map((product) => (
                <Link
                    key={product._id}
                    href={`/products/${product._id}`}
                    className="flex flex-col bg-white/80 backdrop-blur-md shadow-md rounded-xl overflow-hidden border border-slate-200 hover:shadow-lg transition-transform hover:-translate-y-1"
                >
                    <div className="relative w-full h-40 bg-slate-100">
                        {product.image ? (
                            <Image
                                src={product.image}
                                alt={product.productname}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                unoptimized
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300 text-3xl">📦</div>
                        )}
                    </div>

                    <div className="flex flex-col flex-grow p-4 space-y-2">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-semibold text-slate-800">{product.productname}</h3>
                            <div className="text-green-600 font-semibold">${product.price}</div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-slate-500">
                            <div className="flex items-center gap-2">
                                <span className="text-indigo-600">📦</span>
                                <span>{product.countInStock} in stock</span>
                            </div>
                            <div className="text-pink-600">{product.category}</div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
