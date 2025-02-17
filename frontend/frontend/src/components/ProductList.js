import React, { useEffect, useState } from "react";
import { getProducts } from "../services/api";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    fetchProducts();
  }, [page, sortBy]);

  const fetchProducts = async () => {
    const data = await getProducts({ page, sortBy });
    setProducts(data.products);
    setTotal(data.total);
  };

  return (
    <div>
      <h2>Product List</h2>
      <select onChange={(e) => setSortBy(e.target.value)}>
        <option value="date">Sort by Date</option>
      </select>
      <ul>
        {products.map((p) => (
          <li key={p._id}>{p.name} - ${p.price}</li>
        ))}
      </ul>
      <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
      <button disabled={page * 10 >= total} onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default ProductList;
