'use strict';
module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define('posts', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
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
  };
  return posts;
};