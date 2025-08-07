import mongoose from "mongoose";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://hazemmahmoud12012:MgzQJBnK779uHdnK@cluster0.bzjzdho.mongodb.net/"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  confirmation: { type: Boolean, default: false },
  type: { type: String, default: "user" },
  cart: [],
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
