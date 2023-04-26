import { DataTypes } from "sequelize";
import db from "../config/database.js";
import Order from "./order.js";
import Pengujian from "./pengujian.js";

const OrderPengujian = db.define(
  "Order_Pengujian",
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

Pengujian.belongsToMany(Order, { through: OrderPengujian });
Order.belongsToMany(Pengujian, { through: OrderPengujian });

export default OrderPengujian;

(async () => {
  await OrderPengujian.sync({ alter: true }).then(() => {
    console.log("Order_Pengujian Database  & tables created!");
  });
})();
