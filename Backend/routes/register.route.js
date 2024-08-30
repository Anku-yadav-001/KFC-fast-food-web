const express = require("express");
const registerModel = require("../models/register.model");
const registerRoute = express.Router();
const loginModel = require("../models/login.model");
const bcrypt = require("bcrypt")


registerRoute.post("/user-register", async (req, res) => {
    const { fname, lname, email, dob, mobile, password } = req.body;

    try {
        let user = await registerModel.findOne({ email });
        if (user) {
            return res.status(400).send("User already exists");
        }

        bcrypt.hash(password,5, async (err,hashed)=>{
            if(err){
                return res.send("error occure ducring hashing")
            }
            let person = new registerModel({
                fname,
                lname,
                email,
                dob,
                mobile,
                verified: false,
                password:hashed
            });
            await person.save();
            res.status(202).send("user registered successfully")
        })

    } catch (error) {
        res.status(500).send("Failed to register user: " + error.message);
    }
});

module.exports = registerRoute;
