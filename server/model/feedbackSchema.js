const mongoose = require("mongoose");

//feedback schema
const feedbackSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    msg:{type:String,required:true},
    postedOn:{type:Date,default:Date.now}
});

const Feedback=mongoose.model('FEED',feedbackSchema);

module.exports=Feedback;
