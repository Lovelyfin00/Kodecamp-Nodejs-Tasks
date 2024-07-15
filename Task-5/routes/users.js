const express = require("express");
const { addNewUser, getAllUsers, login, forgotPassword, resetPassword } = require("../controllers/usersCollection");

const userRoutes = express.Router();

userRoutes.post("/register", addNewUser);
userRoutes.get("/", getAllUsers);
userRoutes.post("/login", login);
userRoutes.post("/forgot-password", forgotPassword);
userRoutes.post("/reset-password", resetPassword);

module.exports = userRoutes;
