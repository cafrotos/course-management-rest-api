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

const saveAttachment = async (files, batchId, options) => {
  if (!batchId || !files || !Array.isArray(files)) throw new CreateError(500, "Data error!");
  let transaction = options.transaction ? options.transaction : null;
  let attachmentModels = [];
  files.map(file => {
    let attachment = {
      name: file.fileName,
      batchId: batchId,
      driveId: file.fileId
    }
    attachmentModels.push(attachment);
  })
  return await attachments.bulkCreate(attachmentModels, { transaction });
}

const dowloadAttachment = async (fileId) => {
  if(!fileId) throw new CreateError(400, "fileIs is undefined")
  return await drive.files.get(
    { fileId, alt: 'media' },
    {responseType: 'stream'}
  )
}

module.exports = {
  upload,
  dowloadAttachment,
  saveAttachment
}