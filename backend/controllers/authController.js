import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const loginUser = async (req, res) => {
  console.log("BODY:", req.body);
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Provide email and password" });

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
};

export const seedAdmin = async (req, res) => {
  try {
    const existing = await User.findOne({ email: req.body.email });
    if (existing) return res.status(400).json({ message: "Admin already exists" });
    const admin = await User.create({ name: req.body.name, email: req.body.email, password: req.body.password, role: "admin" });
    res.status(201).json({ message: "Admin created", admin: { email: admin.email, id: admin._id } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};