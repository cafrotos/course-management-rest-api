const
  JwtHelper = require('libs/JwtHelper'),
  createErrors = require('http-errors'),
  BcryptHelper = require('libs/BcryptHelper'),
  {comments} = require('../models')

var userComment = async(userComment) => {
  let {commentId, postId, content} = comments
  if(!commentId || !postId || !content) throw createErrors(404, "have not insert ")
}

module.exports = {
  
};