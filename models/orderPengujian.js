import { DataTypes } from "sequelize";
import db from "../config/database.js";
import Order from "./order.js";
import Pengujian from "./pengujian.js";

const OrderPengujian = db.define(
  "OrderPengujian",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.UUID,
      references: {
        model: Order,
        key: 'id',
      },
    },
    PengujianId: {
        type: DataTypes.UUID,
        references: {
          model: Pengujian,
          key: 'id',
        },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Pengujian.belongsToMany(Order, { through: 'OrderPengujian' });
Order.belongsToMany(Pengujian, { through: 'OrderPengujian' });

export default OrderPengujian;

(async () => {
  await OrderPengujian.sync({ alter: true }).then(() => {
    console.log("Order_Pengujian Database  & tables created!");
  });
})();
