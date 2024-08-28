const express = require("express");
const registerModel = require("../models/register.model");
const registerRoute = express.Router();
const nodemailer = require("nodemailer");
const loginModel = require("../models/login.model");
const bcrypt = require("bcrypt")

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com", 
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_AUTH_EMAIL,
        pass: process.env.SMTP_AUTH_PASSWORD,
    },
});


async function sendOTPVerificationEmail({_id, email}, res) {
    try {
        const OTP = `${Math.floor(1000 + Math.random() * 9000)}`;
        const mailOptions = {
            from: {
                name: "Verify Your KFC Account 💛",
                address: process.env.SMTP_AUTH_EMAIL
            },
            to: email,
            subject: "Verify account using OTP",
            html: `<p>Enter <b>${OTP}</b> in the application to verify your email address, and complete the verification process</p>
                   <p>This OTP will expire in <b>1 Hour</b></p>`,
        };
        const hashedPassword =await bcrypt.hash(OTP,5)
        let user = new loginModel({
            userId: _id,
            otp: hashedPassword,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000, 
        });
        await user.save();
        await transporter.sendMail(mailOptions);

        res.json({
            status: "PENDING",
            message: "Verification OTP mail sent",
            data: {
                userId: _id,
                email
            }
        });
    } catch (error) {
        res.json({
            status: "FAILED",
            message: error.message
        });
    }
}

registerRoute.post("/user-register", async (req, res) => {
    const { fname, lname, email, dob, mobile } = req.body;

    try {
        let user = await registerModel.findOne({ email });
        if (user) {
            return res.status(400).send("User already exists");
        }

        let person = new registerModel({
            fname,
            lname,
            email,
            dob,
            mobile,
            verified: false
        });

        let savedUser = await person.save();
        sendOTPVerificationEmail(savedUser, res);
    } catch (error) {
        res.status(500).send("Failed to register user: " + error.message);
    }
});

registerRoute.post("/verify-otp",async(req,res)=>{
    const {userId,otp} = req.body
    try {
        if(!otp){
            return res.send("Please enter OTP")
        }
        const checkUser = await loginModel.find({userId})
        console.log(checkUser);
        
        if(checkUser.length<=0){
            return res.send("Account record doesn't exists or has been varified already, Please signup or login")
        }
        const {expiresAt} = checkUser[0]
        const hashedOTP = checkUser[0].otp
        if(expiresAt<=Date.now()){
            await loginModel.deleteMany({userId})
            return res.send("OPT expired please login again")
        }
        const varifyOTP = await bcrypt.compare(otp,hashedOTP)
        if(!varifyOTP){
            return res.send("Please enter valid OPT")
        }
        await registerModel.updateOne({_id:userId},{verified:true})
        await loginModel.deleteMany({userId})
        res.json({
            status: "VERIFIED",
            message:"User email varified successfully"
        });
    } catch (error) {
        res.json({
            status: "FAILED",
            message: error.message
        });
    }
})

registerRoute.post("/resend-otp",async(req,res)=>{
    try {
        const {userId,email}=req.body
        if(!userId || !email){
            return res.send("Empty details are not allowed")
        }
        await loginModel.deleteMany({userId})
        sendOTPVerificationEmail({_id:userId,email},res)
    } catch (error) {
        res.json({
            status: "FAILED",
            message: error.message
        });
    }
})
module.exports = registerRoute;
