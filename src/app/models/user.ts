import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

const User = sequelize.define(
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
    force: true,
  }
);

console.log(User === sequelize.models.User);

export default new User();

// const data = {
//   firstName: 'Long',
//   lastName: 'nguyen',
// };

// (async () => {
//   await User.sync({ alter: true });
//   await User.create(data);
// })();
