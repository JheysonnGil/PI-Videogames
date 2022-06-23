import React from "react";
import "./Card.css";

export default function Card({ name, genres, rating, background_image }) {
  return (
    <figure className="card">
      <figcaption>{name}</figcaption>
      <h4>{genres}</h4>
      <h6>Rating: {rating}</h6>
      <img src={background_image} alt="Videogame" width="250" />
    </figure>
  );
}
