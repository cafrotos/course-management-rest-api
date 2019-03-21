const crypto = require('crypto');

class ClassInterface {
  constructor(info) {
    if (!info) info = {};
    this.className = info.className;
    this.classCode = info.classCode;
    this.lecturerId = info.lecturerId;
    this.studentNumber = info.studentNumber;
    this.description = info.description;
    this.room = info.room;
    this.moduleId = info.moduleId;
    this.roles = info.roles;
  }

  getClassesEntityToCreate() {
    let failures = this.validateClassesEntity()
    if (Object.getOwnPropertyNames(failures).length > 0) throw failures;
    this.classCode = this.genClassCode();
    return {
      className: this.className,
      classCode: this.classCode,
      lecturerId: this.lecturerId,
      description: this.description,
      room: this.room,
      moduleId: this.moduleId
    }
  }

  genClassCode() {
    let stringHash = new Date().toString() + this.className + this.lecturerId;
    return crypto.createHash('md5').update(stringHash).digest('hex');
  }

  validateClassesEntity() {
    let failures = {}
    let propertiesRequire = [
      { field: 'className', type: 'string' },
      { field: 'lecturerId', type: 'number' },
      { field: 'moduleId', type: 'number' },
    ]
    for (const property of propertiesRequire) {
      if (this[property.field] === undefined) {
        this.addFailures(failures, { field: property.field, message: `Input ${property.field}` })
      }
      else if (typeof this[property.field] === 'string' && this[property.field].trim() === '') {
        this.addFailures(failures, { field: property.field, message: `Input ${property.field}` })
      }
      if (typeof this[property.field] !== property.type) {
        this.addFailures(failures, { field: property.field, message: `${property.field} must be ${property.type}` })
      }
    }

    return failures;
  }

  addFailures(failures, { field, message }) {
    if (!failures) failures = {};
    if (!failures[field]) failures[field] = []
    else failures[field].push(message);
  }
}

module.exports = ClassInterface;