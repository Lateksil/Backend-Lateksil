import { DataTypes } from "sequelize";
import db from "../config/database.js";
import Users from "./user.js";

const Teknisi = db.define(
  "teknisi",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Users.hasOne(Teknisi);
Teknisi.belongsTo(Users);

export default Teknisi;

(async () => {
  await Teknisi.sync({ alter: true }).then(() => {
    console.log("Teknisi Database & tables created!");
  });
})();
