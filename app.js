// import express from "express";
// const app = express();
// app.use(express.json()); // to receive the json data

// const users = [];
// app.get("/", (req, res) => {
//   res.send("Home");
// });

// app.get("/users", (req, res) => {
//   if (users.length == 0) {
//     res.status(404).send("Users not found !");
//     return;
//   } else {
//     res.status(200).send(users);
//   }
// });

// app.post("/users", (req, res) => {
//   res.send("Create!");
//   users.push(req.body);
//   console.log(req.body);
// });

// app.listen(3000, () => {
//   console.log("server runing");
// });
// const express = require("express");  =>  this is the old syntax

// import express from "express";
// import bcrypt from "bcrypt";

// const app = express();
// const port = 3000;
// const users = [];

// app.use(express.json());
// app.get("/users", (req, res) => {
//   res.json(users);
// });

// app.post("/register", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const findUser = users.find((data) => email == data.email);
//     if (findUser) {
//       res
//         .status(400)
//         .json({ error: "the user name and password con't be used !" });
//       return;
//     }
//     const hashedPassword = await bcrypt.hash(password, 8);
//     users.push({ email, password: hashedPassword });
//     console.log(users);
//     res.status(201).json(req.body);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const findUser = users.find((data) => data.email === email);
//     if (!findUser) {
//        return res
//         .status(400)
//         .json({ message: "This email and password do not match !" });

//     }

//     const matchPassword = await bcrypt.compare(password, findUser.password);
//     if (matchPassword) {
//     return res.status(302).json({ message: "Login is success" });
//     } else {
//       return res
//         .status(400)
//         .json({ message: "This email and password do not match !" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.listen(port, () => {
//   console.log("server is runing");
// });

import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const port = 3000;

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/NTI")
  .then(() => console.log("mongo is connected"))
  .catch((error) => console.log(error)); // return promise

const userSchema = new mongoose.Schema({
  userName: String,
  age: Number,
  password: String,
  email: String,
});

const userModel = mongoose.model("User", userSchema);

const register = require("./routes/register");
const login = require("./routes/login");
const get = require("./routes/get");
const deleteUser = require("./routes/delete");
const update = require("./routes/update");


app.use("/register", register);
app.use("/login", login);
app.use("/get", get);
app.use("/delete", deleteUser);
app.use("/update", update);


app.listen(port, () => {
  console.log("server stated");
});
