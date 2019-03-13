const
  JwtHelper = require('libs/JwtHelper'),
  createErrors = require('http-errors'),
  { SECTION } = require('../../constants');

function requireLogin(req, res, next) {
  const token = req.header('Authorization') || (req.query.token ? `Bearer ${req.query.token}` : null);
  if (token.split(' ')[0] === 'Bearer') {
    JwtHelper.verifyAccessToken(token.split(' ')[1])
      .then(decode => {
        req.user = decode;
        next();
      })
      .catch(err => {
        next(createErrors(401, "Forbidden"))
      })
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