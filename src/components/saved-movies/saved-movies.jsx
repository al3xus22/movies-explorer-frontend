import React, { useState, useEffect } from "react";
import "./saved-movies.css";
import SearchForm from "../movies/search-form/search-form";
import MoviesCardList from "../movies/movies-card-list/movies-card-list";

function SavedMovies({
                       query,
                       setQuery,
                       savedMovies,
                       handleSaveMovie,
                       deleteMovie,
                       handleSearch,
                       searched,
                       setSearched,
                       errorRes,
                       setErrorRes,
                       filterShortFilms
                     }) {

  const [inputValue, setInputValue] = useState("");
  const [errors, setErrors] = useState("");
  const [displayMovies, setDisplayMovies] = useState(savedMovies);
  const [isShortFilm, setIsShortFilm] = useState(false);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value)
    setQuery(value);
    setErrors("");
    setSearched(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) {
      setErrors("Введите ключевое слово");
    } else {
      setErrors("");
      setSearched(true);
      setErrorRes("");
    }
  }

  //Поиск и обновление фильмов на странице
  useEffect(() => {
    setInputValue("");
    setDisplayMovies(savedMovies);

    const filteredMovies = handleSearch(query, savedMovies);

    if (!inputValue) {
      setDisplayMovies(savedMovies);
    } else if (filteredMovies.length > 0) {
      setDisplayMovies(filteredMovies);
    } else if (inputValue && filteredMovies.length === 0) {
      setDisplayMovies([]);
    }
  }, [query, savedMovies]);

  const filterShort = filterShortFilms(displayMovies);    //фильтр короткометражек

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
      {searched && displayMovies.length === 0 ? (
          <p className="movies_not-found-text">{`${errorRes ? errorRes : "Ничего не найдено"}`}</p>) :
        (displayMovies.length > 0 &&
          <MoviesCardList savedMovies={isShortFilm ? filterShort : displayMovies} handleSaveMovie={handleSaveMovie}
                          deleteMovie={deleteMovie}/>)}
    </section>
  )
}

export default SavedMovies;