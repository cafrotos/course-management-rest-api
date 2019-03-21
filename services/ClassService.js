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
async function getClassesInfoOfUser(user, query, option) {
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
  queryFilterClasses.where.lecturerId = lecturerId;
  return await classes.findAll(queryFilterClasses);
}

async function getClassOfStudent(studentId, query, option) {
  let queryFilterClasses = query ? query : {};
  let queryFindStudentInfo = {
    where: { id: studentId }
  }
  let user = await users.findOne(queryFindStudentInfo);
  return await user.getClasses(queryFilterClasses);
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
  return classes.create(classEntity);
}

async function getClassDetailInfo(user, classCode) {

}
module.exports = {
  getClassesInfoOfUser,
  createNewClass
}