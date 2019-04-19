const
  router = require('express').Router(),
  createErrors = require('http-errors'),
  { decentralization } = require('./middlware/authentication'),
  UserService = require('services/UserService');

module.exports = () => {
  router.route('/info')
    .get(decentralization(), getUserInfo)
    .patch(decentralization(), patchUserInfo)
  return router;
}

var getUserInfo = (req, res, next) => {
  UserService.getUserInfo(req.user)
    .then(userInfo => {
      res.status(200).json(userInfo);
    })
    .catch(err => {
      next(err)
    })
}

var patchUserInfo = (req, res, next) => {
  let dataUpdate = req.body;
  UserService.updateUserInfo(req.user, dataUpdate)
    .then(userInfo => {
      res.status(200).json(userInfo);
    })
    .catch(err => {
      next(err)
    })
}