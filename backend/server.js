const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

// Initialize Express app
const app = express();

// Enable CORS for all origins (or specify specific origins)
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// MongoDB connection setup
mongoose.connect("mongodb+srv://LIT:Noonerd_123@cluster0.t0nto.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error: ", err));

// Define a schema and model for the form data
const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  level: String,
  department: String,
  interestedCourse: String,
  image: String, // Store image URL or path
});

const User = mongoose.model("User", userSchema);

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// POST route for form submission
app.post("/api/submit-form", upload.single("image"), async (req, res) => {
  const { fullName, email, phone, level, department, interestedCourse } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    // Create a new user based on the form data
    const newUser = new User({
      fullName,
      email,
      phone,
      level,
      department,
      interestedCourse,
      image: imagePath, // Store the image URL or file path
    });

    // Save the new user to the database
    await newUser.save();
    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    res.status(400).json({ error: "Error submitting form" });
  }
});

// Start the server on a specific port
const PORT = 5300;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
