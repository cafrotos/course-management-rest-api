const crypto = require('crypto');

class PostsInterface {
  constructor(data) {
    if (data && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  getEntity() {
    let failures = this.validate();
    if (Object.getOwnPropertyNames(failures).length > 0) throw failures;
    this.attachmentBatchId = this.genBatchId();
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
    if (!failures[field]) failures[field] = []
    else failures[field].push(message);
  }
}

module.exports = PostsInterface;