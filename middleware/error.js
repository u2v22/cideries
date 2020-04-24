const winston = require('winston');

process.on('uncaughtException', (ex) => {
  throw ex;
});

winston.handleExceptions(
  new winston.transports.File({ filename: 'exceptions.log'})
);

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'info' }),
  ]
});

module.exports = function(err, req, res, next) {
  logger.log({
    level: 'info',
    message: err.message
  });
  res.status(500).send(err.message);
}
