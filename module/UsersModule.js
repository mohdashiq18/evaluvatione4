const mongoose=require("mongoose")
const registerSchema=mongoose.Schema({
    "name": String,
    "email"  :String,
    "gender":String,
    "password" : String 
})

const RegisterModule=mongoose.model("users",registerSchema)
module.exports={
    RegisterModule
}

