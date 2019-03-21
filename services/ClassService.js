const
  { users, classes } = require('models'),
  { SECTION } = require('../constants'),
  ClassInterface = require('./interfaces/ClassInterface');

/**
 * Lấy danh sách class của user 
 * @param {*} user 
 * @param {*} query 
 * @param {*} option 
 */
async function getClassInfoOfUser(user, query, option) {
  switch (user.section) {
    case SECTION.LECTURER_CODE:
      return await getClassOfLecturer(user.id, query, option);
    case SECTION.STUDENT_CODE: 
      return await getClassOfStudent(user.id, query, option)
    default:
      break;
  }
}

async function getClassOfLecturer(lecturerId, query, option) {
  let queryFilterClasses = query ? query : {};
  let queryFindLecturerClassInfo = {
    where: { id: lecturerId },
    include: [
      { model: classes, require: true, as: "classes", where: queryFilterClasses }
    ]
  }
  return await users.findOne(queryFindLecturerClassInfo);
}

async function getClassOfStudent(studentId, query, option) {
  let queryFilterClasses = query ? query : {};
  let queryFindStudentInfo = {
    where: { id: studentId }
  }
  let user = await users.findOne(queryFindStudentInfo);
  let classInfo = user.getClasses(queryFilterClasses);
  user.dataValues.classes = classInfo;
  return user;
}
// end

/**
 * Tạo lớp mới (quyền: lecturer)
 * @param {*} lecturer 
 * @param {*} classInfo 
 * @param {*} option 
 */
async function createNewClass(lecturer, classInfo, option) {
  let classInterface = new ClassInterface({...classInfo, lecturerId: lecturer.id});
  let classEntity = classInterface.getClassesEntityToCreate();
  return users.create(classEntity);
}

module.exports = {
  getClassInfoOfUser,
  createNewClass
}