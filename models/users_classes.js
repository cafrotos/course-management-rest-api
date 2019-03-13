'use strict';
module.exports = (sequelize, DataTypes) => {
  const users_classes = sequelize.define('users_classes', {
    user_id: DataTypes.INTEGER,
    class_id: DataTypes.INTEGER,
    exercises_number: DataTypes.SMALLINT,
    gpa: DataTypes.DOUBLE
  }, {});
  users_classes.associate = function(models) {
    // associations can be defined here
  };
  return users_classes;
};