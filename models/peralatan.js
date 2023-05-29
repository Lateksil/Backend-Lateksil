import { DataTypes } from "sequelize";
import db from "../config/database.js";
import Pengujian from "./pengujian.js";

const Peralatan = db.define(
  "peralatan",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nama_alat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Pengujian.hasMany(Peralatan, { as: "peralatan" });
Peralatan.belongsTo(Pengujian);

export default Peralatan;

(async () => {
  await Peralatan.sync({ alter: true }).then(() => {
    console.log("Peralatan Database & tables created!");
  });
})();
