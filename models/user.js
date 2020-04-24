const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
// const { userSchema } = require('./users');

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
    maxlength: 16,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

const validationCheck = (args) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(3).required(),
    email: Joi.string().required(),
    password: Joi.string().required()
  });

  return schema.validate(args);
}

module.exports.User = User;
module.exports.validationCheck = validationCheck;
