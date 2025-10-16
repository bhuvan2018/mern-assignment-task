import express from "express";
import multer from "multer";
import { uploadCSV, getAssignments } from "../controllers/uploadController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", protect, upload.single("file"), uploadCSV);

router.get("/", protect, getAssignments);

export default router;