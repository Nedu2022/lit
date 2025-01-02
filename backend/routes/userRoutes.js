import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/submit-form", async (req, res) => {
  try {
    console.log("Received request body:", req.body); // Log the request body
    
    const { fullName, email, phone, level, department, interestedCourse, image } = req.body;
    const newUser = new User({
      name: fullName,
      email,
      phone,
      level,
      department,
      interestedCourse,
      image: image ? image : null
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error:", error.message); // Log the error message
    res.status(400).json({ error: error.message });
  }
});




export default router;
