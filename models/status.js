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
    is_send_manager: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_send_costumer: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
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
