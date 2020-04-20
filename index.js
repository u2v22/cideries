const express = require('express');
const app = express();

const cideries = [
  { id: 1, name: 'cider1'},
  { id: 2, name: 'cider2'},
  { id: 3, name: 'cider3'}
]

app.get('/api/cideries', (req, res) => {
  res.send(cideries);
});

app.get('/api/cideries/:id', (req, res) => {
  const cidery = cideries.find(cidery => cidery.id === parseInt(req.params.id));
  if(!cidery) return res.status(404).send('not found');
  res.send(cidery);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}....`);
})
