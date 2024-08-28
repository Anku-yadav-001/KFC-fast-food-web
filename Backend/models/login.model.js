const mongoose = require("mongoose")

const loginSchema = mongoose.Schema({
    userId:{type:String,required:true},
    otp:{type:String,required:true},
    createdAt:Date,
    expiresAt:Date
})

const loginModel = mongoose.model("loggedin-user",loginSchema)

module.exports = loginModel