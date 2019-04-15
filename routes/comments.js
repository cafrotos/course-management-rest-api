const
  PostSevice = require('services/CommentService'),
  { decentralization } = require('./middlware/authentication'),
  router = require('express').Router()

module.exports = () => {
  router.route('/status')
    .post(decentralization(), postUserStatus)
    .get(decentralization(), getUserStatus)
  return router;
}

