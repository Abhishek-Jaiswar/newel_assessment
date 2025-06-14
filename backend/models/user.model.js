import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // ensures some strength
  },
  contact: {
    type: String, 
    required: true,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number'] 
    // This is server side validation we'll also implement validation in client side
  },
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
