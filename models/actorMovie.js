import { DataTypes } from "sequelize";
import db from "../config/database.js";
import Actor from "./actor.js";
import Movie from "./movie.js";

const ActorMovies = db.define(
  "ActorMovies",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    ActorId: {
      type: DataTypes.UUID,
      references: {
        model: Actor,
        key: 'id',
      },
  
    },
    MovieId: {
        type: DataTypes.UUID,
        references: {
          model: Movie,
          key: 'id',
        },
      },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Actor.belongsToMany(Movie, { through: 'ActorMovies' });
Movie.belongsToMany(Actor, { through: 'ActorMovies' });

export default ActorMovies;

(async () => {
  await ActorMovies.sync({ alter: true }).then(() => {
    console.log("ActorMovie Database  & tables created!");
  });
})();
