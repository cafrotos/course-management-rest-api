const
  router = require('express').Router(),
  { SECTION } = require('../constants'),
  { decentralization, classPermistion } = require('./middlware/authentication'),
  AttachmentsService = require('services/AttachmentsService'),
  CreateErrors = require('libs/CreateErrors');

module.exports = () => {
  router.route('/upload/:id')
    .post(decentralization(), classPermistion, AttachmentsService.upload.single('file'), uploadFile)
  router.route('/dowload/:fileId')
    .get(decentralization(), dowloadFile)
  return router;
}

var dowloadFile = (req, res, next) => {
  AttachmentsService.dowloadAttachment(req.params.fileId)
    .then(result => {
      if(result.data) {
        result.data.pipe(res);
      }
      else next(new CreateErrors(500, "SERVER INTERVAL"))
    })
    .catch(err => {
      next(err);
    })
}

var uploadFile = (req, res, next) => {
  let file = req.file;
  console.log(file);
  res.json(file);
}