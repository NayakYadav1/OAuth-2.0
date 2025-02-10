const dotenv = require('dotenv');
const express = require('express');
const fetch = require('node-fetch');

dotenv.config();

const app = express();

app.use (express.json());

app.get("/", async (req, res) => {
    res.send("Sign in with Google");
})

app.get('/google/callback', async (req, res) => {
    res.send("Google OAuth Callback Url!");
})

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})