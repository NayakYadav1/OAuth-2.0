import Product from "../models/Product.js";

// Fetch products with pagination, filters & sorting
export const getProducts = async (req, res) => {
  const { category, minPrice, maxPrice, sortBy, page = 1, limit = 10 } = req.query;

  let filter = {};
  if (category) filter.category = category;
  if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
  if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };

  let sortOptions = {};
  if (sortBy === "date") sortOptions.createdAt = -1;

  const products = await Product.find(filter)
    .sort(sortOptions)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json({ total: await Product.countDocuments(filter), products });
};
