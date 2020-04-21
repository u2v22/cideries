const express = require('express');
const router = express.Router();

const flavorProfiles = [
  { id: 1, name: 'apple'},
  { id: 2, name: 'rhubarb'},
  { id: 3, name: 'pear'}
];

router.get('/', (req, res) => {
  res.send(flavorProfiles);
});

router.post('/', (req, res) => {

  const { error } = validationCheck(req.body);

  if(error) return res.status(400).send(error.details[0]);

  const flavorProfiles = {
    id: flavorProfiles.length + 1,
    name: req.body.flavorProfile
  }

  flavorProfiles.push(flavorProfile);
  res.send(flavorProfiles);
});



const validationCheck = (args) => {
  const schema = Joi.object().keys({
    flavourProfile: Joi.string().min(3).required()
  });

  return schema.validate(args);
}

module.exports = router;
