import { Sequelize, DataTypes, Model } from 'sequelize';
import { db } from '../config/database';

const Player = db.define(
  'players',
  {
    player_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // primaryKey: true,
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // primaryKey: true,
    },
    position_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // primaryKey: true,
    },
    common_name: {
      type: DataTypes.STRING,
    },
    fullname: {
      type: DataTypes.STRING,
    },
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    nationality: {
      type: DataTypes.STRING,
    },
    image_url: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

export default Player;
