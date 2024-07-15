const { v4 } = require("uuid");
const { usersCollection } = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const addNewUser = async(req, res) => {
    const {fullName, email, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10); // 10 is the amount of time its going to hash the password

    const checkUserExists = await usersCollection.findOne({email});

    if(checkUserExists){
        res.send({
            status: false,
            message: "Email address has been taken!",
        })
        return;
    }

    await usersCollection.create({
        fullName: fullName,
        email: email,
        password: hashedPassword
    })

    const users = await usersCollection.find({});

    res.send({
        status: true,
        message: "User added successfully",
        data: users
    })
}

const getAllUsers = async(req, res) => {
    const users = await usersCollection.find({});
    res.send(users);
}

const login = async(req, res) => {
    const {email, password} = req.body;
    let resData = {};

    const userData = await usersCollection.findOne({email});
    let loginAttempt = userData?.loginAttempt ? userData?.loginAttempt : 0;

    if(!userData){
        res.send({
            status: false,
            message: "Invalid credentials", //use this instead of email does not exist for security
        })

        return; 
    }else if(parseInt(loginAttempt) >= 5){
        res.send({
            status: false,
            message: "Your account has been blocked. Please contact our customer care support!",
        })
        return;
    }

    const doPasswordMatch = bcrypt.compareSync(password, userData.password)

    if(!doPasswordMatch){
        resData = {
            status: false,
            message: "Invalid credentials",
        }

        loginAttempt += 1;
        userData["loginAttempt"] = loginAttempt;

        await usersCollection.findByIdAndUpdate(userData._id, userData);

            if(parseInt(loginAttempt) >= 5){
                resData = {
                    status: false,
                    message: "Your account has been blocked. Please contact our customer care support!",
                }
            }
    }else{
        userData["loginAttempt"] = 0;

        await usersCollection.findByIdAndUpdate(userData._id, userData);

        const userToken = jwt.sign({
            userId: userData._id,
            email: userData.email
        }, process.env.AUTH_KEY)

        resData = {
            status: true,
            message: "Login successful",
            data: {
                fullName: userData.fullName,
                email: email,
                token: userToken
            }
        }
    }
    
    res.send(resData);

    //also implement max amount of time a user try loggin it at a time
}

const forgotPassword = async(req, res) => {
    const {email} = req.body;

    const userData = await usersCollection.findOne({email});
    const token = v4();

    if(!userData){
        res.send({
            status: false,
            message: "Invalid credentials", //use this instead of email does not exist for security
        })

        return;
    }

    userData["token"] = token;
    await usersCollection.findByIdAndUpdate(userData._id, userData);

    res.send({
        status: true,
        message: "Reset your password with the token sent to your email", //use this instead of email does not exist for security
        data: {
            _id: userData._id,
            token: userData.token
        }
    })
}

const resetPassword = async(req, res) => {
    const {token, password, _id} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const userData = await usersCollection.findOne({token, _id});

    if(!userData){
        res.send({
            status: false,
            message: "Invalid reset token", //use this instead of email does not exist for security
        })

        return;
    }

    await usersCollection.findByIdAndUpdate(_id, { password: hashedPassword, token:"" })

    res.send({
        status: true,
        message: "Password updated successfully", //use this instead of email does not exist for security
    })
}

module.exports = {
    addNewUser,
    login,
    getAllUsers,
    forgotPassword, 
    resetPassword,
}