const
  { AttachmentsService, PostsService } = require('services'),
  { decentralization, classPermistion } = require('./middlware/authentication'),
  router = require('express').Router()

module.exports = () => {
  router.route('/courses/:classId')
    .post(decentralization(), classPermistion, AttachmentsService.upload.array('files', 4), createNewPost)
    .get(decentralization(), classPermistion, getClassPosts)
  return router;
}

var createNewPost = (req, res, next) => {
  let data = {
    postInfo: req.body,
    files: req.files
  }
  PostsService.createNewPost(req.user, req.classInfo, data)
    .then(post => {
      res.json(post)
    })
    .catch(err => {
      next(err);
    })
};

var getClassPosts = (req, res, next) => {
  PostsService.getClassPosts(req.classInfo)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      next(err)
    })
}