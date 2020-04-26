const winston = require('winston');


winston.exceptions.handle(
  new winston.transports.File({
    filename: 'exceptions.log'
  }),
  new winston.transports.Console({
    colorize: true,
    prettyPrint: true
  })
);

process.on('uncaughtException', (ex) => {
  throw ex;
});

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
