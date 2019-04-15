const
  router = require('express').Router(),
  classesRouter = require('./classes'),
  { requireLogin, decentralization } = require('./middlware/authentication'),
  userRouter = require('./users'),
  postRouter = require('./posts'),
  attachmentRouter = require('./attachments');

router.use('/users', requireLogin, userRouter())
router.use('/attachments', requireLogin, attachmentRouter())
router.get('/', requireLogin, decentralization(), (req, res, next) => {
  res.json(req.user)
})

router.use('/classes', requireLogin, classesRouter());
router.use('/posts/:id', requireLogin, postRouter())

module.exports = router;
