const auth = require('../middleware/auth');
const business = require('../middleware/business');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Cidery, validationCheck } = require('../models/cidery');

////  GET  /////

router.get('/', async(req, res) => {
  const cideries = await Cidery
    .find()
    .sort('name')
    .populate('flavourProfile');
  res.send(cideries);
});

////  GET:id  /////

router.get('/:id', async(req, res) => {
  const cidery = await Cidery.findById(req.params.id)

  if(!cidery) return res.status(404).send('not found');

  res.send(cidery);
});

////  POST  /////

router.post('/', [auth, business], async(req, res) => {

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

////  PUT  /////

router.put('/:id', auth, async(req, res) => {
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

////  DELETE  /////

router.delete('/:id', auth, async(req, res) => {
  const cidery = await Cidery.findByIdAndRemove(req.params.id)

  if(!cidery) return res.status(404).send('not found');

  res.send(cidery);
});


module.exports = router;
