import { DataTypes } from "sequelize";
import db from "../config/database.js";
import Pengujian from "./pengujian.js";
import Users from "./user.js";

const Cart = db.define("cart", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Users.hasMany(Cart);
Cart.belongsTo(Users);

Pengujian.hasMany(Cart);
Cart.belongsTo(Pengujian);

export default Cart;

(async () => {
  await Cart.sync({ alter: true }).then(() => {
    console.log("Cart Database  & tables created!");
  });
})();
