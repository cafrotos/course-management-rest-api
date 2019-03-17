const
  router = require('express').Router(),
  {requireLogin, decentralization} = require('./middlware/authentication'),
  userRouter = require('./users');

router.use('/users', requireLogin, userRouter())
router.get('/', decentralization(), (req, res, next) => {
  res.json(req.user)
})

module.exports = router;
