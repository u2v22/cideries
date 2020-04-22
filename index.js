// 3rd Party APIs
const express = require('express');
const mongoose = require('mongoose');

// Internal Imports
const cideries = require('./routes/cideries');
const flavourProfiles = require('./routes/flavourProfiles');

// Config
const app = express();
mongoose.connect('mongodb://localhost/ciders', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connected to mongoDB'))
  .catch(error => console.log('could not connect to mongoDB'))

app.use(express.json());
app.use('/api/cideries', cideries);
app.use('/api/flavourProfiles', flavourProfiles);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}....`);
})
