import { Sequelize, DataTypes, Model } from 'sequelize';
import { db } from '../config/database';

const Country = db.define(
  'country',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    id_country: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // primaryKey: true,
    },
    country_name: {
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

export default Country;
