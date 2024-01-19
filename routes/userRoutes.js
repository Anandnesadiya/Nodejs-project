const express = require("express");
const userRouter = express.Router();

userRouter.post("/signup",(req,res)=>{
    res.send("signup");
})

userRouter.post("/signin",(req,res)=>{
    res.send("signin");
})

userRouter.get("/get/:userId",(req,res)=>{
    let id = req.params.userId
    res.send({userId : id});
})

module.exports = userRouter;