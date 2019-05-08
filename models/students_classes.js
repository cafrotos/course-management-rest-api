'use strict';
module.exports = (sequelize, DataTypes) => {
  const students_classes = sequelize.define('students_classes', {
    classId: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    exercisesNumber: DataTypes.SMALLINT,
    gpa: DataTypes.DOUBLE
  }, {});
  students_classes.associate = function (models) {
    students_classes.belongsTo(models.users, { foreignKey: 'userId' });
    students_classes.belongsTo(models.classes, { foreignKey: 'classId' });
  };
  return students_classes;
};