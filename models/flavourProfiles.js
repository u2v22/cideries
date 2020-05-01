const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const flavoursSchema = mongoose.Schema({
  flavourProfile: { type: String, required: true }
});

const FlavourProfiles = mongoose.model('FlavourProfile', flavoursSchema);

const validationCheck = (args) => {
  const schema = Joi.object().keys({
    flavourProfile: Joi.string().min(3).required()
  });

  return schema.validate(args);
}

module.exports.flavoursSchema = flavoursSchema;
module.exports.FlavourProfiles = FlavourProfiles;
module.exports.validationCheck = validationCheck;
