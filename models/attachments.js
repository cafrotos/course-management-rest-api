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
  };
  return attachments;
};