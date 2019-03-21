const
  router = require('express').Router(),
  { SECTION } = require('../constants'),
  { decentralization } = require('./middlware/authentication'),
  ClassService = require('services/ClassService'),
  QueryHelper = require('libs/QueryHelper');

module.exports = () => {
  router.route('/')
    .get(decentralization(), getAllClass)
    .post(decentralization(SECTION.LECTURER_CODE), createNewClass)

  router.route('/:code')
    .get(decentralization(), getClassInfoById)
    .post(decentralization(SECTION.LECTURER_CODE), addNewStudent)
    .patch(decentralization(SECTION.LECTURER_CODE), updateClassInfoById)

  router.route('/enrol')
    .post(decentralization(), enrolToClassByClassCode)

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
  ClassService.addStudentIntoClass(req.params.code, req.body)
    .then(classInfo => {
      res.status(200).json(classInfo)
    })
    .catch(err => {
      next(err);
    })
}

var enrolToClassByClassCode = (req, res, next) => {
  res.status(200).json("oke")
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