import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  filterVideogamesByGenre,
  filterVideogamesByCreated,
  orderAlphabetic,
  orderRating,
  getGenres,
} from "../../actions";
import Nav from "../Nav/Nav";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginated from "../Paginated/Paginated";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();

  const allVideogames = useSelector((state) => state.videogames);
  const allGenres = useSelector((state) => state.genres);

  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage] = useState(15);

  const LastVideogame = currentPage * videogamesPerPage;
  const FirstVideogame = LastVideogame - videogamesPerPage;

  const currentVideogames = allVideogames.slice(FirstVideogame, LastVideogame);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
    document.getElementById("Genres").value = "All";
    document.getElementById("Created").value = "Already";
    document.getElementById("OrderAlpha").value = "defa";
    document.getElementById("OrderRating").value = "defa2";
    setCurrentPage(1);
  }

  function handleFilterByGenre(e) {
    e.preventDefault();
    dispatch(filterVideogamesByGenre(e.target.value));
    document.getElementById("Genres").value = "All";
    document.getElementById("Created").value = "Already";
    document.getElementById("OrderAlpha").value = "defa";
    document.getElementById("OrderRating").value = "defa2";
    setCurrentPage(1);
  }

  function handleFilterByCreated(e) {
    e.preventDefault();
    dispatch(filterVideogamesByCreated(e.target.value));
    document.getElementById("Genres").value = "All";
    document.getElementById("Created").value = "Already";
    document.getElementById("OrderAlpha").value = "defa";
    document.getElementById("OrderRating").value = "defa2";
    setCurrentPage(1);
  }

  function handleOrderAlphabetic(e) {
    e.preventDefault();
    dispatch(orderAlphabetic(e.target.value));
    document.getElementById("Genres").value = "All";
    document.getElementById("Created").value = "Already";
    document.getElementById("OrderAlpha").value = "defa";
    document.getElementById("OrderRating").value = "defa2";
    setCurrentPage(1);
  }

  function handleOrderrating(e) {
    e.preventDefault();
    dispatch(orderRating(e.target.value));
    document.getElementById("Genres").value = "All";
    document.getElementById("Created").value = "Already";
    document.getElementById("OrderAlpha").value = "defa";
    document.getElementById("OrderRating").value = "defa2";
    setCurrentPage(1);
  }

  return (
    <div>
      <Nav />
      <div className="space"></div>
      <div className="resetspace">
        <button
          className="btn_reset"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Reset Filters
        </button>
      </div>
      <div>
        <div className="filters">
          <select
            id="Genres"
            className="opc"
            onChange={(e) => handleFilterByGenre(e)}
          >
            <option hidden value="All">
              Genres...
            </option>
            {allGenres.map((e) => (
              <option value={e.name} key={e.id}>
                {e.name}
              </option>
            ))}
          </select>
          <select
            id="Created"
            className="opc"
            onChange={(e) => handleFilterByCreated(e)}
          >
            <option hidden value="Already">
              Create by...
            </option>
            <option value="false">Already Created</option>
            <option value="true">Someone</option>
          </select>
          <select
            id="OrderAlpha"
            className="opc"
            onChange={(e) => handleOrderAlphabetic(e)}
          >
            <option hidden value="defa">
              By Alphabetic...
            </option>
            <option value="alphasc">Ascendent</option>
            <option value="alphadesc">Descendent</option>
          </select>
          <select
            id="OrderRating"
            className="opc"
            onChange={(e) => handleOrderrating(e)}
          >
            <option hidden value="defa2">
              By Rating...
            </option>
            <option value="ratingasc">Ascendent</option>
            <option value="ratingadesc">Descendent</option>
          </select>
        </div>
        <div>
          <Paginated
            videogamesPerPage={videogamesPerPage}
            allVideogames={allVideogames.length}
            paginate={paginate}
          />
        </div>
        {allVideogames.length > 0 ? (
          <div className="Cards">
            {currentVideogames?.map((e, index) => {
              return (
                <div className="cardsunit" key={e.id}>
                  <Link
                    className="link"
                    to={`/game/${e.id}`}
                    key={`videogame-${index}`}
                  >
                    <Card
                      name={e.name}
                      genres={e.genres.map((g) => `${g} `)}
                      rating={e.rating}
                      background_image={
                        e.background_image ? (
                          e.background_image
                        ) : (
                          <img
                            src="https://as1.ftcdn.net/v2/jpg/02/83/48/12/1000_F_283481247_8Xm78gGqEZLUKdD88NfyD3Qo0b3OdQGb.jpg"
                            alt="dfimg"
                          />
                        )
                      }
                      key={e.id}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadhome">
            <div>
              <h3 className="loadinghome">Loading...</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
