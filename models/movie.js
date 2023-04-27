import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Movie = db.define("Movie", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name_Movie: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


export default Movie;

(async () => {
  await Movie.sync({ alter: true }).then(() => {
    console.log("Movie Database  & tables created!");
  });
})();
