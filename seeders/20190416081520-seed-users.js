'use strict';
const BcryptHelper = require('libs/BcryptHelper');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let date = new Date();
    let rawPassword = "123456";
    let hashPassword = BcryptHelper.hashPassword(rawPassword);

    return await queryInterface.bulkInsert('users', [
      {
        email: "admin@coursesmanagement.admin",
        password: hashPassword,
        firstName: "Admin",
        avatar: "https://uphinhnhanh.com/images/2018/12/09/10354686_10150004552801856_220367501106153455_n-1.jpg",
        lastName: "Admin",
        address: "Skypia",
        section: "ADMIN", createdAt: date, updatedAt: date
      },
      {
        email: "lecturer@coursesmanagement.lecturer",
        password: hashPassword,
        firstName: "Lecturer",
        avatar: "https://uphinhnhanh.com/images/2018/12/09/10354686_10150004552801856_220367501106153455_n-1.jpg",
        lastName: "Lecturer",
        address: "Earth",
        section: "LECTURER", createdAt: date, updatedAt: date
      },
      {
        email: "student@coursesmanagement.student",
        password: hashPassword,
        firstName: "Student",
        avatar: "https://uphinhnhanh.com/images/2018/12/09/10354686_10150004552801856_220367501106153455_n-1.jpg",
        lastName: "Student",
        address: "Earth",
        section: "STUdENT", createdAt: date, updatedAt: date
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
