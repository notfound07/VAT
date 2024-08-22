const jwt=require('jsonwebtoken');
const User = require("../model/userSchema");

const authenticate=async(req,res,next)=>
{
    try {
        const token=req.cookies.jwtoken;
        const verifyToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        const rootUser=await User.findOne({_id:verifyToken._id,"tokens.token":token});
        if(!rootUser){
            throw new Error("User not Found");
        }
        req.token=token;
        req.rootUser=rootUser;
        res.userID=rootUser._id;
        next();
    } catch (error) {
        res.status(401).send('Unauthorized');
        console.log(error);
    }

}

module.exports=authenticate;