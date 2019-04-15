'use strict';
module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define('posts', {
    classId: DataTypes.INTEGER,
    postBy: DataTypes.INTEGER,
    content: DataTypes.STRING,
    attachmentId: DataTypes.STRING
  }, {});
  posts.associate = function(models) {
    // associations can be defined here
  };
  return posts;
};