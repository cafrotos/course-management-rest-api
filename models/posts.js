'use strict';
module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define('posts', {
    classId: {
      type: DataTypes.STRING
    },
    postBy: {
      type: DataTypes.INTEGER
    },
    attachmentBatchId: {
      type: DataTypes.STRING,
    },
    content: DataTypes.STRING,
  }, {});
  posts.associate = function (models) {
    posts.hasMany(models.attachments, { foreignKey: 'batchId', sourceKey: 'attachmentBatchId', constraints: false })
  };
  return posts;
};