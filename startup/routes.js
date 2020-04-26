// External Imports
const express = require('express');

// Internal Imports
const cideries = require('../routes/cideries');
const flavourProfiles = require('../routes/flavourProfiles');
const ciders = require('../routes/ciders');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/cideries', cideries);
  app.use('/api/flavourProfiles', flavourProfiles);
  app.use('/api/ciders', ciders);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use(error);
}
