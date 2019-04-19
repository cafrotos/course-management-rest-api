const
  JwtHelper = require('libs/JwtHelper'),
  createErrors = require('http-errors'),
  BcryptHelper = require('libs/BcryptHelper'),
  AttachmentsService = require('./AttachmentsService'),
  PostsInterface = require('./interfaces/PostsInterface'),
  { posts, sequelize } = require('../models');

const createNewPost = async (user, classInfo, { postInfo, files }) => {
  let transaction = await sequelize.transaction();
  let postInterface = new PostsInterface({postInfo, classInfo: classInfo.dataValues, user, files});
  let postEntity
  let result, postModel;

  try {
    postEntity = postInterface.getEntity();
    result = await Promise.all([
      posts.create(postEntity, { transaction }),
      AttachmentsService.saveAttachment(files, postEntity.attachmentBatchId, { transaction, hasAttachment: postInterface.hasAttachment })
    ])
    if (!result) throw createErrors(500, "Data error")
  } catch (error) {
    transaction.rollback();
    throw error;
  }

  transaction.commit();

  postModel = result[0];
  postModel.dataValues.attachments = result[1];
  return postModel;
}

const getClassPosts = async () => {
  let userPost = await posts.findAll();
  if (!userPost) throw createErrors(404, "Not Found")
  return userPost;
}

module.exports = {
  createNewPost,
  getClassPosts
};