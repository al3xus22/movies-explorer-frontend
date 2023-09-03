import React from "react";
import "./saved-movies.css";
import SearchForm from "../movies/search-form/search-form";
import MoviesCardList from "../movies/movies-card-list/movies-card-list";
import { savedMovies } from "../../utils/config";

function SavedMovies() {
  return(
    <section className="saved-movies">
      <SearchForm/>
      <MoviesCardList movies={savedMovies}/>
    </section>
  )
}

export default SavedMovies;