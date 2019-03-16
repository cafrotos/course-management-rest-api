const
  router = require('express').Router(),
  {requireLogin, decentralization} = require('./middlware/authentication');

router.all('/', requireLogin);
router.get('/', decentralization(), (req, res, next) => {
  res.json(req.user)
})

module.exports = router;
