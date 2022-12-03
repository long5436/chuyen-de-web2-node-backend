import { Sequelize, DataTypes, Model } from 'sequelize';
import { db } from '../config/database';

const Teams = db.define(
  'team',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    team_id: {
      type: DataTypes.STRING,
    },
    legacy_id: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    country_id: {
      type: DataTypes.STRING,
    },
    logo_path: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

export default Teams;
