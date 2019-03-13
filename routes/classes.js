const
  router = require('express').Router(),
  { SECTION } = require('../constants'),
  { decentralization } = require('./middlware/auth');

module.exports = () => {
  router.route('/')
    .get(getAllClass)
    .post(decentralization(SECTION.LECTURER_CODE), createNewClass)
  router.route('/:id')
    .get()
    .patch()
    .delete()
}

var getAllClass = (req, res, next) => {

}

var createNewClass = (req, res, next) => {

}