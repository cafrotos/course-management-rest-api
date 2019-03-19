'use strict';
module.exports = (sequelize, DataTypes) => {
  const students_classes = sequelize.define('students_classes', {
    userId: DataTypes.INTEGER,
    classId: DataTypes.INTEGER,
    exercisesNumber: DataTypes.SMALLINT,
    gpa: DataTypes.DOUBLE
  }, {});
  students_classes.associate = function(models) {
    // associations can be defined here
  };
  return students_classes;
};