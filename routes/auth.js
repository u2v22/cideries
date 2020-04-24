const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { User } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
require('dotenv').config()

////  POST  /////

router.post('/login', async(req, res) => {

  const { error } = validationCheck(req.body);
  if(error) return res.status(400).send(error.details[0]);

  let user;
  let validPassword;

  try {
    user = await User.findOne({ email: req.body.email});
    if(!user) return res.status(400).send('Invalid email or password');
  }
  catch(err) { return err.msg; }


  try {
    validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password');
  }
  catch(err) { return err.msg; }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_PRIVATE_KEY);
  return res.status(200).send(token);

});


const validationCheck = (args) => {
  const schema = Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).max(255).required()
  });

  return schema.validate(args);
}

module.exports = router;
