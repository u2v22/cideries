const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Cider, validationCheck } = require('../models/cider');

////  GET  /////

router.get('/', async(req, res) => {
  const cider = await Cider
    .find();

  res.send(cider);
});

////  GET:id  /////

router.get('/:id', async(req, res) => {
  const cider = await Cider.findById(req.params.id)

  if(!cider) return res.status(404).send('not found');

  res.send(cider);
});

////  POST  /////

router.post('/', async(req, res) => {

  const { error } = validationCheck(req.body);
  if(error) return res.status(400).send(error.details[0]);

  const madeBy = await Cidery.findById(req.body.cideryId)
  if (!madeBy) return res.status('400').send('Cidery not found');

  const flavourProfile = await FlavourProfile.findById(req.body.flavourProfileId);
  if (!flavourProfile) return res.status('400').send('Flavour profile not found');

  let cider = new Cider({
    name: req.body.name,
    madeBy: {
      _id: madeBy.id,
      name: madeBy.name
    },
    flavourProfile: {
      _id: flavourProfile.id,
      flavourProfile: flavourProfile.flavourProfile
    }
  });

  cider = await cider.save();
  res.send(cider);
});

////  PUT  /////

router.put('/:id', async(req, res) => {
  const { error } = validationCheck(req.body);
  if(error) return res.status(400).send(error.details[0]);

  try{
    const cider = await Cider.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true });
  }
  catch(err) {
    return res.status(404).send(`Cider with id ${req.params.id} was not found`);
  }

  res.send(cider);
});

////  DELETE  /////

router.delete('/:id', async(req, res) => {
  const cider = await Cider.findByIdAndRemove(req.params.id)

  if(!cider) return res.status(404).send('not found');

  res.send(cider);
});


module.exports = router;
