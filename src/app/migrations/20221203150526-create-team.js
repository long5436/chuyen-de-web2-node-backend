'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Teams', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      team_id: {
        type: Sequelize.STRING,
      },
      legacy_id: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      country_id: {
        type: Sequelize.STRING,
      },
      logo_path: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Teams');
  },
};
