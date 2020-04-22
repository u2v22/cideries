const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const addressSchema = mongoose.Schema({
  province: String,
  city: String,
  street: String
});

const Address = mongoose.model('Address', addressSchema);

async function createAddress() {
  const address = new Address({
    province: 'Alberta',
    city: 'Calgary',
    street: '123 ST SW'
  });

  try {
    const result = await address.save();
    console.log(result);
  }
  catch(err) {
    console.log(err);
  }
}

// createAddress();

const validationCheck = (args) => {
  const schema = Joi.object().keys({
    province: Joi.string().min(2).required(),
    city: Joi.string(),
    street: Joi.string()
  });

  return schema.validate(args);
}

module.exports.Address = Address;
module.exports.validationCheck = validationCheck;
