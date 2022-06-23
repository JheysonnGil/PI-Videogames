import {
  GET_VIDEOGAMES,
  FILTER_BY_GENRE,
  FILTER_BY_CREATED,
  ORDER_ALPHABETIC,
  ORDER_RATING,
  NAME_BY_QUERY,
  DETAIL_VIDEOGAME,
  POST_GAME,
  GET_GENRES,
} from "../actions/index";

const initialState = {
  videogames: [],
  allVideogames: [],
  genres: [],
  detail: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        allVideogames: [...action.payload],
        videogames: [...action.payload],
      };

    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    case FILTER_BY_GENRE:
      const genresVideo = [];
      const staticVg = state.allVideogames;

      state.allVideogames.map((v) =>
        v.genres.forEach((g) => {
          if (g === action.payload) genresVideo.push(v);
        })
      );
      if (genresVideo.length === 0 && action.payload !== "All") {
        alert("No results were found");
        return state;
      }
      return {
        ...state,
        videogames: action.payload === "All" ? staticVg : genresVideo,
      };

    case FILTER_BY_CREATED:
      const createdVideo = [];
      const allVg = state.allVideogames;

      state.allVideogames.forEach((v) => {
        let cambio = v.createdInDb ? "true" : "false";
        if (cambio === action.payload) createdVideo.push(v);
      });
      if (createdVideo.length === 0 && action.payload !== "Already") {
        alert("No results were found");
        return state;
      }
      return {
        ...state,
        videogames: action.payload === "Already" ? allVg : createdVideo,
      };

    case ORDER_ALPHABETIC:
      let sortedVideogames = [];

      if (action.payload === "defa") {
        sortedVideogames = [...state.allVideogames];
      } else {
        sortedVideogames =
          action.payload === "alphasc"
            ? state.allVideogames.sort((a, b) => {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
              })
            : state.allVideogames.sort((a, b) => {
                if (a.name > b.name) return -1;
                if (a.name < b.name) return 1;
                return 0;
              });
      }

      return {
        ...state,
        videogames: [...sortedVideogames],
      };

    case ORDER_RATING:
      let ratingVideogames =
        action.payload === "ratingasc"
          ? state.allVideogames.sort((a, b) => {
              if (a.rating > b.rating) return 1;
              if (a.rating < b.rating) return -1;
              return 0;
            })
          : state.allVideogames.sort((a, b) => {
              if (a.rating > b.rating) return -1;
              if (a.rating < b.rating) return 1;
              return 0;
            });
      return {
        ...state,
        videogames: [...ratingVideogames],
      };

    case NAME_BY_QUERY:
      return {
        ...state,
        videogames: action.payload,
      };

    case DETAIL_VIDEOGAME:
      return {
        ...state,
        detail: action.payload,
      };

    case POST_GAME:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default rootReducer;
