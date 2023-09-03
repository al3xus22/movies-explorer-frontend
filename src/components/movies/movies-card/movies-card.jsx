import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./movies-card.css";

function MoviesCard(props) {
  const movie = props.movie;
  const location = useLocation();
  const [isLiked, setIsLiked] = useState(false);

  function handleLike() {
    setIsLiked(!isLiked);
  }

  return (
    <li className="movies-card hover-effect button-effect">
      <img src={movie.image} alt="Постер фильма" className="movies-card__image"/>
      <div className="movies-card__content">
        <h2 className="movies-card__title">{movie.title}</h2>
        {location.pathname === "/movies" && <button
          className={`movies-card__like-button ${isLiked ? " movies-card__like-button_active" : ""} hover-effect button-effect`}
          onClick={handleLike}></button>}
        {location.pathname === "/saved-movies" && <button
          className="movies-card__like-button movies-card__like-button_delete hover-effect button-effect"></button>}
      </div>
      <p className="movies-card__duration">{movie.duration}</p>
    </li>
  )
}

export default MoviesCard;