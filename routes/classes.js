const
  router = require('express').Router(),
  { SECTION } = require('../constants'),
  { decentralization, classPermistion } = require('./middlware/authentication'),
  { ClassesService } = require('services'),
  QueryHelper = require('libs/QueryHelper');

module.exports = () => {
  router.route('/')
    .get(decentralization(), getAllClass)
    .post(decentralization(SECTION.LECTURER_CODE), createNewClass)

  router.route('/enrol')
    .post(decentralization(), enrolToClassByClassCode)

  router.route('/:classId')
    .get(decentralization(), classPermistion, getClassInfoById)
    .post(decentralization(SECTION.LECTURER_CODE), classPermistion, addNewStudent)
    .patch(decentralization(SECTION.LECTURER_CODE), classPermistion, updateClassInfoById)

  return router;
}

var getAllClass = (req, res, next) => {
  let query = QueryHelper.queryParser(req.query);
  ClassesService.getClassesInfoOfUser(req.user, query)
    .then(classes => {
      res.status(200).json(classes)
    })
    .catch(err => {
      next(err);
    })
}

var createNewClass = (req, res, next) => {
  ClassesService.createNewClass(req.user, req.body)
    .then(classInfo => {
      res.status(200).json(classInfo)
    })
    .catch(err => {
      next(err);
    })
}

var getClassInfoById = (req, res, next) => {
  let classInfo = req.classInfo;
  res.status(200).json(classInfo)
}

var addNewStudent = (req, res, next) => {
  let { emails } = req.body
  ClassesService.addNewStudentToClassByEmails(req.user, req.classInfo, emails)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      next(err);
    })
}

var enrolToClassByClassCode = (req, res, next) => {
  let id = req.body.classId
  ClassesService.enrolClassByClassCode(req.user, id)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      next(err)
    })
}

var updateClassInfoById = (req, res, next) => {
  ClassesService.updateClassInfo(req.user, req.body)
    .then(classInfo => {
      res.status(200).json(classInfo)
    })
    .catch(err => {
      next(err);
    })
}