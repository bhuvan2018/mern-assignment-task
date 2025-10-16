import Agent from "../models/Agent.js";
import bcrypt from "bcryptjs";

export const createAgent = async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "Name, email and password required" });

  const exists = await Agent.findOne({ email });
  if (exists) return res.status(400).json({ message: "Agent with email already exists" });

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const agent = await Agent.create({
    name,
    email,
    phone,
    password: hashed,
    createdBy: req.user ? req.user._id : null
  });

  res.status(201).json(agent);
};

export const listAgents = async (req, res) => {
  const agents = await Agent.find().select("-password").sort({ createdAt: -1 });
  res.json(agents);
};