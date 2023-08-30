import React from "react";
import "./movies-card-list.css";
import { useLocation } from "react-router-dom";
import MoviesCard from "../movies-card/movies-card";
import MoreMovies from "../more-movies/more-movies";

function MoviesCardList(props) {
  const location = useLocation();

  return (
    <>
      <ul className="movies-card-list">
        {props.movies.map((movie) => (
          <MoviesCard key={movie.id} movie={movie}/>
        ))}
      </ul>
      {location.pathname === "/movies" && <MoreMovies/>}
    </>
  )
}

export default MoviesCardList;