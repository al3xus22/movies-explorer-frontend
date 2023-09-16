import React from "react";
import "./movies-card-list.css";
import { useLocation } from "react-router-dom";
import MoviesCard from "../movies-card/movies-card";
import MoreMovies from "../more-movies/more-movies";

function MoviesCardList({ movies, loadMore, isAllMoviesDisplayed, savedMovies, handleSaveMovie, deleteMovie }) {
  const location = useLocation();

  return (
    <>
      <ul className="movies-card-list">
        {location.pathname === "/movies" ? (
          movies.map((movie) => (
            <MoviesCard key={movie.id} movie={movie} handleSaveMovie={handleSaveMovie} deleteMovie={deleteMovie}
                        savedMovies={savedMovies}
                        isLikeMovies={savedMovies.some((savedMovie) => savedMovie.movieId === movie.id)}/>
          ))
        ) : (
          savedMovies.map((movie) => (
            <MoviesCard key={movie._id} movie={movie} deleteMovie={deleteMovie} savedMovies={savedMovies}/>
          ))
        )}
      </ul>
      {location.pathname === "/movies" ? <MoreMovies loadMore={loadMore}/> : ""}
    </>
  )
}

export default MoviesCardList;