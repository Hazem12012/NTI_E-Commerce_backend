import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  userName: String,
  age: Number,
  password: String,
  email: String,
});

const userModel = mongoose.model("User", userSchema);
export default userModel;