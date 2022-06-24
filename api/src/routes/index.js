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
      background_image: e.background_image,
      createdInDb: e.createdInDb,
      description: e.description,
    };
  });
  return mapDb;
};

const API = async () => {
  let apiUrlArr = [];

  for (let i = 1; i < 6; i++) {
    let vgPerPg = `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&page=${i}`;
    apiUrlArr.push(vgPerPg);
  }

  const allVgAPI = await Promise.all(
    apiUrlArr.map((v) => axios(v).then((r) => r.data.results))
  );

  const apiUrl = allVgAPI.flat();

  const apiInfo = apiUrl.map((e) => {
    return {
      id: e.id,
      name: e.name,
      released: e.released,
      rating: e.rating,
      platforms: e.platforms.map((e) => e.platform.name),
      genres: e.genres.map((e) => e.name),
      background_image: e.background_image,
      createdInDb: false,
    };
  });
  return apiInfo;
};

const gamesIdApi = async (idApi) => {
  const vgId = await axios(
    `https://api.rawg.io/api/games/${idApi}?key=${RAWG_API_KEY}`
  );
  if (vgId === undefined) {
    throw new Error("Game not found");
  }
  const {
    id,
    name,
    background_image,
    description,
    released,
    rating,
    platforms,
    genres,
  } = vgId.data;
  const resultVideoGame = [];
  resultVideoGame.push({
    id,
    name,
    background_image,
    description,
    released,
    rating,
    platforms: platforms.map((p) => ` ${p.platform.name} `),
    genres: genres.map((g) => g.name),
  });
  return resultVideoGame;
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

router.get("/videogame/:idVideogame", async (req, res) => {
  const id = req.params.idVideogame;
  try {
    if (id.length > 15) {
      const results = await DB();

      let idVg = await results.filter((e) => e.id == id);
      idVg.length
        ? res.status(200).json(idVg)
        : res.status(404).send("ID Not Found");
    } else {
      const fromApi = await gamesIdApi(id);

      res.status(200).json(fromApi);
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

module.exports = router;
