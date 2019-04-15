const
  JwtHelper = require('libs/JwtHelper'),
  createErrors = require('http-errors'),
  BcryptHelper = require('libs/BcryptHelper'),
  { posts } = require('../models');

const postUser = async (postUser) => {
  let { classId, postBy, content, attachmentId } = postUser;
  if(!classId || !postBy || !content) throw createErrors(400, "Not enough content");
  return await posts.create({ ...postUser});
}

const getUserpost = async () => {
  let userPost = await posts.findAll();
  if (!userPost) throw createErrors(404, "Not Found")
  return userPost;
}

module.exports = {
  postUser,
  getUserpost
};