const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { FlavourProfiles, validationCheck } = require('../models/flavourProfiles');

////  GET  /////
router.get('/', async(req, res) => {
  const fps = await FlavourProfiles.find();
  res.send(fps);
});


////  POST  /////
router.post('/', async(req, res) => {
  const { error } = validationCheck(req.body);
  if(error) return res.status(400).send(error.details[0]);

  let fp = new flavourProfile({
    flavourProfile: req.body.flavourProfile,
  });

  fp = await fp.save();
  res.send(fp);
});


module.exports = router;
