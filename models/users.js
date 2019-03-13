'use strict';
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    avatar: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "https://uphinhnhanh.com/images/2018/12/09/10354686_10150004552801856_220367501106153455_n-1.jpg"
    },
    address: DataTypes.STRING,
    section: DataTypes.STRING,
    is_logged: DataTypes.BOOLEAN
  }, {});
  users.associate = function (models) {
    // associations can be defined here
  };
  users.prototype.toJSON = function () {
    let { email, first_name, last_name, avatar, address, section } = this.dataValues;
    return { email, first_name, last_name, avatar, address, section }
  }
  users.prototype.comparePassword = function(password) {
    let result;
    try {
      result = bcrypt.compareSync(password, this.dataValues.password);
    } catch (error) {
      console.log(error);
      result = false;
    }
    return result;
  }
  return users;
};