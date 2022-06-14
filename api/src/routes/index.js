const { Router } = require("express");
const axios = require("axios");
const { Videogame, Genre } = require("../db.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const DB = async () => {
  return await Videogame.findAll({
    include: Genre,
  });
};

const API = async () => {
  const apiUrl = await axios.get(
    "https://api.rawg.io/api/games?key=84007a2460d1460eac9f0b7abcc94fc0&page_size=40"
  );
  const apiInfo = await apiUrl.data.results.map((e) => {
    return {
      id: e.id,
      name: e.name,
      released: e.released,
      genres: e.genres,
      rating: e.rating,
      platforms: e.platforms,
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
});

module.exports = router;
