"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchProducts } from "../utils/api";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data));
  }, []);

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>

      <div className="flex flex-wrap justify-center items-center gap-6 bg-gray-500 rounded w-full max-w-[1200px] p-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/productdetails/${product.id}`}
            passHref
          >
            <div
              className="border w-[250px] h-auto flex flex-col items-center gap-3 p-4 rounded cursor-pointer 
                          hover:shadow-lg bg-white"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-[100px] h-[100px] object-contain"
              />
              <div className="text-center">
                <p className="text-sm font-medium text-black">
                  {product.title.length > 20
                    ? product.title.substring(0, 20) + "..."
                    : product.title}
                </p>{" "}
                <p className="font-bold text-blue-600">${product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
