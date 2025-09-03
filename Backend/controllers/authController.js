const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendMail } = require('../helper/sendMail');
const { mailTemplet } = require('../helper/mailTemplet');


const genrateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn : "10h"});
}

// Register user
exports.registerUser = async (req, res) =>{
    const {fullName, email, password, profileImageUrl} = req.body;

    //validation : check for missing field
    if(!fullName || !email || !password){
        return res.status(400).json({message : "All fields are required"});
    }

    try{
        //check if email already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"Email already in use"});
        }

        //if not exist Create new User
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        })
        sendMail(email,"wealthWise women","",mailTemplet({fullName}))
        res.status(201).json({
            id:user._id,
            user,
            token: genrateToken(user._id),
        });
    }
    catch(err){
        res.status(500).json({message: "Error fetching user information", error:err.message})
    }
};

// Login user
exports.loginUser = async (req, res) =>{
    const {email, password} = req.body;

    //check validity
    if(!email || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    try{
        const user = await User.findOne({email});
        if(!user || !(await user.comparePassword(password))){
            return res.status(400).json({message:"Invalid credentials"})
        }

        res.status(200).json({
            id: user._id,
            user,
            token : genrateToken(user._id),
        });
    }catch(err){
        res.status(500).json({message: "Error registering user", error:err.message})
    
    }
}

// get user information
exports.getUserInfo = async (req, res) =>{
    try{
        const user = await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(404).json({message:"user not found"});
        }

        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json({message: "Error registering user", error:err.message});
    
    }
}