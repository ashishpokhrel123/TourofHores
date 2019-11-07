const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/tohdb';
const port = 3000;
const app = express();



mongoose.connect(url, {useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
.then(()=>{
    console.log("Succesfully connected to the mongodb server");
},(err)=>console.log(err));

const heroesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    }
},{timestamps:true})

const Heroes = mongoose.model('Heroes',heroesSchema);
app.use (express.json());

app.get('/heroes',(req,res)=>{
   // res.send("return all values");
   Heroes.find({})
   .then((heroes)=>{
    res.json(heroes);
   })
   
})
app.post('/heroes',(req,res)=>{
    //res.send(`Adds a new heroes with name ${req.body.name}
         //and desc ${req.body.desc}`);
         Heroes.create(req.body)
         .then((heroes)=> { 
             res.statusCode =201;
             res.json(heroes);
         })
         
})
app.put('/heroes',(req,res)=>{
    //res.send("Method not support");
    res.statusCode = 405;
    res.send("Method not supported");
})
app.delete('/heroes',(req,res)=>{
    //res.send("Delete heroes");
    Heroes.deleteMany({})
    .then((heroes)=>{
        res.json(heroes);
    })
})
app.get('/heroes/:id',(req,res)=>
{
        //res.send(`Return a task with id ${req.params.id}`);
        Heroes.findById(req.params.id)
        .then((heroes)=>{
            res.json(heroes);
        })
})
app.post('/heroes/:id',(req,res)=>{
    //res.send("Method not supported");
    res.statusCode = 405;
    res.send("Method not support");
    
})
app.put('/heroes/:id',(req,res)=>{
    //res.send(`updated with id : ${req.params.id}`);
    Heroes.findByIdAndUpdate(req.params.id,{$set:  req.body},{new: true})
   .then((reply)=> {
       res.json(reply);
   })
})
app.delete('/heroes/:id',(req,res)=>{
    //res.send(`delete with id: ${req.params.id}`);
    Heroes.findByIdAndDelete(req.params.id)
   .then((reply)=>{
       res.json(reply);
   })
})

app.listen(3000, () => {
    console.log(" Example express app listening on port 3000");
   });