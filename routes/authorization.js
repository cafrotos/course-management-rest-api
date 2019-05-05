const
  { UsersService } = require('services'),
  router = require('express').Router()

router.post('/register', (req, res, next) => {
  UsersService.registerUser(req.body)
    .then(user => {
      res.json(user.toJSON());
    })
    .catch(err => {
      next(err);
    })
});

router.post('/login', (req, res, next) => {
  UsersService.loginUser(req.body)
    .then(userInfo => {
      res.json(userInfo);
    })
    .catch(err => {
      console.log(err)
      next(err);
    })
});

module.exports = router;