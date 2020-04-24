// 3rd Party APIs
const asyncMiddleware = require('express-async-errors');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv').config();
const winston = require('winston');

// Internal Imports
const cideries = require('./routes/cideries');
const flavourProfiles = require('./routes/flavourProfiles');
const ciders = require('./routes/ciders');
const users = require('./routes/users');
const auth = require('./routes/auth');
const error = require('./middleware/error');

// Config
const app = express();

if (dotenv.error) {
  throw dotenv.error;
};

// if(app.get('env') === development {
//   app.use(morgan('tiny'));
//   console.log('Morgan enabled...')
// })

mongoose.connect('mongodb://localhost/ciders', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connected to mongoDB'))
  .catch(error => console.log('could not connect to mongoDB'))

app.use(express.json());
app.use(helmet());
app.use('/api/cideries', cideries);
app.use('/api/flavourProfiles', flavourProfiles);
app.use('/api/ciders', ciders);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}....`);
})
