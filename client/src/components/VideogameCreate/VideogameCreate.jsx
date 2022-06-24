import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postGame, getGenres } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";
import "./VideogameCreate.css";

export default function VideogameCreate() {
  const dispatch = useDispatch();
  const history = useHistory();

  const allGenres = useSelector((s) => s.genres);
  const Platforms = [
    "PC",
    "PlayStation 5",
    "PlayStation 4",
    "Xbox One",
    "Xbox Series S/X",
    "Nintendo Switch",
    "iOS",
    "Android",
    "Nintendo 3DS",
    "Nintendo DS",
    "Nintendo DSi",
    "macOS",
    "Linux",
    "Xbox 360",
    "Xbox",
    "PlayStation 3",
    "PlayStation 2",
    "PlayStation",
    "PS Vita",
    "PSP",
    "Wii U",
    "Wii",
    "GameCube",
    "Nintendo 64",
    "Game Boy Advance",
    "Game Boy Color",
    "Game Boy",
    "SNES",
    "NES",
    "Classic Macintosh",
    "Apple II",
    "Commodore / Amiga",
    "Atari 7800",
    "Atari 5200",
    "Atari 2600",
    "Atari Flashback",
    "Atari 8-bit",
    "Atari ST",
    "Atari Lynx",
    "Atari XEGS",
    "Genesis",
    "SEGA Saturn",
    "SEGA CD",
    "SEGA 32X",
    "SEGA Master System",
    "Dreamcast",
    "3DO",
    "Jaguar",
    "Game Gear",
    "Neo Geo",
  ];
  const allPlatforms = Platforms.map((p) => ({ name: p }));

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: 1,
    platforms: [],
    genres: [],
    background_image: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelectPlatforms(e) {
    if (input.platforms.includes(e.target.value)) {
      let i = 0;
      for (i = 0; i < input.platforms.length; i++) {
        if (input.platforms[i] === e.target.value) {
          input.platforms.splice(i, 1);
        }
      }
      setInput({
        ...input,
        platforms: input.platforms,
      });
      e.target.value = "strPlatforms";
    } else {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value],
      });
      e.target.value = "strPlatforms";
    }
  }

  function handleSelectGenres(e) {
    if (input.genres.includes(e.target.value)) {
      let i = 0;
      for (i = 0; i < input.genres.length; i++) {
        if (input.genres[i] === e.target.value) {
          input.genres.splice(i, 1);
        }
      }
      setInput({
        ...input,
        genres: input.genres,
      });
      e.target.value = "strGenres";
    } else {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value],
      });
      e.target.value = "strGenres";
    }
  }

  function handleSubmit(e) {
    e.preventDefault(e);
    if (input.name === "") {
      return alert("Required Name");
    } else if (input.description === "") {
      return alert("Required Description");
    } else if (input.released === "") {
      return alert("Required Date Released");
    } else if (input.rating < 1 || input.rating > 5) {
      return alert("Required Rating Betwen 1 - 5");
    } else if (input.genres.length === 0) {
      return alert("Required Som Genre");
    } else if (input.platforms.length === 0) {
      return alert("Required Some Platform");
    } else if (input.background_image === "") {
      return alert("Required Url");
    }
    dispatch(postGame(input));
    alert("Videogame Created!");
    setInput({
      name: "",
      description: "",
      released: "",
      rating: 1,
      platforms: [],
      genres: [],
      background_image: "",
    });
    history.push("/home");
  }

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <div className="createcontain">
      <h1 className="createh1">Add Game!</h1>
      <form>
        <div className="spaceinput">
          <label className="lbls">Name: </label>
          <input
            className="npts"
            placeholder="Name......"
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
          />
          <ul>{input.alreadyname}</ul>
        </div>
        <p></p>
        <div className="spaceinput">
          <label className="lbls">Description: </label>
          <input
            className="npts"
            placeholder="Description......"
            type="textarea"
            rows="4"
            cols="50"
            value={input.description}
            name="description"
            onChange={handleChange}
          />
        </div>
        <p></p>
        <div className="spaceinput">
          <label className="lbls">Released: </label>
          <input
            className="npts"
            placeholder="Released......"
            type="date"
            value={input.released}
            name="released"
            onChange={handleChange}
          />
        </div>
        <p></p>
        <div className="spaceinput">
          <label className="lbls">Rating: </label>
          <input
            className="npts"
            type="number"
            min="1"
            max="5"
            step="0.1"
            value={input.rating}
            name="rating"
            onChange={handleChange}
          />
        </div>
        <p></p>
        <div className="spaceinput">
          <label className="lbls">Genres: </label>
          <select
            className="npts"
            onChange={handleSelectGenres}
            defaultValue="Genres..."
          >
            <option value="strGenres" hidden>
              Genres......
            </option>
            {allGenres?.map((e) => (
              <option value={e.name} key={e.id}>
                {e.name}
              </option>
            ))}
          </select>
          <ul className="orderli">
            {input.genres.map((e) => (
              <li className="instock">{e}</li>
            ))}
          </ul>
        </div>
        <p></p>
        <div className="spaceinput">
          <label className="lbls">Platforms: </label>
          <select className="npts" onChange={handleSelectPlatforms}>
            <option value="strPlatforms" hidden>
              Platforms......
            </option>
            {allPlatforms?.map((e, index) => (
              <option value={e.name} key={index}>
                {e.name}
              </option>
            ))}
          </select>
          <ul className="orderli">{input.platforms.map((e) => <li className="instock">{e}</li>)}</ul>
        </div>
        <p></p>
        <div className="spaceinput">
          <label className="lbls">Image URL:</label>
          <input
            className="npts"
            placeholder="Image URL......"
            type="text"
            value={input.background_image}
            name="background_image"
            onChange={handleChange}
            required
          />
        </div>
        <p></p>
        <button className="backlink" type="submit" onClick={handleSubmit}>
          Create Videogame
        </button>
      </form>
      <Link className="backlink" to="/home">
        Go Back
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </Link>
    </div>
  );
}
