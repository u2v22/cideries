// 3rd Party APIs
const Joi = require('@hapi/joi');
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

async function createCidery() {
  const cidery = new Cidery({
    name: 'Vees Cidery',
    address: '456 Easy Street',
    phoneNum: 4035555555,
    email: 'info@v.com',
    website: 'www.v.com',
    tastingRoom: true,
    onlineStore: true,
    offSales: true,
    est: 1987,
    socialMedia: true,
  });

  try {
    const result = await cidery.save();
    console.log(result);
  }
  catch(err) {
    console.log(err);
  }
}

async function findCideries(){
  const cideries = await Cidery
  .find()
  .sort({ name: 1 })
  console.log(cideries);
}

findCideries();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}....`);
})
