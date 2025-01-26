const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:Sting,
        required:true,
    },
    role:{
        type:String,
        enum:['Student','Admin'],
        required:true,
    },
    course:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }],
});

module.exports = mongoose.model('User',UserSchema);