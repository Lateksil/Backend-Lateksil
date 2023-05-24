import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Payment = db.define(
  "payment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_payment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_kwitansi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Payment;

(async () => {
  await Payment.sync({ alter: true }).then(() => {
    console.log("Payment Database  & tables created!");
  });
})();
