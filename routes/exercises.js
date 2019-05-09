const
  router = require('express').Router(),
  createErrors = require('http-errors'),
  { SECTION } = require('../constants'),
  { decentralization, classPermistion } = require('./middlware/authentication'),
  { AttachmentsService, ExercisesService } = require('services');

module.exports = () => {
  router.route('/courses/:classId')
    .get(decentralization(), classPermistion, getExercises)
    .post(decentralization(SECTION.LECTURER_CODE), classPermistion, AttachmentsService.upload.array('files', 4), createExcercise)
  router.route('/courses/:classId/:exerciseId')
    .get(decentralization(), classPermistion, getExercise)
    .post(decentralization(), classPermistion, submitExcercise)
  return router;
}

var getExercises = (req, res, next) => {
  ExercisesService.getExercises(req.classInfo)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      next(err)
    })
}

var getExercise = (req, res, next) => {
  ExercisesService.getExercise(req.params.exerciseId)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      next(err)
    })
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

var submitExcercise = (req, res, next) => {

}