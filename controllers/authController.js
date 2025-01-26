const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req,res)=>{
    try{
        const {name,email,password,role} = req.body;
        const user = await User.create({name, email,password,role});
        res.status(201).json({
            message:'User registered',user
        });
    }catch(err){
        res.status(500).json({
            message:'Registered failed', 
            error:err.message    
        });
    }
};

exports.login = async (req,res) =>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({
            message:'User Not Found'
        });

        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(404).json({
            message:'Invalid Credentials'
        });

        const token = jwt.sign({
            id:user._id,
            role:user.role
        }, process.env.JWT_SECRET,{expireIN:'1h'});
        res.status(200).json({
            message:'Login Successful',token
        });
    } catch(err){
        res.status(500).json({
            message:'Login failed',
            error:err.message
        });
    }
};