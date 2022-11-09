import { Sequelize, DataTypes, Model } from 'sequelize';
import { db } from '../config/database';

const Country = db.define(
  'Country',
  {
    id_country: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
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

// (async () => {
//   //   await Country.sync({ force: true });
//   await Country.create({
//     force: true,
//     countryName: 'test country',
//   });
// })();
