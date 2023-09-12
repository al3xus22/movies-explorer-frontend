import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./movies-card.css";

function MoviesCard({handleSaveMovie, movie}) {
  const location = useLocation();
  const [isLiked, setIsLiked] = useState(false);

  function handleLike() {
    setIsLiked(!isLiked);
    handleSaveMovie();
  }

  return (
    <li className="movies-card hover-effect button-effect">
      <Link to={movie.trailerLink} target="_blank" className="movies-card__link" rel="noreferrer">
        <img src={`https://api.nomoreparties.co/${movie.image.url}`} alt={`Постер фильма "${movie.nameRU}"`}
             className="movies-card__image"/>
      </Link>
      <div className="movies-card__content">
        <h2 className="movies-card__title">{movie.nameRU}</h2>
        {location.pathname === "/movies" && <button
          className={`movies-card__like-button ${isLiked ? " movies-card__like-button_active" : ""} hover-effect button-effect`}
          onClick={handleLike}></button>}
        {location.pathname === "/saved-movies" && <button
          className="movies-card__like-button movies-card__like-button_delete hover-effect button-effect"></button>}
      </div>
      <p className="movies-card__duration">{`${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`}</p>
    </li>
  )
}

export default MoviesCard;