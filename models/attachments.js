'use strict';
module.exports = (sequelize, DataTypes) => {
  const attachments = sequelize.define('attachments', {
    name: DataTypes.STRING,
    driveId: DataTypes.STRING,
    batchId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  attachments.associate = function (models) {
    attachments.belongsTo(models.posts, { foreignKey: 'batchId', targetKey: 'attachmentBatchId', constraints: false })
    attachments.belongsTo(models.exercises, { foreignKey: 'batchId', targetKey: 'attachmentBatchId', constraints: false })
  };
  return attachments;
};