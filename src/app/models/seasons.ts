import { Sequelize, DataTypes, Model } from 'sequelize';
import { db } from '../config/database';

const Season = db.define(
  'seasons',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    season_name: {
      type: DataTypes.STRING,
    },
    league_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // primaryKey: true,
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

export default Season;
