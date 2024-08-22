const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true,lowercase:true},
    password:{type:String,required:true},
    confirmpassword:{type:String,required:true},
});

User = mongoose.model("user",userSchema)

module.exports = User