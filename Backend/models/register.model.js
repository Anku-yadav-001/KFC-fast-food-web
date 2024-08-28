const mongoose = require("mongoose")

const registerSchema = mongoose.Schema({
    fname:{type:String,required:true},
    lname:{type:String,required:true},
    email:{type:String,required:true},
    dob:{type:Date,required:true},
    mobile:{type:Number,required:true},
})

const registerModel = mongoose.model("registered-user",registerSchema)

module.exports = registerModel