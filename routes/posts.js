const
  PostSevice = require('services/PostService'),
  { decentralization } = require('./middlware/authentication'),
  router = require('express').Router()

module.exports = () => {
  router.route('/status')
    .post(decentralization(), postUserStatus)
    .get(decentralization(), getUserStatus)
  return router;
}

var postUserStatus = (req, res, next) => {
  PostSevice.postUser(req.body)
  .then(post => {
    res.json(post)
  })
  .then(err => {
    res(err)
    next();
  })
};

var getUserStatus = (req, res, next) => {
  PostSevice.getUserpost()
    .then(userPost => {
      res.status(200).json(userPost);
    })
    .catch(err => {
      next(err)
    })
}