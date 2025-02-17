import React from "react";
import ProductList from "../components/ProductList";
import { googleLogin } from "../services/api";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Store</h1>
      <button onClick={googleLogin}>Login with Google</button>
      <ProductList />
    </div>
  );
};

export default Home;
