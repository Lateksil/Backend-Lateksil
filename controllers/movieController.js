import Actor from "../models/actor.js";
import ActorMovies from "../models/actorMovie.js";
import Movie from "../models/movie.js";
import { handleResponseSuccess } from "../utils/handleResponse.js";

export const CreateActorMovie = async (req, res) => {
  try {

    //ngebuat nama actor dulu
    const actor1 = await Actor.create({
      name_actor: "Depdep",
    });


    // const movie1 = await Movie.create({
    //   name_Movie: "Depdep Movie",
    // });

    // const movie2 = await Movie.create({
    //   name_Movie: "Depdep Movie 2",
    // });

    // const movie3 = await Movie.create({
    //   name_Movie: "Depdep Movie 4",
    // });

    // const movie5 = await Movie.create({
    //   name_Movie: "Depdep Movie 5",
    // });

    // await ActorMovies.create({
    //     ActorId: actor1.id,
    //     MovieId: movie1.id,
    //   });

    // await ActorMovies.create({
    //   ActorId: actor1.id,
    //   MovieId: movie2.id,
    // });

    await ActorMovies.create({
      ActorId: actor1.id, //setelah actor dibuat masukan id nya
      MovieId: '6677c136-0f2c-49e8-88da-375ea606334f',
    });

    return handleResponseSuccess(res, 'Done');
  } catch (error) {
    console.log(error);
  }
};


export const getActorMovie = async (req, res) => {
    try {
  
      const actors = await Actor.findAll({
        include: {
          model: Movie,
        },
        where: {
            id: '424f6328-9c66-495e-879d-c9025f7b085c'
        }
      });
  
      return handleResponseSuccess(res, actors);
    } catch (error) {
      console.log(error);
    }
  };
  