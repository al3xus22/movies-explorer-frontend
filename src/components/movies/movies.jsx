import React from "react";
import "./movies.css";
import SearchForm from "./search-form/search-form";
import MoviesCardList from "./movies-card-list/movies-card-list";
import Preloader from "../preloader/peloader";

function Movies({ movies, setQuery, handleCheckbox, isShortFilm, isLoading, handleSearch, setSearched, searched, loadMore, isAllMoviesDisplayed, errorRes }) {


  return (
    <section className="movies">
      <SearchForm setQuery={setQuery} handleCheckbox={handleCheckbox} isShortFilm={isShortFilm}
                  handleSearch={handleSearch} setSearched={setSearched}/>
      {isLoading ? (<Preloader/>) : searched && movies.length === 0 ? (
        <p className="movies_not-found-text">{`${errorRes ? errorRes : "Ничего не найдено"}`}</p>) : (movies.length > 0 &&
        <MoviesCardList movies={movies} loadMore={loadMore} isAllMoviesDisplayed={isAllMoviesDisplayed}/>)}
    </section>
  )
}

export default Movies;