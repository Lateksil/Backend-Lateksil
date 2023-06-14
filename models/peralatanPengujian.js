// import { DataTypes } from "sequelize";
// import db from "../config/database.js";
// import Order from "./order.js";
// import Users from "./user.js";

// const PeralatanPengujian = db.define(
//   "PeralatanPengujian",
//   {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       primaryKey: true,
//     },
//     orderId: {
//       type: DataTypes.UUID,
//       references: {
//         model: Order,
//         key: "id",
//       },
//     },
//     status: {
//       type: DataTypes.STRING,
//       defaultValue: "0", // if 0 = Belum Dikerjakan TEKNISI, if 1 = Sedang Dikerjakan, if 2 = Uploaded file PDF, if = 3 = Selesai Kirim ke Manager 
//     },
//     file_task_pengujian: {
//       type: DataTypes.STRING,
//       defaultValue: null,
//     },
//     // status_peralatan: {
//     //   type: DataTypes.STRING,
//     //   defaultValue: "0", // if 0 = Belum diambil Alatnya, if 1 = Sedang diambil, if 2 = Selesai diambil
//     // },
//   },
//   {
//     freezeTableName: true,
//     timestamps: false,
//   }
// );

// Order.hasMany(PeralatanPengujian);
// PeralatanPengujian.belongsTo(Order);

// export default PeralatanPengujian;

// (async () => {
//   await PeralatanPengujian.sync({ alter: true }).then(() => {
//     console.log("PeralatanPengujian Database  & tables created!");
//   });
// })();
