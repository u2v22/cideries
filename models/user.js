const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
// const { userSchema } = require('./users');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 1024,
    required: true
  }
});

userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY);
  return token;
}

const User = mongoose.model('User', userSchema);

const validationCheck = (args) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(3).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).max(255).required()
  });

  return schema.validate(args);
}

module.exports.User = User;
module.exports.validationCheck = validationCheck;
