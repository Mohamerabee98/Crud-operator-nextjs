"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "../utils/api";

export default function NewProduct() {
  const [product, setProduct] = useState({ title: "", price: "", image: "" });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const router = useRouter();


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProduct({ ...product, image: imageUrl }); 
      setImagePreview(imageUrl); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        title: product.title,
        price: parseFloat(product.price),
        image: product.image, 
      };

      console.log("📤 Sending product data:", productData);

      const newProd = await createProduct(productData);

      if (newProd) {
        console.log("✅ Product added successfully:", newProd);
        setIsAdded(true); 
        setTimeout(() => router.push("/home"), 1500);
      } else {
        throw new Error("Failed to create product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="shadow-md p-6 rounded-lg w-96">
        <h1 className="text-2xl font-bold mb-4">Add Product</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            required
            className="border p-2 rounded"
            value={product.title}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            required
            className="border p-2 rounded"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />


          <input
            type="file"
            accept="image/*"
            className="border p-2 rounded"
            onChange={handleImageUpload}
          />


          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="h-32 mx-auto rounded"
            />
          )}


          <button
            type="submit"
            className={`p-2 rounded transition duration-300 ${
              isAdded
                ? "bg-green-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
            disabled={loading || isAdded} 
          >
            {isAdded ?  "Added!" : loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
