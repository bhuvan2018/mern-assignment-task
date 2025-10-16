import express from "express";
import { loginUser, seedAdmin } from "../controllers/authController.js";

const router = express.Router();
router.post("/login", loginUser);
router.post("/seed-admin", seedAdmin);

export default router;