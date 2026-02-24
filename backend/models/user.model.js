const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        minlength:[3,"First name must be at least 3 characters long"],
    },
    lastName:{
        type:String,
        minlength:[3,"Last name must be at least 3 characters long"]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,"Email must be at least 5 characters long"],
    },
    password:{
        type:String,
        required:true,
    },
    socketId:{
        type:String,
    }
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        { _id: this._id, email: this.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
    );
    return token;
}

userSchema.methods.comparePassword = async function(Password) {
    return await bcrypt.compare(Password, this.password);
}

userSchema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password,10);
}

const userModel = mongoose.model('User',userSchema);

module.exports = userModel;