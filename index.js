const express=require("express")
const app=express()
require('dotenv').config()
const {connection} = require("./config/db")
const {usersRoute} =require("./Route/Route")
const {postRoute}=require("./Route/Post.route")
const { authenticate} =require("./Middlewares/authenticate")
app.use(express.json())


app.use("/users",usersRoute)
app.use(authenticate)
app.use('/posts',postRoute)

app.listen(process.env.port,async (req,res)=>{
    try{
       await connection
       console.log("Connected db")
       console.log("server running port at 8080")
    }catch{
        console.log("err")
    }
    
})