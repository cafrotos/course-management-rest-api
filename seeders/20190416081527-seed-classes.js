'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let date = new Date();
    let roles = {
      "post": "ONLY_LECTURER",
      "comment": "*"
    }
    return queryInterface.bulkInsert('classes', [
      {
        id: 'testidclass28347khsjdfh29834f',
        className: "Class Test",
        lecturerId: 2,
        description: "Đây là 1 lớp được seed ra!",
        room: "310",
        moduleId: 1, createdAt: date, updatedAt: date,
        roles: JSON.stringify(roles)
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('classes', null, {});
  }
};
