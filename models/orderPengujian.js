import { DataTypes } from "sequelize";
import db from "../config/database.js";

const OrderPengujian = db.define(
  "Order_Pengujian",
  {
    quantity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

export default OrderPengujian;

(async () => {
  await OrderPengujian.sync({ alter: true }).then(() => {
    console.log("Order_Pengujian Database  & tables created!");
  });
})();
