const
  jwt = require('jsonwebtoken'),
  createErrors = require('http-errors'),
  bcrypt = require('bcrypt'),
  router = require('express').Router(),
  SECRET_KEY_JWT = process.env.SECRET_KEY_JWT,
  { users } = require('../models');

router.post('/register', (req, res, next) => {
  let { email, password } = req.body;
  users.count({ where: { email } })
    .then(quantities => {
      if (quantities) {
        next(createErrors(400, "This email is taken"))
      }
      else {
        let hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        return users.create({ ...req.body, password: hashPassword })
          .then(user => {
            res.json(user.toJSON())
          })
          .catch(err => {
            console.log(err)
            next(createErrors(500, err))
          })
      }
    })
    .catch(err => {
      next(createErrors(500, err))
    })
});

router.post('/login', (req, res, next) => {
  let { email, password } = req.body;
  users.findOne({ where: { email } })
    .then(user => {
      if (user && user.comparePassword(password)) {
        let userInfo = user.toJSON();
        let access_token = jwt.sign({ email: userInfo.email, section: userInfo.section }, SECRET_KEY_JWT, { expiresIn: "1h" })
        res.json({ ...userInfo, access_token });
      }
      else next(createErrors(401, "User or password incorrect!"))
    })
    .catch(err => {
      next(createErrors(500, err))
    })
});

module.exports = router;