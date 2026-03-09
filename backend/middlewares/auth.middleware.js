const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.authUser = async(req,res,next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    try{
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         const user = await userModel.findById(decoded.id);
         if(!user){
             return res.status(401).json({message:"Unauthorized"});
         }
         req.user = user;
         next();
    }
    catch(error){
        return res.status(401).json({message:"Unauthorized"});
    }
} 