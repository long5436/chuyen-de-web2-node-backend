import mysql from 'mysql2';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('test-be', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

(async function () {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default sequelize;
