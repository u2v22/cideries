const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const ciderySchema = mongoose.Schema({
  name: { type: String, required: true },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address'
  },
  phoneNum: Number,
  email: String,
  website: String,
  tastingRoom: Boolean,
  onlineStore: { type: Boolean, default: false },
  offSales: { type: Boolean, default: false },
  est: Number,
  socialMedia: {
    type: Boolean,
    default: false
  },
  flavourProfile: { type: mongoose.Schema.Types.ObjectId, ref: 'FlavourProfile' }
});

const Cidery = mongoose.model('Cidery', ciderySchema);

async function createCidery() {
  const cidery = new Cidery({
    name: 'Rafals Cidery',
    address: '5ea0b573b16c8b33a703bfed',
    phoneNum: 4035566555,
    email: 'info@r.com',
    website: 'www.r.com',
    tastingRoom: true,
    onlineStore: true,
    offSales: true,
    est: 1982,
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
