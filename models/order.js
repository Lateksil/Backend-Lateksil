import { DataTypes } from "sequelize";
import db from "../config/database.js";
import Payment from "./payment.js";
import PeralatanPengujian from "./peralatanPengujian.js";
import Project from "./project.js";
import Status from "./status.js";
import Users from "./user.js";

const Order = db.define("order", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  total_price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  file_result_pengujian: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});
Users.hasMany(Order);
Order.belongsTo(Users);

Order.hasOne(Status, { as: "status", foreignKey: "id" });
Status.belongsTo(Order, { as: "orders", foreignKey: "id" });

Order.hasOne(Project, { as: "proyek", foreignKey: "id" });
Project.belongsTo(Order, { as: "orders", foreignKey: "id" });

Order.hasOne(Payment, { as: "payment", foreignKey: "id" });
Payment.belongsTo(Order, { as: "orders", foreignKey: "id" });

Order.hasOne(PeralatanPengujian, { as: "status_alat", foreignKey: "id" });
PeralatanPengujian.belongsTo(Order, { as: "orders", foreignKey: "id" });

export default Order;

(async () => {
  await Order.sync({ alter: true }).then(() => {
    console.log("Order Database  & tables created!");
  });
})();
