import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Project = db.define("Project", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name_project: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Project;

(async () => {
  await Project.sync({ alter: true }).then(() => {
    console.log("Product Database  & tables created!");
  });
})();
