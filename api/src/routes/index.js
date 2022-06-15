const { Router } = require("express");
const axios = require("axios");
const { Videogame, Genre } = require("../db.js");
const { RAWG_API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const DB = async () => {
  const allDb = await Videogame.findAll({ include: Genre });
  const mapDb = await allDb.map((e) => {
    return {
      id: e.id,
      name: e.name,
      released: e.released,
      rating: e.rating,
      platforms: e.platforms,
      genres: e.genres.map((e) => e.name),
      bgd_img: e.background_image,
    };
  });
  return mapDb;
};

const API = async () => {
  const apiUrl = await axios.get(
    `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&page_size=40`
  );
  const apiInfo = await apiUrl.data.results.map((e) => {
    return {
      id: e.id,
      name: e.name,
      released: e.released,
      rating: e.rating,
      platforms: e.platforms.map((e) => e.platform.name),
      genres: e.genres.map((e) => e.name),
      bgd_img: e.background_image,
    };
  });
  return apiInfo;
};

const allVideogames = async () => {
  const dbInfo = await DB();
  const apiInfo = await API();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/videogames", async (req, res) => {
  const { name } = req.query;
  const results = await allVideogames();
  try {
    if (name) {
      let vgName = await results.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      if (vgName.length > 15) {
        const resultDiv = vgName.slice(0, 15);
        res.status(200).send(resultDiv);
      } else {
        vgName.length
          ? res.status(200).send(vgName)
          : res.status(404).send("Videogame Not Found");
      }
    } else {
      res.status(200).send(results);
    }
  } catch (e) {
    res.status(404).send(e);
  }
});

router.get("/videogames/:idVideogame", async (req, res) => {
  const id = req.params.idVideogame;
  const results = await allVideogames();
  try {
    if (id) {
      let idVg = await results.filter((e) => e.id == id);
      idVg.length
        ? res.status(200).json(idVg)
        : res.status(404).send("ID Not Found");
    }
  } catch (e) {
    res.status(404).send(e);
  }
});

router.get("/genres", async (req, res) => {
  const genres = await axios.get(
    `https://api.rawg.io/api/genres?key=${RAWG_API_KEY}`
  );
  const apiGenres = await genres.data.results.map((e) => e.name);

  try {
    apiGenres.forEach((e) => {
      Genre.findOrCreate({
        where: { name: e },
      });
    });
    const allGenres = await Genre.findAll();
    res.status(200).send(allGenres);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.post("/videogame", async (req, res) => {
  const {
    name,
    description,
    released,
    rating,
    platforms,
    createdInDb,
    genres,
    background_image,
  } = req.body;

  try {
    const vgCreated = await Videogame.create({
      name: name,
      description: description,
      released: released,
      rating: rating,
      platforms: platforms,
      createdInDb: createdInDb,
      background_image: background_image,
    });

    let genreDb = await Genre.findAll({
      where: { name: genres },
    });

    vgCreated.addGenre(genreDb);
    res.send("Videogame Created");
  } catch (e) {
    res.status(404).send(e);
  }
});

// router.delete("/delete", async (req, res) => {
//   const { id } = req.body;

//   try {
//     await Videogame.destroy({ Where: { id: id } });
//     res.status(200).send("Videogame deleted");
//   } catch (e) {
//     res.status(404).send(e);
//   }
// });

module.exports = router;
