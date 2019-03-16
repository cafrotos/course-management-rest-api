const
  JwtHelper = require('libs/JwtHelper'),
  createErrors = require('http-errors'),
  BcryptHelper = require('libs/BcryptHelper'),
  { users } = require('../models');

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
  user = await users.findOne({ where: { email } });
  if (!user || !user.comparePassword(password)) throw createErrors(400, "Email or password incorect");
  userInfo = user.toJSON();
  access_token = JwtHelper.createAccessToken({id: userInfo.id, email, section: userInfo.section })
  return { ...userInfo, access_token }
}

module.exports = {
  registerUser,
  loginUser
}