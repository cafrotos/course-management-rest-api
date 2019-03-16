'use strict';
module.exports = (sequelize, DataTypes) => {
  const classes = sequelize.define('classes', {
    className: DataTypes.STRING,
    classCode: DataTypes.STRING,
    createBy: DataTypes.INTEGER,
    description: DataTypes.STRING,
    room: DataTypes.STRING,
    moduleId: DataTypes.INTEGER,
    roles: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {
        post: "ONLY_LECTURER",
        comment: "*"
      }
    }
  }, {});
  classes.associate = function(models) {
    classes.belongsTo(models.modules, {foreignKey: "moduleId"})
    classes.belongsToMany(models.users, {through: "users_classes"})
  };
  return classes;
};