const express = require('express');
const app = express();

app.get('/api/cideries', (req, res) => {
  res.send('Hello World');
});

app.get('/api/cideries/:id', (req, res) => {
  req.params.id;
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}....`);
})
