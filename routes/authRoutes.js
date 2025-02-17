import express from "express";
import { googleAuth } from "../controllers/authController.js";

const router = express.Router();
router.get("/google/callback", googleAuth);
export default router;
