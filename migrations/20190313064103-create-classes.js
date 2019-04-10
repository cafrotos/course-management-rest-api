'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('classes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      className: {
        type: Sequelize.STRING
      },
      classCode: {
        type: Sequelize.STRING
      },
      createBy: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      room: {
        type: Sequelize.STRING
      },
      moduleId: {
        type: Sequelize.INTEGER
      },
      roles: {
        type: Sequelize.JSON,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('classes');
  }
};