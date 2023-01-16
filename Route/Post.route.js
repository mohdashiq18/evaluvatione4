const express=require("express")
const {PostModel}=require("../module/Post.module")
const postRoute=express.Router()


postRoute.get("/",async (req,res)=>{
    const device=req.query.device
    const dev1=req.query.device1
    const dev2=req.query.device2
    const dev3=req.query.device3
    console.log(device,dev1,dev2,dev3)
    
    try{
        if(device){
            
            const data=await PostModel.find({$or:[{device:device},{device:dev1},{device:dev2},{device:dev3}]})
        res.send(data)
        }else{
            const data=await PostModel.find()
        res.send(data)
        }
    }catch{
        res.send("err")
    }
})
postRoute.post("/create",async (req,res)=>{
    const payload=req.body
    console.log(payload)
    try{
        const post=new PostModel(payload)
        await post.save()
        res.send("create note")
    }
    catch(err){
        res.send("err")
    }
})

postRoute.patch("/update/:id",async (req,res)=>{
    const payload=req.body
    const id=req.params.id
    const post=await PostModel.findOne({"_id":id})
    const userID_in=post.userID
    console.log(post)
    const userID_req=req.body.userID 
    console.log(userID_req,userID_in)
    try{
        if(userID_req!==userID_in){
            res.send("You are not authorized")
        }else{
            await PostModel.findByIdAndUpdate({"_id":id},payload)
            res.send("updeted")
        }
    }
    catch(err){
      res.send("err")
    }
})


postRoute.delete("/delete/:id",async (req,res)=>{
    
    const id=req.params.id
    const post=await PostModel.findOne({"_id":id})
    const userID_in=post.userID
    const userID_req=req.body.userID 
    try{
        if(userID_req!==userID_in){
            res.send("You are not authorized")
        }else{
            await PostModel.findByIdAndDelete({"_id":id})
            res.send("delete")
        }
    }
    catch(err){
      res.send(err)
    }
})
module.exports={
    postRoute
}