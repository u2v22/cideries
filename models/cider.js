const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { flavoursSchema } = require('./flavourProfiles');
const { ciderySchema } = require('./cidery');

const ciderSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cidery: String,
  // cidery: {
  //   type: ciderySchema,
  //   required: true
  // },
  story: String,
  awards: String, // array
  gluten: String,
  sulphites: String,
  ABV: Number,
  apples: String, // array
  yeast: String,
  hops: String, // array,
  drynessStyle: String, // Object
  notes: String,
  flavourProfile: String,
  // flavourProfile: {
  //   type: flavoursSchema,
  //   required: true
  // },
  image: String
});

const Cider = mongoose.model('Cider', ciderSchema);

const validationCheck = (args) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(3).required(),
    cideryId: Joi.string().required(),
    flavourProfileId: Joi.string().required()
  });

  return schema.validate(args);
}

module.exports.Cider = Cider;
module.exports.validationCheck = validationCheck;
