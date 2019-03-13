'use strict';
module.exports = (sequelize, DataTypes) => {
  const modules = sequelize.define('modules', {
    module_name: DataTypes.STRING,
    credit: DataTypes.INTEGER
  }, {});
  modules.associate = function(models) {
    modules.hasMany(models.classes)
  };
  return modules;
};