import React, { useState, useEffect } from "react";
import "./saved-movies.css";
import SearchForm from "../search-form/search-form";
import MoviesCardList from "../movies-card-list/movies-card-list";
import { filterMovies, filterShortFilms } from "../../utils/utilties";

function SavedMovies({
                       query,
                       setQuery,
                       savedMovies,
                       handleSaveMovie,
                       deleteMovie,
                       errorRes,
                       disabled
                     }) {

  const [errors, setErrors] = useState("");
  const [displayMovies, setDisplayMovies] = useState(savedMovies);
  const [isShortFilm, setIsShortFilm] = useState(false);

  //Поиск и обновление фильмов на странице
  useEffect(() => {
    const filteredMovies = () => {
      let filterMoviesByQuery;
      filterMoviesByQuery = filterMovies(query, savedMovies);

      if (isShortFilm) {
        filterMoviesByQuery = filterShortFilms(filterMoviesByQuery);
      }
      return filterMoviesByQuery;
    }

    setDisplayMovies(filteredMovies);
  }, [query, savedMovies, isShortFilm]);

  //Очистка значения поиска
  useEffect(() => {
    setQuery("");
  }, []);

  return (
    <section className="saved-movies">
      <SearchForm isShortFilm={isShortFilm} setIsShortFilm={setIsShortFilm}
                  errors={errors} setErrors={setErrors}
                  query={query} setQuery={setQuery}
                  errorRes={errorRes}/>
      {((query && displayMovies.length === 0) || (isShortFilm && displayMovies.length === 0)) ? (
          <p className="movies_not-found-text">{`${errorRes ? errorRes : "Ничего не найдено"}`}</p>) :
        (displayMovies.length > 0 &&
          <MoviesCardList savedMovies={displayMovies} handleSaveMovie={handleSaveMovie} disabled={disabled}
                          deleteMovie={deleteMovie}/>)}
    </section>
  )
}

export default SavedMovies;