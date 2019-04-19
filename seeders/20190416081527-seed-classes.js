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
        id: 'testidclass28347khsjdfh29834f1',
        className: "Class Test",
        lecturerId: 2,
        description: "Đây là 1 lớp được seed ra!",
        room: "310",
        moduleId: 1, createdAt: date, updatedAt: date,
        roles: JSON.stringify(roles)
      },
      {
        id: 'testidclass28347khsjdfh29834f2',
        className: "Class 1",
        lecturerId: 2,
        description: "Đây là 1 lớp được seed ra!",
        room: "310",
        moduleId: 1, createdAt: date, updatedAt: date,
        roles: JSON.stringify(roles)
      },
      {
        id: 'testidclass28347khsjdfh29834f3',
        className: "Class 2",
        lecturerId: 2,
        description: "Đây là 1 lớp được seed ra!",
        room: "310",
        moduleId: 1, createdAt: date, updatedAt: date,
        roles: JSON.stringify(roles)
      },
      {
        id: 'testidclass28347khsjdfh29834f4',
        className: "Class 3",
        lecturerId: 2,
        description: "Đây là 1 lớp được seed ra!",
        room: "310",
        moduleId: 1, createdAt: date, updatedAt: date,
        roles: JSON.stringify(roles)
      },
      {
        id: 'testidclass28347khsjdfh29834f5',
        className: "Class 4",
        lecturerId: 2,
        description: "Đây là 1 lớp được seed ra!",
        room: "310",
        moduleId: 1, createdAt: date, updatedAt: date,
        roles: JSON.stringify(roles)
      },
      {
        id: 'testidclass28347khsjdfh29834f6',
        className: "Class 5",
        lecturerId: 2,
        description: "Đây là 1 lớp được seed ra!",
        room: "310",
        moduleId: 1, createdAt: date, updatedAt: date,
        roles: JSON.stringify(roles)
      },
      {
        id: 'testidclass28347khsjdfh29834f7',
        className: "Class 6",
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
