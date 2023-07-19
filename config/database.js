import { Sequelize } from "sequelize";
import dotenv from "dotenv";
// import { caFilePosgreSql } from "./ca/caFilePosgreSql.js";
import { caFile } from "./ca/caFileMysql.js";
dotenv.config();



//DATABASES MYSQL
// const db = new Sequelize("defaultdb", "avnadmin", "AVNS_Omj_1rvTFnEZZC01Jkw", {
//   host: "mysql-3b9780f3-excercise-depdep.aivencloud.com",
//   port: 11847,
//   dialect: "mysql",
//   dialectOptions: {
//     ssl: {
//       require: true,
//       ca: caFile, // Menyertakan CA Certificate
//     },
//   },
//   isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
// });

// const db = new Sequelize("defaultdb", "avnadmin", "AVNS_fVl8wh5GAtU4zKX1HmW", {
//   host: "pg-1a77a5a3-excercise-depdep.aivencloud.com",
//   port: 11847,
//   dialect: "postgres",
//   dialectOptions: {
//     ssl: {
//       require: true,
//       ca: caFilePosgreSql, // Menyertakan CA Certificate
//     },
//   },
//   pool: {
//     max: 20, // Batas koneksi maksimum
//     min: 0,  // Jumlah minimum koneksi yang tetap terbuka
//     acquire: 300000, // Waktu maksimum yang diperbolehkan untuk memperoleh koneksi (dalam milidetik)
//     idle: 100000 // Waktu maksimum yang diperbolehkan untuk koneksi yang tidak digunakan (dalam milidetik)
//   }
// });

// DATABASES LOCAL POSGRESQL
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

//DATABASES LOCAL MYSQL
// const db = new Sequelize("lateksil_db", "root", "", {
//   host: "localhost",
//   port: 3306,
//   dialect: "mysql",
//   isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
// });

export default db;
