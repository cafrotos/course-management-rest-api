const
  router = require('express').Router(),
  classesRouter = require('./classes'),
  {requireLogin, decentralization} = require('./middlware/auth');

router.get('/', decentralization(), (req, res, next) => {
  res.json("oke")
})

router.use('/classes', requireLogin, classesRouter());

module.exports = router;
