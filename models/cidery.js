const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const ciderySchema = mongoose.Schema({
  name: { type: String, required: true },
  province: String,
  city: String,
  street: String,
  phoneNum: Number,
  email: String,
  website: String,
  tastingRoom: Boolean,
  onlineStore: { type: Boolean, default: false },
  offSales: { type: Boolean, default: false },
  est: Number,
  socialMedia: { type: Boolean, default: false }
});

const Cidery = mongoose.model('Cidery', ciderySchema);

const validationCheck = (args) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(3).required(),
    province: Joi.string().required(),
    phoneNum: Joi.number()
  });

  return schema.validate(args);
}

module.exports.Cidery = Cidery;
module.exports.ciderySchema = ciderySchema;
module.exports.validationCheck = validationCheck;
