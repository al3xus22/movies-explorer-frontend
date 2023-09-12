import React from "react";
import "./movies-card-list.css";
import { useLocation } from "react-router-dom";
import MoviesCard from "../movies-card/movies-card";
import MoreMovies from "../more-movies/more-movies";

function MoviesCardList({ movies, loadMore, isAllMoviesDisplayed, savedMovies, handleSaveMovie }) {
  const location = useLocation();

  return (
    <>
      <ul className="movies-card-list">
        {location.pathname === "/movies" ? (
          movies.map((movie) => (
            <MoviesCard key={movie._id} movie={movie} handleSaveMovie={handleSaveMovie}/>
          ))
        ) : (
          savedMovies.map((movie) => (
            <MoviesCard key={movie._id} movie={movie}/>
          ))
        )}
      </ul>
      {location.pathname === "/movies" && !isAllMoviesDisplayed && <MoreMovies loadMore={loadMore}/>}
    </>
  )
}

export default MoviesCardList;