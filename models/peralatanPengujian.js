import { DataTypes } from "sequelize";
import db from "../config/database.js";

const PeralatanPengujian = db.define(
  "PeralatanPengujian",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    status_peralatan: {
      type: DataTypes.STRING,
      defaultValue: "0", // if 0 = Belum diambil Alatnya, if 1 = Sedang diambil, if 2 = Selesai diambil
    },
    image_pengajuan_alat: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    catatan_khusus: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default PeralatanPengujian;

(async () => {
  await PeralatanPengujian.sync({ alter: true }).then(() => {
    console.log("PeralatanPengujian Database  & tables created!");
  });
})();
