const 
  multer = require('multer'),
  GoogleDriveStorage = require('multer-google-drive'),
  GoogleAPI = require('libs/GoogleAPI'),
  SystemSetting = require('libs/SystemSetting'),
  {GOOGLE_SERVICE} = require('../constants');

const drive = GoogleAPI(GOOGLE_SERVICE.DRIVE);

const upload = multer({
  storage: GoogleDriveStorage({
    drive: drive,
    parents: SystemSetting('google.rootFolderId'),
    fileName: function(req, file, cb) {
      let fileName = `${req.classInfo.dataValues.id}_${file.originalname}`;
      cb(null, fileName);
    }
  })
})

module.exports = {
  upload
}