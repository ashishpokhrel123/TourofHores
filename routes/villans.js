const express  = require('express');
const Villans = require('../models/villains');
const router = express.Router();


router.route('/')
  .get((req,res,next)=>{
      Villans.find({})
      .then((villains)=>{
          res.json(villains);
      })
      .catch(next);

  })
  .post((req,res,next)=>{
      Villains.create(req.body)
      .then((villains)=>{
          res.statuscode=201;
          res.json(villains);

      })
      .catch(next);
  })
  .put((req,res,next)=>{
     res.statusCode = 405;
       res.json({message:"Method not allowed"});
  })
  .delete((req,res,next)=>{
      Villans.deleteMany({})
      .then((villains)=>{
          res.json(villains);

      })
      .catch(next);
  });

  router.route('/:id')
    .get((req,res,next)=>{
        Villans.findById(req.params.id)
        .populate({
            path: 'hero',
            
        })
        .then((villains)=>{
            res.json(villains)
        })
        .catch(next);
    })


  module.exports= router;