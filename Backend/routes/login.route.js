const express = require("express");
const registerModel = require("../models/register.model");
const loginModel = require("../models/login.model");
const loginRoute = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

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

async function sendOTPVerificationEmail({ _id, email }, res) {
    try {
        const OTP = `${Math.floor(1000 + Math.random() * 9000)}`;
        const mailOptions = {
            from: {
                name: "Verify Your KFC Account 💛",
                address: process.env.SMTP_AUTH_EMAIL,
            },
            to: email,
            subject: "Verify account using OTP",
            html: `<p>Enter <b>${OTP}</b> in the application to verify your email address and complete the verification process.</p>
                   <p>This OTP will expire in <b>1 Hour</b>.</p>`,
        };

        const hashedOTP = await bcrypt.hash(OTP, 10);
        const user = new loginModel({
            userId: _id,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
        });

        await user.save();
        await transporter.sendMail(mailOptions);

        res.status(200).json({
            status: "PENDING",
            message: "Verification OTP mail sent",
            data: {
                userId: _id,
                email,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
}

loginRoute.post("/user-login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await registerModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Incorrect email", status: "FAILED" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect password", status: "FAILED" });
        }

        sendOTPVerificationEmail(user, res);
    } catch (error) {
        res.status(500).json({ message: error.message, status: "FAILED" });
    }
});

loginRoute.post("/verify-otp", async (req, res) => {
    const { userId, otp } = req.body;
    try {
        if (!otp) {
            return res.status(400).json({ message: "Please enter OTP", status: "FAILED" });
        }

        const checkUser = await loginModel.findOne({ userId });

        if (!checkUser) {
            return res.status(404).json({ message: "Account record doesn't exist or has already been verified. Please sign up or log in.", status: "FAILED" });
        }

        const { expiresAt, otp: hashedOTP } = checkUser;
        if (expiresAt <= Date.now()) {
            await loginModel.deleteMany({ userId });
            return res.status(410).json({ message: "OTP expired, please log in again", status: "FAILED" });
        }

        const isOTPValid = await bcrypt.compare(otp, hashedOTP);
        if (!isOTPValid) {
            return res.status(400).json({ message: "Invalid OTP", status: "FAILED" });
        }

       
        await registerModel.updateOne({ _id: userId }, { verified: true });
        await loginModel.deleteMany({ userId });

       
        const token = jwt.sign({ email: checkUser.email }, process.env.JWT_SECRET || "kfc-clone", {
            expiresIn: "1h", 
        });

      
        res.status(200).json({
            status: "VERIFIED",
            message: "User email verified successfully",
            token, 
        });
    } catch (error) {
        res.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
});

loginRoute.post("/resend-otp", async (req, res) => {
    try {
        const { userId, email } = req.body;
        if (!userId || !email) {
            return res.status(400).json({ message: "Empty details are not allowed", status: "FAILED" });
        }

        await loginModel.deleteMany({ userId });
        sendOTPVerificationEmail({ _id: userId, email }, res);
    } catch (error) {
        res.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
});

loginRoute.post("/logout", (req, res) => {
    res.status(200).json({
        status: "SUCCESS",
        message: "Logged out successfully",
        token: null,
    });
})

module.exports = loginRoute;
