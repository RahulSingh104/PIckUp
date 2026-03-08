const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

module.exports.registerUser = async(req, res,next)=>{

    console.log("🚀 Register API hit");

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log("❌ Validation errors:", errors.array());
        return res.status(400).json({errors : errors.array()});

    }
   console.log("📦 Request Body:", req.body);

    const {fullname,email,password} = req.body;

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname:fullname.firstName,
        lastname:fullname.lastName,
        email,
        password:hashedPassword
    })

    console.log("✅ User created:", user);

    const token = user.generateAuthToken();

    res.status(201).json({
        token,user
    })




}