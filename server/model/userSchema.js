const mongoose = require("mongoose");
const jwt =require("jsonwebtoken");
//user schema
const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique: true, lowercase: true},
    username:{type:String,required:true},
    password:{type:String,required:true},
    confirmpassword:{type:String,required:true},
    tokens:[{
        token:{type:String,required:true}
    }]
});
//generating token
userSchema.methods.generateAuthToken=async function(){
try {
    let token=jwt.sign({_id:this._id},process.env.ACCESS_TOKEN_SECRET);
    this.tokens=this.tokens.concat({token:token});
    await this.save();
    return token;
} catch (error) {
    console.log(error);
}
}
const User=mongoose.model('USER',userSchema);

module.exports=User;
