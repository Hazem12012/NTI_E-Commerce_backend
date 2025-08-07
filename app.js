import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// import the route files
// => user
import userRoute from "./routes/user/user_get_data.js";
import userLogin from "./routes/user/user_login.js";
import userRegister from "./routes/user/user_register.js";
import userDelete from "./routes/user/delete_user.js";
import userUpdataInfo from "./routes/user/user_update.js";
import emailConfirm from "./routes/user/user_email_confirm.js";
import add_to_cart from "./routes/user/cart/add_to_cart.js";
import delete_product from "./routes/user/cart/delete_product.js";
import update_product from "./routes/user/cart/update_product.js";
import get_products from "./routes/user/cart/get_products.js";
// = >admin
import admin_get_users from "./routes/admin/admin_get_users.js";
import admin_update_user from "./routes/admin/admin_update_user.js";
import admin_delete_user from "./routes/admin/admin_delete_user.js";

const app = express();

app.use(express.json());

// mongoose
//   .connect("mongodb://localhost:27017/NTI")
//   .then(() => console.log("mongo is connected"))
//   .catch((error) => console.log(error)); // return promise

// use route  files
app.use(
  "/user",
  userRoute,
  userLogin,
  userRegister,
  userDelete,
  userUpdataInfo,
  emailConfirm,
  add_to_cart,
  delete_product,
  update_product,
  get_products
);

app.use("/admin", admin_get_users, admin_update_user, admin_delete_user);

const port = 3000;
app.listen(port, () => {
  console.log("server stated");
});
