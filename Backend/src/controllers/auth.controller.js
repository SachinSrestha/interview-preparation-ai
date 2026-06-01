const userModel = require("../models/user.model")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")

/** @name Register User
 *  @description register a new user, expects username,email and password
 */
async function registerUserController(req, res){
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        return res.status(404).json({
            message:"Username, email or password missing",
        })
    }

    const isExists = await userModel.findOne({
        $or:[
            {email}, {username}
        ]
    })
    if(isExists){
        return res.status(401).json({
            message:"User already exists",
        })
    }
    const hashPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password:hashPassword
    })

    const token = jwt.sign({id:user._id, username:user.username}, process.env.JWT_SECRET, {expiresIn:"3d"})
    res.cookie("token", token)

    return res.status(201).json({
        message:"User created successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        },
    })
}

/** @name Login User
 *  @description login a existing user, expects email and password
 */
async function loginUserController(req, res){
    const {email, password}= req.body;

    const user = await userModel.findOne({email})
    if(!user){
        return res.status(400).json({
            message:"User not found."
        })
    }

    const comparePassword = await bcrypt.compare(password, user.password)

    if(!comparePassword){
        return res.status(400).json({
            message:"Incorrect email or password"
        })
    }

    const token = jwt.sign({id:user._id, username:user.username}, process.env.JWT_SECRET, {expiresIn:"3d"})
    res.cookie("token", token)

    return res.status(200).json({
        message:"User Logged In Successfully.",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        },
    })
}

/** @name Logout User
 *  @description Logs out an logged in user
 */
async function logoutUserController(req,res){
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({
            message:"Token Invalid or expired"
        })
    }

    res.clearCookie("token");
    await tokenBlacklistModel.create({
        token
    })

    return res.status(200).json({
        message:"User logged out successfully."
    })
}

/** @name Get User Information
 *  @description Fetches the current logged in user information
 */
async function getMeController(req,res){
    const user = req.user
    if(!user){
        return res.status(404).json({
            message:"User not found"
        })
    }

    return res.status(200).json({
        message:"User details fetched successfully",
        user:{
            id:user._id,
            username:user.username,
            email: user.email
        }
    })
}

module.exports ={
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}