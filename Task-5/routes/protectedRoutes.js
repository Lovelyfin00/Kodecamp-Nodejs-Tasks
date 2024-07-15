const express = require("express");
const jwt = require("jsonwebtoken");
const { usersCollection } = require("../models/users");
const userRoutes = require("./users");

const protectedUserRoutes = express.Router();

const checkIfLoggedIn = async (req, res, next) => {
    const authToken = req.headers.authorization;

    if (!authToken || !authToken.startsWith("Bearer ")) {
        return res.send({
            status: false,
            message: "Unauthorized: No token provided"
        });
    }

    const token = authToken.split(" ")[1];

    if(token) {
        const decoded = jwt.verify(token, process.env.AUTH_KEY);
        req.userDetails = decoded;
        next();
    } else {
        return res.send({
            status: false,
            message: "Unauthorized: Invalid token"
        });
    }
};

protectedUserRoutes.use(checkIfLoggedIn);

protectedUserRoutes.post("/view-user", async (req, res) => {
    const userData = await usersCollection.findOne({ email: req.userDetails.email });
    
    if (!userData) {
        return res.status(404).json({
            status: false,
            message: "User not found"
        });
    }

    res.status(200).json({
        status: true,
        message: "User details retrieved successfully",
        data: {
            email: userData.email,
            fullName: userData.fullName
        }
        });
});

module.exports = protectedUserRoutes;
