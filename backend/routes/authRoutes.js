import express from "express";
import { googleAuth, google } from "../controllers/authController.js";

const router = express.Router();
// Route to initiate Google OAuth
router.get("/google", google);
router.get("/google/callback", googleAuth);
export default router;
