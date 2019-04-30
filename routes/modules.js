const
  router = require('express').Router(),
  createErrors = require('http-errors'),
  { modules } = require('models'),
  { decentralization } = require('./middlware/authentication');

module.exports = () => {
  router.route('/')
    .get(decentralization(), getModules)
  return router;
}

var getModules = (req, res, next) => {
  modules.findAll()
    .then(modules => {
      res.status(200).json(modules);
    })
    .catch(err => {
      next(err)
    })
} 