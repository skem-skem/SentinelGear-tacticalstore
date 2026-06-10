"use client"

import { useState, useEffect } from "react";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
}

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch("/api/products");
                if (!res.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await res.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        }
    }, [])

    return (
        <div>
            <h1>Products Page</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>{product.name}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}