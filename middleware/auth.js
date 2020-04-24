const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {

  const token = req.header('x-auth-token');

  if(!token) return res.status(401).send('No valid authentication token.');

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY );
    req.user = decoded;
    next();
  }
  catch(err) {
    res.status(400).send(`Invalid token.`);
  }
};
