'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('leagues', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      id_leagues: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_country: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      leagues_name: {
        type: Sequelize.STRING,
      },
      image_url: {
        type: Sequelize.STRING,
      },
      current_season_id: {
        type: Sequelize.INTEGER,
      },
      current_round_id: {
        type: Sequelize.INTEGER,
      },
      current_stage_id: {
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('leagues');
  },
};
