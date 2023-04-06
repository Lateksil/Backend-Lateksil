import { DataTypes } from "sequelize";
import db from "../config/database.js";
import Pengujian from "./pengujian.js";
import Users from "./user.js";

const Order = db.define("order", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  total_price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Users.hasMany(Order);
Order.belongsTo(Users);

Pengujian.hasMany(Order);
Order.belongsTo(Pengujian);

export default Order;

(async () => {
  await Order.sync({ alter: true }).then(() => {
    console.log("Order Database  & tables created!");
  });
})();
