import express from "express";
import nodemailer from "nodemailer";
import User from "../models/User.js"; 
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post("/register", async (req, res) => {
  const { fullName, email, phone, level, department, interestedCourse, image } = req.body;
  
  console.log("Registration request received for:", email);
  
  try {
    // Save user in database
    const newUser = new User({ fullName, email, phone, level, department, interestedCourse, image });
    await newUser.save();
    console.log(`✅ User saved: ${fullName} (${email})`);

    // Setup transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',  // Using predefined service instead of manual host/port setup
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });

    // Define email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Ladies in Tech!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #6b46c1;">Welcome to Ladies in Tech!</h2>
          <p>Hello ${fullName},</p>
          <p>Thank you for applying to Ladies in Tech! We're thrilled to have you on board.</p>
          <p>Your registration details:</p>
          <ul>
            <li><strong>Course Interest:</strong> ${interestedCourse}</li>
            <li><strong>Department:</strong> ${department}</li>
            <li><strong>Level:</strong> ${level}</li>
          </ul>
          <p>We'll be in touch soon with next steps!</p>
          <p>Best Regards,<br>Ladies in Tech Team</p>
        </div>
      `
    };

    // Send the email
    try {
      console.log("Attempting to send welcome email...");
      const info = await transporter.sendMail(mailOptions);
      console.log(`✅ Email sent: ${info.messageId}`);
      res.status(200).json({ message: "Application submitted & email sent!" });
    } catch (emailError) {
      console.error("❌ Failed to send email:", emailError);
      // Still return success to user since registration worked
      res.status(200).json({ 
        message: "Registration successful! (Email delivery issue - we'll contact you soon)",
        emailError: emailError.message 
      });
    }
  } catch (error) {
    console.error("❌ Error during registration:", error);
    res.status(500).json({ message: "Registration failed.", error: error.message });
  }
});

// Add your login route here
router.post("/login", async (req, res) => {
  const { email, fullName } = req.body;
  try {
    const user = await User.findOne({ email, fullName });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;