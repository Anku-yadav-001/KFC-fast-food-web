const express = require("express")
const dotenv = require('dotenv').config()
const PORT = process.env.PORT
const server = express()
const connection = require("./dbconfig/db")
const registerRoute = require("./routes/register.route")
const menuRoute = require("./routes/menu.route")
const featuredRoute = require("./routes/featured.route")
const carouselRouter = require("./routes/carousel.route")
const cors = require("cors")

server.use(cors())
server.use(express.json())
server.use("/register",registerRoute)
server.use("/menu",menuRoute)
server.use("/featured",featuredRoute)
server.use("/carousel",carouselRouter)

server.get("/",(req,res)=>{
    res.send("server is working fine")
})

server.listen(PORT,async(req,res)=>{
    try {
        await connection
        console.log(`connected to database`)
        console.log(`server is running on port ${PORT}`);
    } catch (error) {
        console.log(`Failed to connect with database ${error}`)
    }
})