import * as dotenv from "dotenv";
import express from "express";
import fetch from "node-fetch";

dotenv.config();

const app = express();

app.use(express.json());

// Redirect the user to the Google OAuth Consent Screen
const GOOGLE_OAUTH_URL = process.env.GOOGLE_OAUTH_URL;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CALLBACK_URL = "http%3A//localhost:8000/google/callback";
const GOOGLE_OAUTH_SCOPES = [
  "https%3A//www.googleapis.com/auth/userinfo.email",

  "https%3A//www.googleapis.com/auth/userinfo.profile",
];

app.get("/", async (req, res) => {
  const state = "some_state";
  const scopes = GOOGLE_OAUTH_SCOPES.join(" ");
  const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${GOOGLE_OAUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_CALLBACK_URL}&accress_type=offline&response_type=code&state=${state}&scope=${scopes}`;
  res.redirect(GOOGLE_OAUTH_CONSENT_SCREEN_URL);
});

// Handle the OAuth 2.0 server response
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_ACCESS_TOKEN_URL = process.env.GOOGLE_ACCESS_TOKEN_URL;

app.get("/google/callback", async (req, res) => {
  console.log(req.query);

  const { code } = req.query;

  const data = {
    code,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: "http://localhost:8000/google/callback",
    grant_type: "authorization_code",
  }

  console.log(data);

//   exchange authorization code for access token & id_token
  const response = await fetch(GOOGLE_ACCESS_TOKEN_URL, {
    method: "POST",
    body: JSON.stringify(data),
  });

  const access_token_data = await response.json();
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
