const
  multer = require('multer'),
  GoogleDriveStorage = require('multer-google-drive'),
  GoogleAPI = require('libs/GoogleAPI'),
  SystemSetting = require('libs/SystemSetting'),
  CreateError = require('libs/CreateErrors'),
  { attachments } = require('models'),
  { GOOGLE_SERVICE } = require('../constants');

const drive = GoogleAPI(GOOGLE_SERVICE.DRIVE);

const upload = multer({
  storage: GoogleDriveStorage({
    drive: drive,
    parents: SystemSetting('google.rootFolderId'),
    fileName: function (req, file, cb) {
      let fileName = `${req.classInfo.dataValues.id}_${file.originalname}`;
      cb(null, fileName);
    }
  })
})

const saveAttachment = (files, batchId, options) => {
  if(!batchId || !files || !Array.isArray(files)) throw new CreateError(500, "Data error!");
  let transaction = options.transaction ? options.transaction : null;
  let attachmentModels = [];
  files.map(file => {
    let attachment = {
      name: file.fileName,
      batchId: batchId,
      driveId: file.fileId
    }
  })
}

module.exports = {
  upload
}