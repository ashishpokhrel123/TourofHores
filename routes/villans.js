const express = require('express');
const Villain = require('../models/villains');
const  router = express.Router();


router.route('/')
  .get((req,res,next)=>{
    Villain.find({})
    .then((villains)=>{
        res.json(villains);
  }).catch((err) => next(err));
})
.post((req,res,next)=>{
    Villain.create(req.body)
    .then((villains)=>{
        res.statusCode=201;
        res.json(villains);
    })
    .catch(next);
})
.put((req,res,next)=>{
    res.statusCode=201,
    res.send("Method does not support");
})
.delete((req,res,next)=>{
    Villain.deleteMany({})
    .then((villains)=>{
        res.json(villains);
    })
    .catch(next);
})

router.route('/:id')
.get((req,res,next) => {
    Villain.findById(req.params.id)
    .populate({
        path:'fight',
        select:'name'
    })
    .then((villain) => {
        res.json(villain);
    })
    .catch(next);
})
    .post((req,res,next)=>{
        res.statusCode=201;
        res.json("Method does not support");
    })
    .put((req,res,next)=>{
        Villain.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        .then((reply)=>{
            res.json(reply);
        })
        .catch(next);

    })
.delete((req,res,next)=>{
    Villain.findByIdAndDelete(req.params.id)
   
    .then((reply)=>{
        res.json(reply);

    })
    .catch(next);
})

module.exports= router;

