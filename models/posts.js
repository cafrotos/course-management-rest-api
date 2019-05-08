'use strict';
module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define('posts', {
    classId: DataTypes.STRING,
    postBy: DataTypes.INTEGER,
    attachmentBatchId: DataTypes.STRING,
    content: DataTypes.STRING,
  }, {});
  posts.associate = function (models) {
    posts.hasMany(models.attachments, { foreignKey: 'batchId', sourceKey: 'attachmentBatchId', constraints: false })
    posts.belongsTo(models.classes, { foreignKey: 'classId' })
    posts.belongsTo(models.users, { foreignKey: 'postBy', as: "userPosted" })
  };
  return posts;
};