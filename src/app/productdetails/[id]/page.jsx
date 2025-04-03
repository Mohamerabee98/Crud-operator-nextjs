"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchProductById, deleteProduct } from "../../utils/api.js";
import Link from "next/link"; 

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        
        if (!data) throw new Error("Product not found");
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

 
  const handleDelete = async () => {
    if (!product) return;

    try {
      await deleteProduct(id);
      setIsDeleted(true);
      setTimeout(() => router.push("/"), 1500);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!product) return <p className="text-center">Product not found</p>;

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <img
        src={product.image}
        alt={product.title}
        className="h-64 mx-auto rounded"
      />
      <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
      <p className="text-white mt-6 text-lg">{product.description}</p>
      <p className="text-xl font-bold mt-2">{product.price}</p>


      <div className="flex gap-4 mt-6">
     
        <Link
          href={`/edit/${id}`} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Edit
        </Link>

     
        <button
          onClick={handleDelete}
          disabled={isDeleted}
          className={`px-4 py-2 rounded transition cursor-pointer duration-300 ${isDeleted? "bg-gray-500 cursor-not-allowed": "bg-red-500 hover:bg-red-600"} text-white`}>
          {isDeleted ?  `Deleted` : `Delete`} 
        </button>
      
       

      </div>
    </div>
  );
}
