import uploadRoutes from "./routes/uploadRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/api/auth", authRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));