import { DataTypes } from "sequelize";
import db from "../config/database.js";
import Pengujian from "./pengujian.js";
import Users from "./user.js";

const Item = db.define(
  "itemOrder",
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
  },
  {
    timestamps: false,
  }
);

Users.hasMany(Item);
Item.belongsTo(Users);

Pengujian.hasMany(Item);
Item.belongsTo(Pengujian);

export default Item;

(async () => {
  await Item.sync({ alter: true }).then(() => {
    console.log("Item Order Database  & tables created!");
  });
})();
