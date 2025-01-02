import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/submit-form", async (req, res) => {
  try {
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
    if (error.code === 11000) { // Duplicate key error code
      const duplicateField = Object.keys(error.keyPattern)[0];
      res.status(400).json({ error: `${duplicateField} already exists. Please use a different ${duplicateField}.` });
    } else if (error.name === 'ValidationError') { 
      const field = Object.keys(error.errors)[0];
      const message = error.errors[field].message;
      res.status(400).json({ error: message });
    } else {
      console.error("Error:", error.message); // Log the error message
      res.status(400).json({ error: error.message });
    }
  }
});





export default router;
