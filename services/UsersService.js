const
  JwtHelper = require('libs/JwtHelper'),
  createErrors = require('http-errors'),
  BcryptHelper = require('libs/BcryptHelper'),
  { users } = require('models');

const registerUser = async (userInfo) => {
  let { email, password } = userInfo;
  let user, hashPassword;
  user = await users.findOne({ where: { email } });
  if (user) throw createErrors(400, "Email has ben taken!");
  hashPassword = BcryptHelper.hashPassword(password);
  return await users.create({ ...userInfo, password: hashPassword });
}

const loginUser = async ({ email, password }) => {
  let user, userInfo, access_token;
  let date = new Date();
  user = await users.findOne({ where: { email } });
  if (!user || !user.comparePassword(password)) throw createErrors(400, "Email or password incorect");
  userInfo = user.toJSON();
  let timeLogin = - new Date(user.updatedAt).getTime() + date.getTime();
  let hourLogin = timeLogin / 3600000;
  // if (userInfo.isLogged && hourLogin < 3) throw createErrors(401, "Tài khoản đã đăng nhập ở máy tính khác");
  await users.update({ isLogged: true, updatedAt: date }, { where: { email } })
  access_token = JwtHelper.createAccessToken({ id: userInfo.id, email, section: userInfo.section, loggedAt: date })
  return { ...userInfo, access_token }
}

const logout = async (user) => {
  return await await users.update({ isLogged: false }, {where: {id: user.id}})
} 

const getUserInfo = async (user) => {
  let userInfo = await users.findById(user.id);
  if (!userInfo) throw createErrors(404, "Not Found")
  return userInfo.toJSON();
}

const updateUserInfo = async (user, dataUpdate) => {
  let countUserEmail = user.findOne({ where: { email: dataUpdate.email } })
  if (countUserEmail) throw createErrors(400, "This email has been taken!")
  let userInfo = {
    email: dataUpdate.email,
    firstName: dataUpdate.firstName,
    lastName: dataUpdate.lastName,
    avatar: dataUpdate.avatar,
    address: dataUpdate.address,
  }

  return await users.update(userInfo, { where: { id: user.id } })
}

module.exports = {
  registerUser,
  loginUser,
  getUserInfo,
  updateUserInfo,
  logout
}