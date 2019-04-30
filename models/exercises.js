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
    exercises.belongsTo(models.classes, { foreignKey: 'classId' });
    exercises.belongsTo(models.users, { foreignKey: 'postBy' });
    exercises.hasMany(models.attachments, { foreignKey: 'batchId', sourceKey: 'attachmentBatchId', constraints: false })
  };
  return exercises;
};