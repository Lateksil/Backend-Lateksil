import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Status = db.define(
  "status",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    status_persetujuan: {
      type: DataTypes.STRING,
      defaultValue: "1",
    },
  },
  {
    freezeTableName: true,
  }
);

export default Status;

(async () => {
  await Status.sync({ alter: true }).then(() => {
    console.log("Status Database  & tables created!");
  });
})();
