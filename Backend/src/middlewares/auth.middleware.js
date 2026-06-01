const tokenBlacklistModel = require("../models/blacklist.model")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

async function authUser(req,res, next){
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

    if(!token){
        return res.status(400).json({
            message:"Token invlaid or expired"
        })
    }

    const isBlacklisted = await tokenBlacklistModel.findOne({token})
    if(isBlacklisted){
        return res.status(401).json({
            message:"Unauthorized Access, Token invalid"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.id)
        req.user = user
        next()
    } catch (err) {
        return res.status(401).json({
            message:"Unauthorized Access, Token invalid"
        })
    }
}

module.exports = {
    authUser
}