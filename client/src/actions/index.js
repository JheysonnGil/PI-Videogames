import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const FILTER_BY_CREATED = "FILTER_BY_CREATED";
export const ORDER_ALPHABETIC = "ORDER_ALPHABETIC";
export const ORDER_RATING = "ORDER_RATING";
export const NAME_BY_QUERY = "NAME_BY_QUERY";
export const DETAIL_VIDEOGAME = "DETAIL_VIDEOGAME";
export const GET_GENRES = "GET_GENRES";
export const POST_GAME = "POST_GAME";

export function getVideogames() {
  return async function (dispatch) {
    var videogames = await axios.get(`http://localhost:3001/videogames`);
    return dispatch({
      type: GET_VIDEOGAMES,
      payload: videogames.data,
    });
  };
}

export function getGenres() {
  return async function (dispatch) {
    var genres = await axios.get(`http://localhost:3001/genres`, {});
    return dispatch({ type: GET_GENRES, payload: genres.data });
  };
}

export const getNameVideogames = (name) => {
  return async function (dispatch) {
    try {
      const allNames = await axios.get(
        `http://localhost:3001/videogames?name=${name}`
      );
      return dispatch({
        type: NAME_BY_QUERY,
        payload: allNames.data,
      });
    } catch (e) {
      console.log(e);
      alert("No results were found");
    }
  };
};

export function detailPerVg(id) {
  return async (dispatch) => {
    try {
      const detailCard = await axios.get(
        `http://localhost:3001/videogames/${id}`
      );
      return dispatch({
        type: DETAIL_VIDEOGAME,
        payload: detailCard.data,
      });
    } catch (e) {
      console.log(e);
      alert("No results were found");
    }
  };
}

export function filterVideogamesByGenre(payload) {
  return {
    type: FILTER_BY_GENRE,
    payload,
  };
}

export function filterVideogamesByCreated(payload) {
  return {
    type: FILTER_BY_CREATED,
    payload,
  };
}

export function orderAlphabetic(payload) {
  return {
    type: ORDER_ALPHABETIC,
    payload,
  };
}

export function orderRating(payload) {
  return {
    type: ORDER_RATING,
    payload,
  };
}

export function postGame(payload) {
  return async function (dispatch) {
    const create = await axios.post(`http://localhost:3001/videogame`, payload);
    return create;
  };
}
