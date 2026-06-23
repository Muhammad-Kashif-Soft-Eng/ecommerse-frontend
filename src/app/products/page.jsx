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
        }
        getProductsCaller();
    }, []);

    return (
        <div>
            <h1>Products</h1>
            {loading && <p>Loading...</p>}

            {
                productsData?.data?.length > 0
                ? <ProductList products={productsData}  />
                : <p> No Product Found </p>
            }

            {error && <p>Error: {error}</p>}
        </div>
    );
};