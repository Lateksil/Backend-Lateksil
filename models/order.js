import { DataTypes } from "sequelize";
import db from "../config/database.js";

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

export default Order;

(async () => {
  await Order.sync({ alter: true }).then(() => {
    console.log("Order Database  & tables created!");
  });
})();
