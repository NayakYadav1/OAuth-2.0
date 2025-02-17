import User from "../models/User.js";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

export const googleAuth = async (req, res) => {
  const { code } = req.query;

  const data = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: "http://localhost:8000/google/callback",
    grant_type: "authorization_code",
  };

  const response = await fetch(process.env.GOOGLE_ACCESS_TOKEN_URL, {
    method: "POST",
    body: JSON.stringify(data),
  });

  const access_token_data = await response.json();
  const { id_token } = access_token_data;

  const token_info_response = await fetch(
    `${process.env.GOOGLE_TOKEN_INFO_URL}?id_token=${id_token}`
  );

  const token_info_data = await token_info_response.json();
  const { email, name } = token_info_data;

  let user = await User.findOne({ email });
  if (!user) user = await User.create({ email, name });

  const token = user.generateToken();
  res.json({ user, token });
};
