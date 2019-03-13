const
  jwt = require('jsonwebtoken'),
  SECRET_KEY_JWT = process.env.SECRET_KEY_JWT,
  createErrors = require('http-errors'),
  { SECTION } = require('../../constants');

function requireLogin(req, res, next) {
  const token = req.header('Authorization') || (req.query.token ? `Bearer ${req.query.token}` : null);
  if (token.split(' ')[0] === 'Bearer') {
    jwt.verify(token.split(' ')[1], SECRET_KEY_JWT, function (err, decode) {
      if (err) next(createErrors(401, "Forbidden"));
      else {
        req.user = decode;
        next();
      }
    });
  }
  else next(createErrors(401, "Forbidden"))
}

function decentralization(restriction_level) {
  if (!restriction_level) restriction_level = "*";
  return decentralization[restriction_level] || (decentralization[restriction_level] = (req, res, next) => {
    if (req.user) {
      if (restriction_level === "*" || SECTION[req.user.section] >= SECTION[restriction_level])
        next();
      else next(createErrors(401, "Permisson Denied"));
    }
    else next(createErrors(401, "Permisson Denied"));
  })
}

module.exports = {
  requireLogin,
  decentralization
};