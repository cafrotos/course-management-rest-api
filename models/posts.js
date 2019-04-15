'use strict';
module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define('posts', {
    classId: DataTypes.STRING,
    postBy: DataTypes.INTEGER,
    content: DataTypes.STRING,
    attachmentBatchId: DataTypes.STRING
  }, {});
  posts.associate = function (models) {
    posts.hasMany(models.attachments, { foreignKey: 'batchId' })
  };
  return posts;
};