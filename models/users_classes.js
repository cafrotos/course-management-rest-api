'use strict';
module.exports = (sequelize, DataTypes) => {
  const users_classes = sequelize.define('users_classes', {
    userId: DataTypes.INTEGER,
    classId: DataTypes.INTEGER,
    exercisesNumber: DataTypes.SMALLINT,
    gpa: DataTypes.DOUBLE
  }, {});
  users_classes.associate = function(models) {
    // associations can be defined here
  };
  return users_classes;
};