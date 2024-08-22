const mongoose = require("mongoose");

const submissionSchema=new mongoose.Schema({
    OrderId: { type: Number,required:true},
    Restraunt:{type:String,required:true},
    BranchName:{type:String,required:true},
    UserEmail:{type:String,required:true},
    Seat:{type:String,required:true},
    id:{type:String,required:true},
    item:{type:String,required:true},
    time:{type:String,required:true},
    date:{type:String,required:true},
    contact:{type:String,required:true},
    bookedOn:{type:Date,default:Date.now}
});

const Submission=mongoose.model('SUBMIT',submissionSchema);

module.exports=Submission;