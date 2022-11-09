import dotenv from 'dotenv';
import mysql from 'mysql2';
import { Sequelize } from 'sequelize';

// load config env
dotenv.config();

const db: Sequelize = new Sequelize(
  process.env.DB_NAME || '',
  process.env.DB_USERNAME || '',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.HOST || '',
    dialect: 'mysql',
  }
);

const connect = async () => {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
export { db, connect };
