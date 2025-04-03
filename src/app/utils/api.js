const API_URL = "https://fakestoreapi.com/products";


export const fetchProducts = async () => {
  const res = await fetch(API_URL);
  // console.log(res);
  return res.json();
};
export const fetchProductById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.status}`);
    }
    
    return res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
export const createProduct = async (productData) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    if (!res.ok) {
      throw new Error("Failed to create product");
    }
    return await res.json();
  } catch (error) {
    console.error("Error creating product:", error);
    return null;
  }
};



export const updateProduct = async (id, product) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
};

export const deleteProduct = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete product");
  return res.json();
};