const { DataTypes } = require("sequelize");
const db = require("../config/database.js");
const Order = require("./order.js");
const Users = require("./user.js");

const TeknisiPengujian = db.define(
  "TeknisiPengujian",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.UUID,
      references: {
        model: Users,
        key: "id",
      },
    },
    orderId: {
      type: DataTypes.UUID,
      references: {
        model: Order,
        key: "id",
      },
    },
    status_task: {
      type: DataTypes.STRING(5),
      defaultValue: "0", // if 0 = Belum Dikerjakan, if 1 = Sedang Dikerjakan, if 2 = Selesai Dikerjakan
    },
    status_pengerjaan: {
      type: DataTypes.STRING(5),
      defaultValue: "0", // if 0 = Belum Dikerjakan TEKNISI, if 1 = Sedang Dikerjakan, if 2 = Uploaded file PDF, if = 3 = Selesai Kirim ke Manager
    },
    status_penugasan: {
      type: DataTypes.STRING(5),
      defaultValue: "0", // 0 = On-going, 1 = StandBy
    },
    file_task_pengujian: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Users.hasMany(TeknisiPengujian);
TeknisiPengujian.belongsTo(Users, { as: "teknisi", foreignKey: "UserId" });

Order.hasMany(TeknisiPengujian);
TeknisiPengujian.belongsTo(Order);

module.exports = TeknisiPengujian;

(async () => {
  await TeknisiPengujian.sync({ alter: true }).then(() => {
    console.log("TeknisiPengujian Database  & tables created!");
  });
})();
