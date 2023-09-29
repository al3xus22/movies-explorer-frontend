import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./movies-card.css";
import { MOVIE_URL } from "../../utils/constants";

function MoviesCard({ handleSaveMovie, movie, deleteMovie, savedMovies, isLikeMovies, disabled }) {
  const location = useLocation();
 const isMovieLiked = savedMovies.some((savedMovie) => savedMovie.movieId === movie.id);
  //const [isLiked, setIsLiked] = useState(isLikeMovies);

  function handleLike() {
    if (!isMovieLiked) {
      return handleSaveMovie(movie);
    }
    return handleDelete(movie);
  }

  function handleDelete() {
    //setIsLiked(false);
    deleteMovie(movie);
  }

  return (<li className="movies-card hover-effect button-effect">
      <Link to={movie.trailerLink} target="_blank" className="movies-card__link" rel="noreferrer">
        <img src={movie.image.url ? `${MOVIE_URL}${movie.image.url}` : movie.image}
             alt={`Постер фильма "${movie.nameRU}"`}
             className="movies-card__image"/>
      </Link>
      <div className="movies-card__content">
        <h2 className="movies-card__title">{movie.nameRU}</h2>
        {location.pathname === "/movies" && <button disabled={disabled}
          className={`movies-card__like-button ${isMovieLiked ? "movies-card__like-button_active" : ""} hover-effect button-effect`}
          onClick={handleLike}></button>}
        {location.pathname === "/saved-movies" && <button disabled={disabled}
          className="movies-card__like-button movies-card__like-button_delete hover-effect button-effect"
          onClick={handleDelete}></button>}
      </div>
      <p className="movies-card__duration">{`${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`}</p>
    </li>)
}

export default MoviesCard;