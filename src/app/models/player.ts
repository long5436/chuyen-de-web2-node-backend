import { Sequelize, DataTypes, Model } from 'sequelize';
import { db } from '../config/database';

const Players = db.define(
  'player',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    player_id: {
      type: DataTypes.STRING,
    },
    team_id: {
      type: DataTypes.STRING,
    },
    country_id: {
      type: DataTypes.STRING,
    },
    common_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    display_name: {
      type: DataTypes.STRING,
    },
    birthdate: {
      type: DataTypes.STRING,
    },
    birthcountry: {
      type: DataTypes.STRING,
    },
    image_path: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

export default Players;
