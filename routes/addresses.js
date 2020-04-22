const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Address, validationCheck } = require('../models/address');

////  POST  /////

router.post('/', async(req, res) => {

  const { error } = validationCheck(req.body);
  if(error) return res.status(400).send(error.details[0]);

  let address = new Address({
    name: req.body.name,
    address: req.body.address,
    phoneNum: req.body.phoneNum
  })

  address = await address.save();
  res.send(address);
});

////  PUT  /////

router.put('/:id', async(req, res) => {
  const { error } = validationCheck(req.body);
  if(error) return res.status(400).send(error.details[0]);

  try{
    const address = await Address.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true });
  }
  catch(err) {
    return res.status(404).send(`Address with id ${req.params.id} was not found`);
  }

  res.send(address);
});

////  DELETE  /////

router.delete('/:id', async(req, res) => {
  const address = await Address.findByIdAndRemove(req.params.id)

  if(!address) return res.status(404).send('not found');

  res.send(address);
});


module.exports = router;
