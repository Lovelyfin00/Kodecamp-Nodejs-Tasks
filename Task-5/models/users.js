const  mongoose = require("mongoose");

//create schema to store user data and validate the values being sent
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    loginAttempt: {
        type: Number
    },
    token: {
        type: String
    }
}, {
    timestamps: true
})

//table to store the data. first is the name of the table, second is the schema
const usersCollection = mongoose.model("users", userSchema);

module.exports = {
    usersCollection
}