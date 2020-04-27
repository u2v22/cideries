// 3rd Party APIs
const asyncMiddleware = require('express-async-errors');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
// const winston = require('winston');

// Config
const app = express();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

// Seed
require('./data/seedUsers.js')();
require('./data/seedCiders.js')();
require('./data/seedCideries.js')();
require('./data/seedFlavours.js')();

app.use(helmet());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}....`);
});
