const
  router = require('express').Router(),
  createErrors = require('http-errors'),
  { SECTION } = require('../constants'),
  { decentralization } = require('./middlware/authentication');

module.exports = () => {
  router.route('/')
    .get(decentralization(), getExercises)
    .post(decentralization(SECTION.LECTURER_CODE), createExcercise)
  router.route('/:id')
    .get(decentralization(), getExercise)
    .patch(decentralization(SECTION.LECTURER_CODE), updateExcercise)
    .post(decentralization(), submitExcercise)
  return router;
}

var getExercises = (req, res, next) => {

}

var createExcercise = (req, res, next) => {
  
}