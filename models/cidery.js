const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const ciderySchema = mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  phoneNum: Number,
  email: String,
  website: String,
  tastingRoom: Boolean,
  onlineStore: { type: Boolean, default: false },
  offSales: { type: Boolean, default: false },
  est: Number,
  socialMedia: { type: Boolean, default: false },
  flavourProfile: { type: mongoose.Schema.Types.ObjectId, ref: 'FlavourProfile' }
});

const Cidery = mongoose.model('Cidery', ciderySchema);

async function createCidery() {
  const cidery = new Cidery({
    name: 'Vees Cidery',
    address: '456 Easy Street',
    phoneNum: 4035555555,
    email: 'info@v.com',
    website: 'www.v.com',
    tastingRoom: true,
    onlineStore: true,
    offSales: true,
    est: 1987,
    socialMedia: true,
    flavourProfile: '5ea0abf4c50b4f30dc3c33e4'
  });

  try {
    const result = await cidery.save();
    console.log(result);
  }
  catch(err) {
    console.log(err);
  }
}

// createCidery();

const validationCheck = (args) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(3).required(),
    address: Joi.string(),
    phoneNum: Joi.number()
  });

  return schema.validate(args);
}

module.exports.Cidery = Cidery;
module.exports.validationCheck = validationCheck;
