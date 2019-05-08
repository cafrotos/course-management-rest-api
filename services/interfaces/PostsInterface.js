const crypto = require('crypto');

class PostsInterface {
  constructor(data) {
    if (data && typeof data === 'object') {
      this.classId = data.classInfo.id;
      this.content = data.postInfo.content;
      this.postBy = data.user.id;
      this.hasAttachment = data.files.length ? true : false;
    }
  }

  getEntity() {
    let failures = this.validate();
    if (Object.getOwnPropertyNames(failures).length > 0) throw failures;
    this.attachmentBatchId = this.hasAttachment ? this.genBatchId() : null;
    return {
      classId: this.classId,
      postBy: this.postBy,
      content: this.content,
      attachmentBatchId: this.attachmentBatchId
    }
  }

  genBatchId() {
    let stringHash = new Date().toString() + this.classId + this.postBy;
    return crypto.createHash('md5').update(stringHash).digest('hex');
  }

  validate() {
    let failures = {}
    const propertiesRequire = [
      { field: 'classId', type: 'string' },
      { field: 'postBy', type: 'number' },
      { field: 'content', type: 'string' }
    ]

    propertiesRequire.map(property => {
      let field = property.field
      if (!this[field] || typeof this[field] !== property.type) {
        this.addFailures(failures, { field, message: "Wrong data" })
      }
    })

    return failures;
  }

  addFailures(failures, { field, message }) {
    if (!failures) failures = {};
    if (!failures[field] || !Array.isArray(failures[field])) failures[field] = []
    failures[field].push(message);
  }
}

module.exports = PostsInterface;