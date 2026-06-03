const userModel = require("../models/user.model")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")

/** @name Register User
 *  @description register a new user, expects username,email and password
 */
async function registerUserController(req, res){
    try {
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

        const token = jwt.sign({id:user._id, username:user.username}, process.env.JWT_SECRET, {expiresIn:"4d"})
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 4 * 24 * 60 * 60 * 1000 // 4 days
        })

        return res.status(201).json({
            message:"User created successfully",
            user:{
                id:user._id,
                username:user.username,
                email:user.email
            },
        })
    } catch (error) {
        console.error("Error in registerUserController:", error)
        return res.status(500).json({
            message: "An error occurred during registration.",
            error: error.message
        })
    }
}

/** @name Login User
 *  @description login a existing user, expects email and password
 */
async function loginUserController(req, res){
    try {
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

        const token = jwt.sign({id:user._id, username:user.username}, process.env.JWT_SECRET, {expiresIn:"4d"})
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 4 * 24 * 60 * 60 * 1000 // 4 days
        })

        return res.status(200).json({
            message:"User Logged In Successfully.",
            user:{
                id:user._id,
                username:user.username,
                email:user.email
            },
        })
    } catch (error) {
        console.error("Error in loginUserController:", error)
        return res.status(500).json({
            message: "An error occurred during login.",
            error: error.message
        })
    }
}

/** @name Logout User
 *  @description Logs out an logged in user
 */
async function logoutUserController(req,res){
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if(!token){
            return res.status(401).json({
                message:"Token Invalid or expired"
            })
        }

        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        await tokenBlacklistModel.create({
            token
        })

        return res.status(200).json({
            message:"User logged out successfully."
        })
    } catch (error) {
        console.error("Error in logoutUserController:", error)
        return res.status(500).json({
            message: "An error occurred during logout.",
            error: error.message
        })
    }
}

/** @name Get User Information
 *  @description Fetches the current logged in user information
 */
async function getMeController(req,res){
    try {
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
    } catch (error) {
        console.error("Error in getMeController:", error)
        return res.status(500).json({
            message: "An error occurred while fetching user details.",
            error: error.message
        })
    }
}

module.exports ={
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}