'use strict';
const BcryptHelper = require('libs/BcryptHelper')

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    avatar: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "https://courses-management-api.herokuapp.com/attachments/download/1K-XDe7DcynBBaKuaYssgNDKIEfQgvZvM"
    },
    address: DataTypes.STRING,
    section: DataTypes.STRING,
    isLogged: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {});
  users.associate = function (models) {
    users.belongsToMany(models.classes, { through: 'students_classes' })
    users.belongsToMany(models.classes, { through: { model: models.posts, unique: false }, foreignKey: 'postBy', unique: false })
    users.hasMany(models.classes, { foreignKey: 'lecturerId' })
  };
  users.prototype.toJSON = function () {
    let { id, email, firstName, lastName, avatar, address, section } = this.dataValues;
    return { id, email, firstName, lastName, avatar, address, section }
  }
  users.prototype.comparePassword = function (password) {
    let result;
    try {
      result = BcryptHelper.comparePassword(password, this.dataValues.password);
    } catch (error) {
      console.log(error);
      result = false;
    }
    return result;
  }
  return users;
};