import { Schema, model } from "mongoose";

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin", "premium"],
    default: "user",
  },
  image: {
    type: String,
  },
  isGithub: {
    type: Boolean,
    default: false,
  },
  isGoogle: {
    type: Boolean,
    default: false,
  },
  lastConnection: {
    type: Date,
    default: Date.now,
  },
});

const userColl = "users";
export const UserModel = model(userColl, userSchema);
