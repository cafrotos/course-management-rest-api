const
  router = require('express').Router(),
  createErrors = require('http-errors'),
  { SECTION } = require('../constants'),
  { decentralization, classPermistion } = require('./middlware/authentication'),
  { AttachmentsService, ExercisesService } = require('services');

module.exports = () => {
  router.route('/')
    .get(decentralization(), getExercises)
    .post(decentralization(SECTION.LECTURER_CODE), classPermistion, AttachmentsService.upload.array('files', 4), createExcercise)
  // router.route('/:id')
  //   .get(decentralization(), getExercise)
  //   .patch(decentralization(SECTION.LECTURER_CODE), updateExcercise)
  //   .post(decentralization(), submitExcercise)
  return router;
}

var getExercises = (req, res, next) => {

}

var createExcercise = (req, res, next) => {
  ExercisesService.createExercise(req.user, req.classInfo, req.body, req.files)
    .then(exercise => {
      res.status(200).json(exercise);
    })
    .catch(err => {
      next(err);
    })
}