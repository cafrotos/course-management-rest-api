'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('exercises', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      classId: {
        type: Sequelize.STRING
      },
      postBy: {
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.STRING
      },
      attachmentBatchId: {
        type: Sequelize.STRING
      },
      point: {
        type: Sequelize.SMALLINT
      },
      startedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      exprisedAt: {
        allowNull: false,
        type: Sequelize.DATE
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
    return queryInterface.dropTable('exercises');
  }
};