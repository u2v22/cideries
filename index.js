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

const ciderySchema = new mongoose.Schema({
  name: String,
  address: String,
  phoneNum: Number,
  email: String,
  website: String,
  tastingRoom: Boolean,
  onlineStore: { type: Boolean, default: false },
  offSales: { type: Boolean, default: false },
  est: Number,
  socialMedia: { type: Boolean, default: false },
});

const Cidery = mongoose.model('Cidery', ciderySchema);

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


  const result = await cidery.save();
  console.log(result);
}

createCidery();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}....`);
})
