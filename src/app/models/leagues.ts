import { Sequelize, DataTypes, Model } from 'sequelize';
import { db } from '../config/database';

const Leagues = db.define(
  'leagues',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    id_leagues: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_country: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    leagues_name: {
      type: DataTypes.STRING,
    },
    image_url: {
      type: DataTypes.STRING,
    },
    current_season_id: {
      type: DataTypes.INTEGER,
    },
    current_round_id: {
      type: DataTypes.INTEGER,
    },
    current_stage_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

export default Leagues;
