const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const flavoursSchema = mongoose.Schema({
  flavourProfile: { type: String, required: true }
});

const FlavourProfiles = mongoose.model('FlavourProfile', flavoursSchema);

async function createFP() {
  const FP = new FlavourProfiles({
    flavourProfile: 'Apple and Grapefruit',
  });
  try {
    const result = await FP.save();
    console.log(result);
  }
  catch(err) {
    console.log(err);
  }
}

// createFP();

const validationCheck = (args) => {
  const schema = Joi.object().keys({
    flavourProfile: Joi.string().min(3).required()
  });

  return schema.validate(args);
}

module.exports.FlavourProfiles = FlavourProfiles;
module.exports.validationCheck = validationCheck;
