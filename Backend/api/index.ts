import express from "express"
import mongoose from "mongoose";
import  Jwt  from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db";
import { JWT_PASSWORD } from "./config";
import { userMiddleware } from "../api/middleware";
import { random } from "./utils";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json()); 
app.use(cors());


app.get("/",(req,res)=>{res.json({"msg":"hello"})})

app.post("/api/v1/signup", async(req,res)=>{
    const username = req.body.username
    const password= req.body.password

    try{
    await UserModel.create({
        username:username,
        password:password
    })
    res.json({
        message:"user Signed Up"
    })
    }catch(e){
        res.status(411).json({
            message:"username already exist"
        })
    }
})

app.post("/api/v1/signin", async(req,res)=>{
    const username = req.body.username
    const password= req.body.password

    const existingUser=await UserModel.findOne({
        username:username,
        password:password
    })
    if(existingUser){
        const token = Jwt.sign({
            id:existingUser._id
        },JWT_PASSWORD)

        res.json({
            token:token
        })
    }else{
        res.status(403).json({
            message:"Incorrect Credentials"
        })
    }
})

app.post("/api/v1/content",userMiddleware, async(req,res)=>{
    const link = req.body.link;
    const title = req.body.title;
    const type = req.body.type;
    await ContentModel.create({
        link,
        title,
        type,   
        //@ts-ignore
        userId:req.userId,
        tags:[]
    })
    res.json({
        message: "content added"
    })
})

app.get("/api/v1/content",userMiddleware, async(req,res)=>{
    //@ts-ignore
    const userId= req.userId;
    const content = await ContentModel.find({
        userId:userId
    }).populate("userId","username");
    res.json({
        content
    })
})

app.delete("/api/v1/content/:contentId", async(req,res)=>{
    const contentId= req.params.contentId;
    //console.log(contentId)
    await ContentModel.deleteOne({
        _id:contentId
    }) 
    res.json({
        message:"Content deleted"
    })
})

app.post("/api/v1/brain/share",userMiddleware, async(req,res)=>{
    const share = req.body.share;
    try{
        if(share){
            const existingLink=await LinkModel.findOne({
                //@ts-ignore
                userId: req.userId
            })
            if(existingLink){
                res.json({
                    hash:existingLink.hash
                })
                return;
            }
            const hash = random(10)
            await LinkModel.create({
                //@ts-ignore
                userId:req.userId,
                hash:hash
            })
            res.json({
                message:hash
            })
        }
        else{
            await LinkModel.deleteOne({
                //@ts-ignore
                userId: req.UserId
            })
            res.json({
                message:"Link Deleted"
            })
        }
    }catch(e){

    }
   
    
   
})

app.get("/api/v1/brain/:shareLink",userMiddleware, async(req,res)=>{
    const hash = req.params.shareLink

    const link = await LinkModel.findOne({
        hash
    })
    if(!link){
        res.status(411).json({
            message:"Sorry incorrect input"
        })
        return;
    }

    const content = await ContentModel.find({
        userId:link.userId
    })
    
    const user = await UserModel.findOne({
        _id:link.userId
    })

    if(!user){
        res.status(411).json({
            message:"user not found"
        })
        return;
    }

    res.json({
        username:user.username,
        content: content
    })
})

// app.listen(3000);
module.exports = app;