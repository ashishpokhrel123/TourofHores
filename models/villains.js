var mongoose = require('mongoose');
var villainsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    fight:[{
        type:mongoose.Schema.ObjectId,
        ref:'heroes'
        }]

},{timestamps:true});

module.exports=mongoose.model('villains',villainsSchema);
