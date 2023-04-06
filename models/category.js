import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Category = db.define("Category", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name_category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Product.hasOne(Category, {
//     foreignKey: { type: DataTypes.UUID, allowNull: false },
//   }); 
//   Category.belongsTo(Product);
//   Category.belongsTo(Users);

export default Category;

(async () => {
  await Category.sync({ alter: true }).then(() => {
    console.log("Category Database & tables created!");
  });
})();
