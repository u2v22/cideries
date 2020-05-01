// 3rd Party APIs
const mongoose = require('mongoose');
const winston = require('winston');


module.exports = function(){
  mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => winston.info('connected to mongoDB'));
};
