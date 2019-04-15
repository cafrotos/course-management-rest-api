const
  router = require('express').Router(),
  classesRouter = require('./classes'),
  { requireLogin, decentralization } = require('./middlware/authentication'),
  userRouter = require('./users'),
  postRouter = require('./posts');

router.use('/users', requireLogin, userRouter())
router.get('/', requireLogin, decentralization(), (req, res, next) => {
  res.json(req.user)
})

router.use('/classes', requireLogin, classesRouter());
router.use('/post', requireLogin, postRouter())

module.exports = router;
