import express from "express";
import { createAgent, listAgents } from "../controllers/agentController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createAgent);
router.get("/", protect, listAgents);

export default router;