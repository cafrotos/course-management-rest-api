const auth = require('libs/GoogleAuthorize');

class GoogleDriveAPI {
  constructor() {
    this.drive = google.drive({ version: 'v3', auth })
  }

  uploadFile(stream, folderId, path) {
    this.drive.files.create()
  }
  downloadFIle(fileId) {
    return stream;
  }
}

