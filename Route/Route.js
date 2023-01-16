const express=require("express")
const jwt=require("jsonwebtoken")
const usersRoute=express.Router()
const {RegisterModule}=require("../module/UsersModule")
const {authenticate}=require("../Middlewares/authenticate")
const {login}=require("../Middlewares/Validetor")
const { application } = require("express")
const bcrypt = require('bcrypt');
usersRoute.use(login)

usersRoute.post("/register",async (req,res)=>{
  const {name,email,password,gender}=req.body
  try{
  bcrypt.hash(password, 8, async (err, hash)=>{
  const user=new RegisterModule({name,email,password:hash,gender})
  await user.save()
  res.send("Registered")
  });
  }catch(err){
  res.send("Error in registering the user")
  console.log(err)
  }
  })

  usersRoute.post("/login",async (req,res)=>{
    const {email,password}=req.body
    try{
    const user=await RegisterModule.find({email})
    if(user.length>0){
    bcrypt.compare(password, user[0].password, function(err, result) {
    if(result){
    const token = jwt.sign({ userID:user[0]._id }, 'masai');
    res.send({"msg":"Login Successfull","token":token})
    } else {res.send("Wrong Credntials")}
    });
    } else {
    res.send("Wrong Credntials")
    }
    } catch(err){
    res.send("Something went wrong")
    console.log(err)
    }
    })

module.exports={
    usersRoute
}
