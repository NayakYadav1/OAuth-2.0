// controllers/productController.js
const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  const { page = 1, limit = 10, sortBy = 'createdAt', order = 'desc', minPrice, maxPrice } = req.query;

  const query = {};
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = minPrice;
    if (maxPrice) query.price.$lte = maxPrice;
  }

  const products = await Product.find(query)
    .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Product.countDocuments(query);

  res.json({
    products,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  });
};