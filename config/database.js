const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const db = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: process.env.DABASTE_DIALECT,
  }
);

module.exports = db;
