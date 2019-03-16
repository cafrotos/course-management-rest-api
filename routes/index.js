const
  router = require('express').Router(),
  {requireLogin, decentralization} = require('./middlware/auth');

router.all('/', requireLogin);
router.get('/', decentralization(), (req, res, next) => {
  res.json("oke")
})

module.exports = router;
