const
  { users, classes, students_classes } = require('models'),
  CreateError = require('libs/CreateErrors'),
  { Op } = require('sequelize'),
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
  let queryFilterClasses = query ? query : { where: {}};
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
  let classInterface = new ClassInterface({ ...classInfo, lecturerId: lecturer.id });
  let classEntity = classInterface.getClassesEntityToCreate();
  return classes.create(classEntity);
}

/**
 * lấy thông tin chi tiết của 1 lớp
 * @param {*} user 
 * @param {*} classCode 
 */
async function getClassDetailInfo(user, classCode) {

}

/**
 * Lecturer sẽ dùng api này để them danh sách sinh viên vào lớp
 * @param {*} id 
 * @param {*} emails 
 */
async function addNewStudentToClassByEmails(user, id, emails) {
  if (!Array.isArray(emails)) throw CreateError(400, "Emails must be array!");
  let result = await Promise.all([
    classes.findOne({ where: { id, lecturerId: user.id } }),
    users.findAll({ where: { email: { [Op.or]: emails } } })
  ])
  let classInfo = result[0];
  let usersInfo = result[1];
  if(!classInfo) throw CreateError(404, "Can't not found class!")
  return await classInfo.addUsers(usersInfo)
}


async function enrolClassByClassCode(user, id) {
  let result = await Promise.all([
    classes.findOne({ where: { id } }),
    users.findOne({ where: { id: user.id } })
  ])
  let classInfo = result[0];
  let userInfo = result[1];
  if (!classInfo) throw CreateError(404, "Can't not found class!");
  return await classInfo.addUsers(userInfo)
}

module.exports = {
  getClassesInfoOfUser,
  createNewClass,
  addNewStudentToClassByEmails,
  enrolClassByClassCode
}