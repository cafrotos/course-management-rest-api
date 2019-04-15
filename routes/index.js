const
  router = require('express').Router(),
  classesRouter = require('./classes'),
  { requireLogin, decentralization } = require('./middlware/authentication'),
  userRouter = require('./users');
  attachmentRouter = require('./attachments');

router.use('/users', requireLogin, userRouter())
router.use('/attachments', requireLogin, attachmentRouter())
router.get('/', requireLogin, decentralization(), (req, res, next) => {
  res.json(req.user)
})

router.use('/classes', requireLogin, classesRouter());

module.exports = router;
