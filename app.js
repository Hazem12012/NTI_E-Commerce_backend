import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// import the route files
import userRoute from "./routes/user/user_get_data.js";
import userLogin from "./routes/user/user_login.js";
import userRegister from "./routes/user/user_register.js";

const app = express();
const port = 3000;

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/NTI")
  .then(() => console.log("mongo is connected"))
  .catch((error) => console.log(error)); // return promise

// use route  files
app.use("/user", userRoute, userLogin, userRegister);
// app.use("/user/login", userRoute);

// GET to represent the users

// app.get("/admin", async (req, res) => {
//   try {
//     // const findUser = await userModel.findById(req.params.id);
//     const users = await userModel.find();
//     // if (!findUser) {
//     //   res.status(404).json({ mesage: "user not found" });
//     // } else {
//     // }
//     res.status(200).json({ message: "All users", users });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

// // PUT to update the user data
// app.put("/user/:id", express.json(), async (req, res) => {
//   const { id } = req.params;

//   try {
//     const exsist = await userModel.findOne({ _id: req.params.id });
//     if (!exsist) {
//       return res.json({ message: "this id is not correct " });
//     }
//     const updateUser = await userModel.findByIdAndUpdate(
//       req.params.id,
//       { ...req.body },
//       { returnDocument: "after" }
//     );
//     res.status(200).json({ message: "Updated successfully", updateUser });
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// });

// // delete user
// app.delete("/user/:id", express.json(), async (req, res) => {
//   try {
//     const deleteUser = await userModel.findByIdAndDelete(req.params.id);
//     return res
//       .status(200)
//       .json({ message: "Deleted  successfully", deleteUser });
//   } catch (error) {
//     return res.status(404).json({ error: "failed  to delete" });
//   }
// });

app.listen(port, () => {
  console.log("server stated");
});
