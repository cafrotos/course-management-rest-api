'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
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
    is_logged: DataTypes.BOOLEAN,
    token_exprired_at: DataTypes.DATE
  }, {});
  users.associate = function (models) {
    // associations can be defined here
  };
  return users;
};