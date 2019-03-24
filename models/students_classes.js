'use strict';
module.exports = (sequelize, DataTypes) => {
  const students_classes = sequelize.define('students_classes', {
    userId: DataTypes.INTEGER,
    classId: DataTypes.STRING,
    exercisesNumber: DataTypes.SMALLINT,
    gpa: DataTypes.DOUBLE
  }, {});
  students_classes.associate = function (models) {
    students_classes.belongsTo(models.users, { foreignKey: 'userId' });
    students_classes.belongsTo(models.classes, { foreignKey: 'userId' });
  };
  return students_classes;
};