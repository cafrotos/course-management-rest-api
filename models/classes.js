'use strict';
module.exports = (sequelize, DataTypes) => {
  const classes = sequelize.define('classes', {
    class_name: DataTypes.STRING,
    create_by: DataTypes.INTEGER,
    description: DataTypes.STRING,
    room: DataTypes.STRING,
    module_id: DataTypes.INTEGER,
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
    classes.belongsTo(models.modules, {foreignKey: "module_id"})
    classes.belongsToMany(models.users, {through: "users_classes"})
  };
  return classes;
};