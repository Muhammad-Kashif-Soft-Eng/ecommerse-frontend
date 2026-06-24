"use client";

import { usePathname } from "next/navigation";
import ProductCard from "./ProductCard";

/**
 * ProductList
 * - props.products: { data: [...] }
 * - props.onRefresh: optional function to refresh data (used after delete)
 *
 * Renders:
 * - Dashboard table when route starts with /dashboard
 * - Card grid (ProductCard) for public pages
 */
export default function ProductList({ products, onRefresh }) {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith("/dashboard");

    if (!products) return null;

    // Dashboard table view
    if (isDashboard) {
        return (
            <div className="overflow-x-auto rounded-xl shadow-lg border border-slate-200 bg-white/80">
                <table className="min-w-full text-sm text-slate-700">
                    <thead>
                        <tr className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white">
                            <th className="px-6 py-3 text-left font-semibold">Product</th>
                            <th className="px-6 py-3 text-left font-semibold">Price</th>
                            <th className="px-6 py-3 text-left font-semibold">Stock</th>
                            <th className="px-6 py-3 text-left font-semibold">Category</th>
                            <th className="px-6 py-3 text-center font-semibold">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.data.map((p) => (
                            <tr
                                key={p._id}
                                className="border-b border-slate-200 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-purple-50 transition"
                            >
                                <td className="px-6 py-4 flex items-center gap-3">
                                    {/* small thumbnail if available */}
                                    {p.image ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={p.image}
                                            alt={p.productname}
                                            className="w-12 h-12 rounded-md object-cover border border-slate-100"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-md bg-slate-100 flex items-center justify-center text-slate-400">
                                            📦
                                        </div>
                                    )}
                                    <div>
                                        <div className="font-medium text-slate-800">{p.productname}</div>
                                        <div className="text-xs text-slate-500 line-clamp-1">{p.description}</div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 text-green-600 font-semibold">${p.price}</td>

                                <td className="px-6 py-4 text-indigo-600 font-medium">{p.countInStock}</td>

                                <td className="px-6 py-4 text-pink-600">{p.category}</td>

                                <td className="px-6 py-4 flex justify-center gap-3">
                                    <a
                                        href={`/products/${p._id}`}
                                        className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 transition"
                                        title="View"
                                    >
                                        👁
                                    </a>

                                    <a
                                        href={`/dashboard/products/update/${p._id}`}
                                        className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition"
                                        title="Edit"
                                    >
                                        ✏️
                                    </a>

                                    <DeleteButton productId={p._id} onRefresh={onRefresh} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    // Public product cards
    return <ProductCard products={products} />;
}

/* DeleteButton: confirms and calls deleteProduct if available, then refreshes list */
function DeleteButton({ productId, onRefresh }) {
    // lazy import deleteProduct to avoid build errors if not present
    const handleDelete = async () => {
        const ok = confirm("Are you sure you want to delete this product?");
        if (!ok) return;

        try {
            // try to call deleteProduct if it exists
            const mod = await import("@/lib/api/product.api");
            if (typeof mod.deleteProduct === "function") {
                const res = await mod.deleteProduct(productId);
                if (res?.success) {
                    // refresh parent list if callback provided
                    if (typeof onRefresh === "function") onRefresh();
                    return;
                } else {
                    alert(res?.message || "Delete failed");
                }
            } else {
                // fallback: inform user and refresh
                alert("Delete API not available in product.api.js");
            }
        } catch (err) {
            console.error(err);
            alert("Delete failed: " + (err?.message || err));
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            title="Delete"
            type="button"
        >
            🗑
        </button>
    );
}
