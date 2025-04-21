import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Email should still be unique
  phone: { type: String, required: true, },
  level: { type: String, required: true },
  department: { type: String, required: true },
  interestedCourse: { type: String, required: true },
  image: { type: String },
});

// Remove any pre-existing unique index and just create a background index
userSchema.index({ fullName: 1 }, { background: true });

const User = mongoose.model("User", userSchema);
export default User;
