"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchProductById, updateProduct } from "../../utils/api";

export default function EditProduct() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState({ title: "", price: "", image: "" });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        if (!data) throw new Error("Product not found");

        setProduct(data);
        setImagePreview(data.image);
      } catch (err) {
        console.error(err.message);
      }
    };

    loadProduct();
  }, [id]);

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
      const updatedProduct = {
        title: product.title,
        price: parseFloat(product.price),
        image: product.image,
      };

      const result = await updateProduct(id, updatedProduct);

      if (result) {
        setIsUpdated(true);
        setTimeout(() => router.push("/home"), 1500);
      } else {
        throw new Error("Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="shadow-md p-6 rounded-lg w-96">
        <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
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
              isUpdated
                ? "bg-green-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
            disabled={loading || isUpdated}
          >
            {isUpdated
              ? ` Updated!`
              : loading
              ? "Saving..."
              : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
