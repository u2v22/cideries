const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');


const flavoursSchema = mongoose.Schema({
  flavourProfile: { type: String, required: true }
});

const FlavourProfiles = mongoose.model('FlavourProfile', flavoursSchema);

router.get('/', async(req, res) => {
  const fps = await FlavourProfiles.find();
  res.send(fps);
});


router.post('/', async(req, res) => {
  const { error } = validationCheck(req.body);
  if(error) return res.status(400).send(error.details[0]);

  let fp = new flavourProfile({
    flavourProfile: req.body.flavourProfile,
  });

  fp = await fp.save();
  res.send(fp);
});


const validationCheck = (args) => {
  const schema = Joi.object().keys({
    flavourProfile: Joi.string().min(3).required()
  });

  return schema.validate(args);
}

module.exports = router;
