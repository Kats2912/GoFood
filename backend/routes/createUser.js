const express = require('express');
const router = express.Router();
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const jwtSecret = "jaijfigwigghegjlwnssgn";

router.post("/createuser",
body('email').isEmail(),
  body('password').isLength({ min: 5 }),
async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt =await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt);
    try{
        await User.create({
            name:req.body.name,
            email:req.body.email,
            password:secPassword,
            location:req.body.location
        })
        res.json({
            success:true,
        })
    }
    catch(err){
        console.log(err);
        res.json({
            success:false,
        })
    }
});

router.post("/loginuser",async(req,res)=>{
    let email = req.body.email;
    try{
       const user =  await User.findOne({email});
       if(user==false){
        return res.status(400).json({ errors: "User not found" }); 
       }
       const pwdCompare = await bcrypt.compare(req.body.password,user.password);
       if(!pwdCompare)
       return res.status(400).json({ errors: "Invalid password"});
       const data = {
        usher:{
            id:user.id
        }
       }
       const authToken = await jwt.sign(data,jwtSecret)
       return res.json({ success:true, authToken:authToken});
    }
    catch(err){
        console.log(err);
        res.json({
            success:false,
        })
    }
});

module.exports= router;