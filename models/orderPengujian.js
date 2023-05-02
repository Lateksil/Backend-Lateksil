import { DataTypes } from "sequelize";
import db from "../config/database.js";
import Item from "./itemOrder.js";
import Order from "./order.js";

const OrderPengujian = db.define(
  "OrderPengujian",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.UUID,
      references: {
        model: Order,
        key: "id",
      },
    },
    itemOrderId: {
      type: DataTypes.UUID,
      references: {
        model: Item,
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Item.belongsToMany(Order, { through: "OrderPengujian" });
Order.belongsToMany(Item, { through: "OrderPengujian" });

export default OrderPengujian;

(async () => {
  await OrderPengujian.sync({ alter: true }).then(() => {
    console.log("Order_Pengujian Database  & tables created!");
  });
})();
