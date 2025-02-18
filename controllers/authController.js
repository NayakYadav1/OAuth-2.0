// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.googleCallback = async (req, res) => {
  const { email, name } = req.user;
  let user = await User.findOne({ email }).select('-password');
  if (!user) {
    user = await User.create({ email, name });
  }
  const token = user.generateToken();
  res.status(200).json({ user, token });
};