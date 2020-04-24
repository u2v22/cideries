const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { User, validationCheck } = require('../models/user');

////  GET  /////

router.get('/all', async(req, res) => {
  const user = await User.find();

  res.send(user);
});

////  GET:id  /////

router.get('/:id', async(req, res) => {
  const user = await User.findById(req.params.id)

  if(!user) return res.status(404).send('not found');

  res.send(user);
});

////  POST  /////

router.post('/register', async(req, res) => {

  const { error } = validationCheck(req.body);
  if(error) return res.status(400).send(error.details[0]);

  let user = await User.findOne({ email: req.body.email});

  try {
    if(user) return res.status(400).send('User already exists');
  }

  catch {
    return res.status(404).send('User not found');
  }

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  user = await user.save();
  res.send(user);
});

////  PUT  /////

router.put('/:id', async(req, res) => {
  const { error } = validationCheck(req.body);
  if(error) return res.status(400).send(error.details[0]);

  try{
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true });
  }
  catch(err) {
    return res.status(404).send(`user with id ${req.params.id} was not found`);
  }

  res.send(user);
});

////  DELETE  /////

router.delete('/:id', async(req, res) => {
  const user = await User.findByIdAndRemove(req.params.id)

  if(!user) return res.status(404).send('not found');

  res.send(user);
});


module.exports = router;
