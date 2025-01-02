import express from "express";
import User from "../models/user.js";
const router = express.Router();

// User Registration
router.post("/register", async (req, res) => {
  const { fullName, email, phone, level, department, interestedCourse, image } = req.body;
  try {
    const user = new User({ fullName, email, phone, level, department, interestedCourse, image });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// User Login
router.post("/login", async (req, res) => {
  const { email, fullName } = req.body;
  try {
    const user = await User.findOne({ email, fullName });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
