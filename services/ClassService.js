const
  { users, classes } = require('models')

const getAllClassesOfUser = async (userInfo, option) => {
  let user = await users.findById(userInfo.id);
  let classes = await user.getClasses()
}