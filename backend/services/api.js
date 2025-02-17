// services/api.js
export const getProducts = async ({ page, sortBy }) => {
    try {
      const response = await fetch(`/api/products?page=${page}&sortBy=${sortBy}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      return data; // Ensure this returns { products: [...], total: number }
    } catch (error) {
      console.error("Error fetching products:", error);
      return { products: [], total: 0 }; // Fallback to avoid undefined
    }
  };