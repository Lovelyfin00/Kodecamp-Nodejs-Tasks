const express = require("express");
const logger = require("morgan");
const server = express();
//setup database
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const protectedUserRoutes = require("./routes/protectedRoutes");
require('dotenv').config()

//middlewares
server.use(express.json());
//middleware for files
server.use(express.urlencoded({extended: false}));
server.use(logger("dev"))

const connection =  mongoose.connect(process.env.MONGODB_URL);

connection.then(() => {
    console.log("Connection successfully to mongoose db");
}).catch((error) => {
    console.log("An error occured while trying to connect " + error);
})

server.use("/user", userRoutes);
server.use("/user", protectedUserRoutes);

server.listen(process.env.PORT, function(){
    console.log("Server is up");
})