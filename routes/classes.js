const
  router = require('express').Router(),
  { SECTION } = require('../constants'),
  { decentralization, classPermistion } = require('./middlware/authentication'),
  ClassService = require('services/ClassService'),
  QueryHelper = require('libs/QueryHelper');

module.exports = () => {
  router.route('/')
    .get(decentralization(), getAllClass)
    .post(decentralization(SECTION.LECTURER_CODE), createNewClass)

  router.route('/enrol')
    .post(decentralization(), enrolToClassByClassCode)

  router.route('/:id')
    .get(decentralization(), classPermistion, getClassInfoById)
    .post(decentralization(SECTION.LECTURER_CODE), classPermistion, addNewStudent)
    .patch(decentralization(SECTION.LECTURER_CODE), classPermistion, updateClassInfoById)

  return router;
}

var getAllClass = (req, res, next) => {
  let query = QueryHelper.queryParser(req.query);
  ClassService.getClassesInfoOfUser(req.user, query)
    .then(classes => {
      res.status(200).json(classes)
    })
    .catch(err => {
      next(err);
    })
}

var createNewClass = (req, res, next) => {
  ClassService.createNewClass(req.user, req.body)
    .then(classInfo => {
      res.status(200).json(classInfo)
    })
    .catch(err => {
      next(err);
    })
}

var getClassInfoById = (req, res, next) => {
  ClassService.getClassInfoById(req.user, req.params.id)
    .then(classInfo => {
      res.status(200).json(classInfo)
    })
    .catch(err => {
      next(err);
    })
}

var addNewStudent = (req, res, next) => {
  let { emails } = req.body
  ClassService.addNewStudentToClassByEmails(req.user, req.params.id, emails)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      next(err);
    })
}

var enrolToClassByClassCode = (req, res, next) => {
  let id = req.body.classId
  ClassService.enrolClassByClassCode(req.user, id)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      next(err)
    })
}

var updateClassInfoById = (req, res, next) => {
  ClassService.updateClassInfo(req.user, req.body)
    .then(classInfo => {
      res.status(200).json(classInfo)
    })
    .catch(err => {
      next(err);
    })
}