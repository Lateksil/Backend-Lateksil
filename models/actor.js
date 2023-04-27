import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Actor = db.define("Actor", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name_actor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


export default Actor;

(async () => {
  await Actor.sync({ alter: true }).then(() => {
    console.log("Actor Database  & tables created!");
  });
})();
