import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Product = db.define("Product", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  jenis_pengujian: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export default Product;

(async () => {
  await Product.sync({ alter: true }).then(() => {
    console.log("Product Database  & tables created!");
  });
})();
