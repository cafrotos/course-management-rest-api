const
  router = require('express').Router(),
  classesRouter = require('./classes'),
  { requireLogin, decentralization } = require('./middlware/authentication'),
  userRouter = require('./users'),
  postRouter = require('./posts'),
  attachmentRouter = require('./attachments'),
  modulesRouter = require('./modules'),
  exercisesRouter = require('./exercises');

router.use('/users', requireLogin, userRouter())
router.use('/attachments', attachmentRouter())
router.use('/classes', requireLogin, classesRouter());
router.use('/posts', requireLogin, postRouter());
router.use('/modules', requireLogin, modulesRouter());
router.use('/exercises', requireLogin, exercisesRouter());

module.exports = router;
