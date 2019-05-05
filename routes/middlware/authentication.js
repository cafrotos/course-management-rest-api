const
  { classes, student_class } = require('models'),
  JwtHelper = require('libs/JwtHelper'),
  createErrors = require('http-errors'),
  { SECTION } = require('../../constants');

function requireLogin(req, res, next) {
  const token = req.header('Authorization') || (req.query.token ? `Bearer ${req.query.token}` : null);
  if (token && token.split(' ')[0] === 'Bearer') {
    JwtHelper.verifyAccessToken(token.split(' ')[1])
      .then(decode => {
        req.user = decode;
        next();
      })
      .catch(err => {
        next(createErrors(401, "Forbidden"))
      })
  }
  else next(createErrors(401, "Forbidden"))
}

function decentralization(restriction_level) {
  if (!restriction_level) restriction_level = "*";
  return decentralization[restriction_level] || (decentralization[restriction_level] = (req, res, next) => {
    if (req.user) {
      if (restriction_level === "*" || SECTION[req.user.section] >= SECTION[restriction_level])
        next();
      else next(createErrors(401, "Permisson Denied"));
    }
    else next(createErrors(401, "Permisson Denied"));
  })
}

async function classPermistion(req, res, next) {
  let classId = req.params.classId || req.body.classId;
  let user = req.user;
  let classInfo
  switch (user.section) {
    case SECTION.LECTURER_CODE:
      classInfo = await classes.findOne({ where: { id: classId, lecturerId: user.id } });
      break;
    case SECTION.STUDENT_CODE:
      let relative = await student_class.findOne({
        where: {
          classId, userId: user.id
        },
        include: [
          { model: classes, require: true, as: "classes" }
        ]
      })
      if (relative) {
        classInfo = relative.dataValues.classes;
      }
      break;
    default: next(createErrors(403, "Permisson Denied"))
  }
  if (!classInfo) next(createErrors(403, "Permisson Denied"))
  req.classInfo = classInfo;
  next();
}

module.exports = {
  requireLogin,
  decentralization,
  classPermistion
};