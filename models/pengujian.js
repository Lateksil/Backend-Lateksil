import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Pengujian = db.define(
  "Pengujian",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    jenis_pengujian: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    min_quantity: {
      type: DataTypes.STRING,
      defaultValue: "1",
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tempat_pengujian: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sampler: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    catatan_khusus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Pengujian;

(async () => {
  await Pengujian.sync({ alter: true }).then(() => {
    console.log("Pengujian Database  & tables created!");
  });
})();
