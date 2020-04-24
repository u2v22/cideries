const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { User, validationCheck } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');


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

  user = new User( _.pick(req.body, 'name', 'email', 'password'));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  res.send(_.pick(user, ['_id', 'name', 'email']));
});

////  PUT  /////

router.put('/:id', async(req, res) => {
  const { error } = validationCheck(req.body);
  if(error) return res.status(400).send(error.details[0]);

  let user = await User.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, email: req.body.email, password: req.body.password },
    { new: true });
  try {
    res.send(_.pick(user, ['_id', 'name', 'email']));
  }
  catch(err) {
    return res.status(404).send(`user with id ${req.params.id} was not found`);
  }
});

////  DELETE  /////

router.delete('/:id', async(req, res) => {
  const user = await User.findByIdAndRemove(req.params.id)

  if(!user) return res.status(404).send('not found');

  res.send(user);
});


module.exports = router;