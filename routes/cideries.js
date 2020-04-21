const express = require('express');
const router = express.Router();
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
});

const Cidery = mongoose.model('Cidery', ciderySchema);

router.get('/', async(req, res) => {
  const cideries = await Cidery.find().sort('name');
  res.send(cideries);
});

router.get('/:id', async(req, res) => {
  const cidery = await Cidery.findById(req.params.id)

  if(!cidery) return res.status(404).send('not found');

  res.send(cidery);
});

router.post('/', async(req, res) => {

  const { error } = validationCheck(req.body);
  if(error) return res.status(400).send(error.details[0]);

  let cidery = new Cidery({
    name: req.body.name,
    address: req.body.address,
    phoneNum: req.body.phoneNum
  })

  cidery = await cidery.save();
  res.send(cidery);
});

router.put('/:id', async(req, res) => {
  const { error } = validationCheck(req.body);
  if(error) return res.status(400).send(error.details[0]);

  try{
    const cidery = await Cidery.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true });
  }
  catch(err) {
    return res.status(404).send(`Cidery with id ${req.params.id} was not found`);
  }

  res.send(cidery);
});

router.delete('/:id', async(req, res) => {
  const cidery = await Cidery.findByIdAndRemove(req.params.id)

  if(!cidery) return res.status(404).send('not found');

  res.send(cidery);
});

const validationCheck = (args) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(3).required(),
    address: Joi.string(),
    phoneNum: Joi.number()
  });

  return schema.validate(args);
}

module.exports = router;

