const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const ciderSchema = mongoose.Schema({
  name: { type: String, required: true },
  madeBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Cidery' },
  story: String,
  awards: String, // array
  gluten: String,
  sulphites: String,
  ABV: Number,
  apples: String, // array
  yeast: String,
  hops: Boolean, // array,
  drynessStyle: String, // Object
  notes: String,
  flavourProfile: { type: mongoose.Schema.Types.ObjectId, ref: 'FlavourProfile' },
  image: String
});

const Cider = mongoose.model('Cider', ciderSchema);

async function createCider() {
  const cider = new Cider({
    name: 'Ravenous Red',
    madeBy: '5e9f295ba755bd06e50658ad',
    story: 'Bla bla bla',
    awards: 'Gold', // array
    gluten: 'Gluten Free',
    sulphites: 'No added sulphites',
    ABV: 5.5,
    apples: 'Gala', // array
    yeast: 'Champagne',
    hops: false, // array,
    drynessStyle: 'Dry', // Object
    notes: 'Cinnamon and nutmeg',
    image: 'www.image.com',
    flavourProfile: '5ea0abf4c50b4f30dc3c33e4'
  });

  try {
    const result = await cider.save();
    console.log(result);
  }
  catch(err) {
    console.log(err);
  }
}

createCider();

const validationCheck = (args) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(3).required()
  });

  return schema.validate(args);
}

module.exports.Cider = Cider;
module.exports.validationCheck = validationCheck;
