'use strict';
module.exports = (sequelize, DataTypes) => {
  const exercises = sequelize.define('exercises', {
    classId: DataTypes.STRING,
    postBy: DataTypes.INTEGER,
    content: DataTypes.STRING,
    attachmentBatchId: DataTypes.STRING,
    point: DataTypes.SMALLINT,
    startedAt: DataTypes.DATE,
    exprisedAt: DataTypes.DATE
  }, {});
  exercises.associate = function (models) {
    exercises.hasMany(models.attachments, { foreignKey: 'batchId', sourceKey: 'attachmentBatchId', constraints: false })
    exercises.belongsTo(models.classes, { foreignKey: 'classId', as: 'class' })
    exercises.belongsTo(models.users, { foreignKey: 'postBy', as: "userPost" })
  };
  return exercises;
};