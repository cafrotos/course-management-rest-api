'use strict';
module.exports = (sequelize, DataTypes) => {
  const attachments = sequelize.define('attachments', {
    name: DataTypes.STRING,
    driveId: DataTypes.STRING,
    batchId: DataTypes.STRING
  }, {});
  attachments.associate = function (models) {
    attachments.belongsTo(models.posts, { foreignKey: 'batchId' })
  };
  return attachments;
};