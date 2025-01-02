import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, match: [/^\d{11}$/, "Invalid phone number"] },
  level: { type: String, required: true },
  department: { type: String, required: true },
  interestedCourse: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);


export default User;
