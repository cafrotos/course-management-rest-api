const
  router = require('express').Router(),
  { SECTION } = require('../constants'),
  { decentralization, classPermistion } = require('./middlware/authentication'),
  { AttachmentsService } = require('services'),
  CreateErrors = require('libs/CreateErrors');

module.exports = () => {
  router.route(classPermistion, '/download/:fileId')
    .get(dowloadFile)
  return router;
}

var dowloadFile = (req, res, next) => {
  AttachmentsService.dowloadAttachment(req.params.fileId)
    .then(result => {
      if (result.data) {
        result.data.pipe(res);
      }
      else next(new CreateErrors(500, "SERVER INTERVAL"))
    })
    .catch(err => {
      next(err);
    })
}