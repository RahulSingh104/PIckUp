const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        minlength:[3,"First name must be at least 3 characters long"]
    }
})