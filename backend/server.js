const helmet = require("helmet")
const cors= require( 'cors')

const cookieParser = require("cookie-parser")
const express= require( 'express')
const dotenv= require('dotenv')
const path = require("path")
const mongoose= require('mongoose')
const router = require('./router/api')
const connectDB= require('./db')
dotenv.config()
connectDB()

const app=express()

app.use(helmet({
    crossOriginResourcePolicy :{
        policy: "cross-origin"
    }
}))
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
    
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use("/api",router)
app.use("/uploads",express.static(path.join(__dirname,"uploads")))

app.listen(3000, ()=>{

})
