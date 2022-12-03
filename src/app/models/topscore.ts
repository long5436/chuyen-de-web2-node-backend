import { Sequelize, DataTypes, Model } from 'sequelize';
import { db } from '../config/database';

const Topscore = db.define(
  'topscores',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    topscore_name: {
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
    goalscorers: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

export default Topscore;
