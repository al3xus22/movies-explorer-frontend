import React from "react";
import "./saved-movies.css";
import SearchForm from "../movies/search-form/search-form";
import MoviesCardList from "../movies/movies-card-list/movies-card-list";

function SavedMovies({ savedMovies, handleSaveMovie}) {
  return(
    <section className="saved-movies">
      <SearchForm/>
      <MoviesCardList savedMovies={savedMovies} handleSaveMovie={handleSaveMovie}/>
    </section>
  )
}

export default SavedMovies;