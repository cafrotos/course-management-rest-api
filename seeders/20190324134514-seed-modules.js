'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let date = new Date();
    return await queryInterface.bulkInsert('modules', [
      { moduleName: 'Toán', credit: 3, createdAt: date, updatedAt: date },
      { moduleName: 'Vật lý', credit: 3, createdAt: date, updatedAt: date },
      { moduleName: 'Hóa học', credit: 3, createdAt: date, updatedAt: date },
      { moduleName: 'Ngữ văn', credit: 3, createdAt: date, updatedAt: date},
      { moduleName: 'Tiếng anh', credit: 3, createdAt: date, updatedAt: date},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('modules', null, {});
  }
};