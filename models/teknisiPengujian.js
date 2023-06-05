import { DataTypes } from "sequelize";
import db from "../config/database.js";
import Order from "./order.js";
import Users from "./user.js";

const TeknisiPengujian = db.define(
  "TeknisiPengujian",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.UUID,
      references: {
        model: Users,
        key: "id",
      },
    },
    orderId: {
      type: DataTypes.UUID,
      references: {
        model: Order,
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Users.hasMany(TeknisiPengujian);
TeknisiPengujian.belongsTo(Users, { as: "teknisi", foreignKey: "UserId" });

Order.hasMany(TeknisiPengujian);
TeknisiPengujian.belongsTo(Order);

export default TeknisiPengujian;

(async () => {
  await TeknisiPengujian.sync({ alter: true }).then(() => {
    console.log("TeknisiPengujian Database  & tables created!");
  });
})();
