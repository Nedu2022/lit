import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, match: [/^\d{11}$/, "Invalid phone number"] },
    age: { type: Number, min: 0, max: 120 },
    createdAt: { type: Date, default: Date.now },
  });
  

const User = mongoose.model("User", UserSchema);

export default User;
