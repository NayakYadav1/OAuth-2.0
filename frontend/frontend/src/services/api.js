import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

export const getProducts = async (filters) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, { params: filters });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const googleLogin = () => {
  window.location.href = `${API_BASE_URL}/auth/google`;
};
