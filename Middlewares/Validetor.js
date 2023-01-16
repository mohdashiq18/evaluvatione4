const e = require("express")
const {RegisterModule}=require("../module/UsersModule")

const login=async (req,res,next)=>{
    const {email,password}=req.body
    
        if(req.method=="POST" && req.url=="/login"){
            const data=await RegisterModule.find({email})
            if(data.length>0){
                next()
            }else{
               
                res.send("err")
            }
        }else{
            next()
        }
        

    
}
module.exports={

    login
}