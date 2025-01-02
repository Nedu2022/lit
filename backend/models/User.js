import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  level: { type: String, required: true },
  department: { type: String, required: true },
  interestedCourse: { type: String, required: true },
  image: { type: String }, // Optional field for profile image URL or file name
});

const User = mongoose.model("User", userSchema);
export default User;
