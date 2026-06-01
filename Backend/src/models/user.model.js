const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: [true, "username is required for user"],
        unique :[true, "username already taken"]
    },
    email:{
        type:String,
        required: [true, "email is required for user"],
        unique :[true, "email already taken"]
    },
    password:{
        type:String,
        required: [true, "password is required for user"],
    }
},{
    timestamps:true
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel