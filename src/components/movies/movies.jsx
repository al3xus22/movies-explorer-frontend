import React from "react";
import "./movies.css";
import SearchForm from "./search-form/search-form";
import MoviesCardList from "./movies-card-list/movies-card-list";
import { movies } from "../../utils/config";

function Movies() {
  return (
    <section className="movies">
      <SearchForm/>
      <MoviesCardList movies={movies} />
    </section>
  )
}

export default Movies;