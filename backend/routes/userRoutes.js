import express from "express";
import User from "../models/User.js";

const router = express.Router();

// POST route to save user data
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, age } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered!" });
    }

    const user = new User({ name, email, phone, age });
    await user.save();

    res.status(201).json({ message: "User registered successfully!", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
