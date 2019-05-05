const crypto = require('crypto');

class ExerciseInterface {
  constructor(data) {
    if (data && typeof data === 'object') {
      this.classId = data.classInfo.id;
      this.content = data.exercise.content;
      this.postBy = data.user.id;
      this.startedAt = data.exercise.startedAt;
      this.exprisedAt = data.exercise.exprisedAt;
      this.point = data.exercise.point;
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
      startedAt: this.startedAt,
      exprisedAt: this.exprisedAt,
      point: this.point,
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
      { field: 'classId' },
      { field: 'postBy' },
      { field: 'content' },
      { field: 'startedAt' },
      { field: 'exprisedAt' },
      { field: 'point' }
    ]

    propertiesRequire.map(property => {
      let field = property.field
      if (!this[field]) {
        this.addFailures(failures, { field, message: `Mời nhập lại ${field}` })
      }
    })

    return failures;
  }

  static addFailures(failures, { field, message }) {
    if (!failures) failures = {};
    if (!failures[field] || !Array.isArray(failures[field])) failures[field] = []
    failures[field].push(message);
  }
}

module.exports = ExerciseInterface;