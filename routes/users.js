const
  router = require('express').Router(),
  createErrors = require('http-errors'),
  { decentralization } = require('./middlware/authentication'),
  { UsersService } = require('services');

module.exports = () => {
  router.route('/info')
    .get(decentralization(), getUserInfo)
    .patch(decentralization(), patchUserInfo)
  return router;
}

var getUserInfo = (req, res, next) => {
  UsersService.getUserInfo(req.user)
    .then(userInfo => {
      res.status(200).json(userInfo);
    })
    .catch(err => {
      next(err)
    })
}

var patchUserInfo = (req, res, next) => {
  let dataUpdate = req.body;
  UsersService.updateUserInfo(req.user, dataUpdate)
    .then(userInfo => {
      res.status(200).json(userInfo);
    })
    .catch(err => {
      next(err)
    })
}