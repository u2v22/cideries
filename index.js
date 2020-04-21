const Joi = require('@hapi/joi');
const express = require('express');
const app = express();

app.use(express.json());

const cideries = [
  { id: 1, name: 'cider1'},
  { id: 2, name: 'cider2'},
  { id: 3, name: 'cider3'}
];

const flavorProfiles = [
  { id: 1, name: 'apple'},
  { id: 2, name: 'rhubarb'},
  { id: 3, name: 'pear'}
]


app.get('/api/cideries', (req, res) => {
  res.send(cideries);
});

app.get('/api/flavorProfiles', (req, res) => {
  res.send(flavorProfiles);
});

app.get('/api/cideries/:id', (req, res) => {
  const cidery = cideries.find(cidery => cidery.id === parseInt(req.params.id));
  if(!cidery) return res.status(404).send('not found');
  res.send(cidery);
});

app.post('/api/cideries', (req, res) => {

  const { error } = validationCheck(req.body);

  if(error) return res.status(400).send(error.details[0]);

  const cidery = {
    id: cideries.length + 1,
    name: req.body.name
  }

  cideries.push(cidery);
  res.send(cidery);
});

app.put('/api/cideries/:id', (req, res) => {
  const cidery = cideries.find(cidery => cidery.id === parseInt(req.params.id));
  if(!cidery) return res.status(404).send('not found');

  const { error } = validationCheck(req.body);
  if(error) return res.status(400).send(error.details[0]);

  cidery.name = req.body.name;
  res.send(cidery);
});

app.delete('/api/cideries/:id', (req, res) => {
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

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}....`);
})
