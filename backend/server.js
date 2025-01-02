import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

mongoose.connection.on('error', err => {
  console.error(`Mongoose connection error: ${err.message}`);
});
mongoose.connection.on('disconnected', () => {
  console.warn('Mongoose connection lost');
});
mongoose.connection.on('reconnected', () => {
  console.log('Mongoose reconnected');
});

// Routes
app.use("/api", userRoutes);

// Start the server
const PORT = process.env.PORT || 5300;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
