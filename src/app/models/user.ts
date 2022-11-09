import { Sequelize, DataTypes, Model } from 'sequelize';
import { db } from '../config/database';

const User = db.define(
  'User',
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

console.log(User === db.models.User);

export default new User();

// const data = {
//   firstName: 'Long',
//   lastName: 'nguyen',
// };

// (async () => {
//   await User.sync({ alter: true });
//   await User.create(data);
// })();
