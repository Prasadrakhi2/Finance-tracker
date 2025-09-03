const mongoose = require("mongoose");

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_URL,{});
        console.log("mongodb connected");
    }catch(err){
        console.error("error connect to mongodb",err);
        process.exit(1);
    }
}

module.exports = connectDB