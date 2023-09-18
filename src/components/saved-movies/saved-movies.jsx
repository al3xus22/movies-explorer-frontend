import React, { useState, useEffect } from "react";
import "./saved-movies.css";
import SearchForm from "../search-form/search-form";
import MoviesCardList from "../movies-card-list/movies-card-list";

function SavedMovies({
                       query,
                       setQuery,
                       savedMovies,
                       handleSaveMovie,
                       deleteMovie,
                       errorRes,
                       setErrorRes,
                       disabled
                     }) {

  //const [inputValue, setInputValue] = useState("");
  const [errors, setErrors] = useState("");
  const [displayMovies, setDisplayMovies] = useState(savedMovies);
  const [isShortFilm, setIsShortFilm] = useState(false);

  //const filterShort = filterShortFilms(savedMovies);    //фильтр короткометражек

  const handleInputChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    setErrors("");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) {
      setErrors("Введите ключевое слово");
    } else {
      setErrors("");
      setErrorRes("");
    }
  }

  const filterMoviesByQuery = (query, movies) => {
    return movies.filter(movie => {
      const nameRU = movie.nameRU || "";
      const nameEn = movie.nameEn || "";

      const isMatch = (!query ||
        nameRU.toLowerCase().includes(query.toLowerCase()) ||
        nameEn.toLowerCase().includes(query.toLowerCase()));

      const isShort = isShortFilm ? movie.duration <= 40 : true;

      return isMatch && isShort;
    });
  };

  //Поиск и обновление фильмов на странице
  useEffect(() => {
    setDisplayMovies(savedMovies);

    const filteredMovies = filterMoviesByQuery(query, savedMovies);

    setDisplayMovies(filteredMovies);
  }, [query, savedMovies, isShortFilm]);

  //Отображаемые фильмы и очистка значения поиска
  useEffect(() => {
    setDisplayMovies(savedMovies);
    setQuery("");
  }, []);

  return (
    <section className="saved-movies">
      <SearchForm isShortFilm={isShortFilm} setIsShortFilm={setIsShortFilm}
                  handleSubmit={handleSubmit} onInputChange={handleInputChange}
                  errors={errors} errorRes={errorRes}/>
      {((query && displayMovies.length === 0) || (!savedMovies.length === 0) || (isShortFilm && displayMovies.length === 0)) ? (
          <p className="movies_not-found-text">{`${errorRes ? errorRes : "Ничего не найдено"}`}</p>) :
        (displayMovies.length > 0 &&
          <MoviesCardList savedMovies={displayMovies} handleSaveMovie={handleSaveMovie} disabled={disabled}
                          deleteMovie={deleteMovie}/>)}
    </section>
  )
}

export default SavedMovies;