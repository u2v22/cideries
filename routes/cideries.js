const express = require('express');
const router = express.Router();


const cideries = [
  { id: 1, name: 'cider1'},
  { id: 2, name: 'cider2'},
  { id: 3, name: 'cider3'}
];

router.get('/', (req, res) => {
  res.send(cideries);
});

router.get('/:id', (req, res) => {
  const cidery = cideries.find(cidery => cidery.id === parseInt(req.params.id));
  if(!cidery) return res.status(404).send('not found');
  res.send(cidery);
});

router.post('/', (req, res) => {

  const { error } = validationCheck(req.body);

  if(error) return res.status(400).send(error.details[0]);

  const cidery = {
    id: cideries.length + 1,
    name: req.body.name
  }

  cideries.push(cidery);
  res.send(cidery);
});

router.put('/:id', (req, res) => {
  const cidery = cideries.find(cidery => cidery.id === parseInt(req.params.id));
  if(!cidery) return res.status(404).send('not found');

  const { error } = validationCheck(req.body);
  if(error) return res.status(400).send(error.details[0]);

  cidery.name = req.body.name;
  res.send(cidery);
});

router.delete('/:id', (req, res) => {
  const cidery = cideries.find(cidery => cidery.id === parseInt(req.params.id));
  if(!cidery) return res.status(404).send('not found');

  const index = cideries.indexOf(cidery);
  cideries.splice(index, 1);

  res.send(cidery);
});

const validationCheck = (args) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(3).required()
  });

  return schema.validate(args);
}

module.exports = router;

