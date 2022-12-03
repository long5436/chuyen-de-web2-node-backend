'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Players', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      player_id: {
        type: Sequelize.STRING,
      },
      team_id: {
        type: Sequelize.STRING,
      },
      country_id: {
        type: Sequelize.STRING,
      },
      common_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      display_name: {
        type: Sequelize.STRING,
      },
      birthdate: {
        type: Sequelize.STRING,
      },
      birthcountry: {
        type: Sequelize.STRING,
      },
      image_path: {
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
    await queryInterface.dropTable('Players');
  },
};
