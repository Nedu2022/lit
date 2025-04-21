import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js"; // Import the userRoutes
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());



// Check environment variables at startup
console.log("Starting server with email config:", {
  EMAIL_USER_SET: !!process.env.EMAIL_USER,
  EMAIL_PASS_SET: !!process.env.EMAIL_PASS
});

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use("/api", userRoutes); // Use the userRoutes

const PORT = process.env.PORT || 5300;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
