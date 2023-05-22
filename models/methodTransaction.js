import { DataTypes } from "sequelize";
import db from "../config/database.js";

const MethodTransaction = db.define(
  "MethodTransaction",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type_transaction: {
      type: DataTypes.STRING,
      defaultValue: "Transfer",
    },
    bank: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name_bank: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    no_rek: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_Active: {
      type: DataTypes.STRING,
      defaultValue: "0",
    },
  },
  {
    freezeTableName: true,
  }
);

export default MethodTransaction;

(async () => {
  await MethodTransaction.sync({ alter: true }).then(() => {
    console.log("Method Transaction Database  & tables created!");
  });
})();
