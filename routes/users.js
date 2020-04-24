const auth = require('../middleware/auth');
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

router.get('/me', auth, async(req, res) => {
  const user = await User.findById(req.user._id).select('-password');

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

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

////  PUT  /////

router.put('/me', auth, async(req, res) => {

  try {
    const { error } = validationCheck(req.body);
    if(error) return res.status(400).send(error.details[0]);

    const salt = await bcrypt.genSalt(10);
    const updatedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(req.body.password);
    console.log(updatedPassword);

    // const user = await User.findById(req.user._id).select('-password');

    const user = await User.findByIdAndUpdate(
      req.user._id, {
        name: req.body.name,
        password: updatedPassword,
        email: req.body.password
      },
      { new: true });

      res.send(_.pick(user, ['_id', 'name', 'email']));
  }
  catch(err) {
    return res.send(`Failed to update user: ${err.message}`);
  }

});

////  DELETE  /////

router.delete('/:id', async(req, res) => {
  const user = await User.findByIdAndRemove(req.params.id)

  if(!user) return res.status(404).send('not found');

  res.send(user);
});


module.exports = router;
