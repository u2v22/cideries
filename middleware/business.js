
module.exports = function(req, res, next) {
  if(!req.user.isBusiness) return res.status(403).send('You do not have permissions to access this resource.');
  next();
}
