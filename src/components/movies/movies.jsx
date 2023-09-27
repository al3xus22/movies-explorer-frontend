import React, { useEffect, useState } from "react";
import "./movies.css";
import SearchForm from "../search-form/search-form";
import MoviesCardList from "../movies-card-list/movies-card-list";
import Preloader from "../preloader/peloader";
import { filterMovies, filterShortFilms } from "../../utils/utilties";
import { DESKTOP_WIDTH, DESKTOP_S_WIDTH, TABLET_WIDTH, MOBILE_WIDTH, MOBILE_S_WIDTH } from "../../utils/constants";

let resizeTimer;

function Movies({
                  movies,
                  query,
                  setQuery,
                  isLoading,
                  errorRes,
                  handleSaveMovie,
                  deleteMovie,
                  savedMovies,
                  disabled
                }) {

  //Получаем из хранилища сохраненнные данные (строка поиска и найденные фильмы)
  const queryValue = JSON.parse(localStorage.getItem("query"));
  const setSearchMoviesValue = JSON.parse(localStorage.getItem("searchMovies"));

  const [searchMovies, setSearchMovies] = useState(setSearchMoviesValue ?    //фильмы по поиску
    setSearchMoviesValue : []);
  const [showedShortMovies, setShowedShortMovies] = useState([])
  const [displayedMovies, setDisplayedMovies] = useState([]);                //Отображамые фильмы на странице
  const [cardsRow, setCardsRow] = useState(0);                               //Карточек в ряду
  const [showCards, setShowCards] = useState(0);                             //Фильмов на странице изначально
  const [isShortFilm, setIsShortFilm] = useState(() => {                     //чекбокс короткометрражек
    const saveState = localStorage.getItem("isShortFilm");
    return saveState ? JSON.parse(saveState) : false;
  });
  const [noResult, setNoResult] = useState("");
  const [errors, setErrors] = useState("");

  //Отображаемые на странице карточки и данные для кнопки Ещё--------------------------------------------------------
  //Все фильмы показаны
  const isAllMoviesDisplayed = searchMovies.length === displayedMovies.length || showedShortMovies.length === displayedMovies.length;
  //Изменение ширины
  const handleResize = () => {
    if (window.innerWidth >= DESKTOP_WIDTH) {
      setShowCards(16);
      setCardsRow(4);
    } else if (window.innerWidth >= DESKTOP_S_WIDTH) {
      setShowCards(12);
      setCardsRow(3);
    } else if (window.innerWidth >= TABLET_WIDTH) {
      setShowCards(8);
      setCardsRow(2);
    } else if (MOBILE_S_WIDTH <= window.innerWidth <= MOBILE_WIDTH) {
      setShowCards(5);
      setCardsRow(2);
    }
  }

  //Загрузить Ещё(кнопка)
  const loadMore = () => {
    const start = displayedMovies.length;
    const end = start + cardsRow;
    //Следующий ряд открываемых карточек
    let nextRow = [];
    //Если есть запрос и найдены фильмы
    if (query && searchMovies.length > 0) {
      nextRow = searchMovies.slice(start, end);
    } else {
      nextRow = movies.slice(start, end);
    }
    setDisplayedMovies([...displayedMovies, ...nextRow]);
  }

  //Отображаемые на странице карточки и данные для кнопки Ещё
  useEffect(() => {
    const handleResizeWithTimeout = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        handleResize();
      }, 800);
    };

    handleResizeWithTimeout();
    if (isShortFilm) {
      // Фильтр короткометражек
      const filteredShortFilms = filterShortFilms(searchMovies);
      setShowedShortMovies(filteredShortFilms);
      setDisplayedMovies(filteredShortFilms.slice(0, showCards));
    } else {
      if (query && searchMovies.length > 0) {
        setDisplayedMovies(searchMovies.slice(0, showCards));
      } else if (query && searchMovies.length === 0) {
        setDisplayedMovies([]);
      } else if (!query) {
        setDisplayedMovies(movies.slice(0, showCards));
      }
    }
    window.addEventListener("resize", handleResizeWithTimeout);
    return () => {
      window.removeEventListener("resize", handleResizeWithTimeout);
    }
  }, [showCards, searchMovies, movies, query, isShortFilm]);


  // Поиск фильмов-----------------------------------------------------------------------------------------
  useEffect(() => {
    if (movies.length > 0) {
      const filteredMovies = filterMovies(query, movies)
      if (filteredMovies.length > 0) {
        setSearchMovies(filteredMovies);
      } else if (query && filteredMovies.length === 0) {
        setSearchMovies([]);
        setNoResult("Ничего не найдено");
      }
    }
  }, [query, movies]);

  //Установка значения поиска при загрузке----------------------------------------------------------------
  useEffect(() => {
    if (!setSearchMoviesValue) {
      return;
    } else {
      setQuery(queryValue);
      setSearchMovies(setSearchMoviesValue);
    }
  }, []);

  // Сохранение состояния чекбокса
  useEffect(() => {
    localStorage.setItem("isShortFilm", JSON.stringify(isShortFilm));
  }, [isShortFilm]);

  // Отслеживание поиска и фильмов (сохранение в хранилище)
  useEffect(() => {
    localStorage.setItem("searchMovies", JSON.stringify(searchMovies));
    localStorage.setItem("query", JSON.stringify(query));
  }, [query, searchMovies]);

  return (<section className="movies">
    <SearchForm isShortFilm={isShortFilm} setIsShortFilm={setIsShortFilm}
                errors={errors} setErrors={setErrors}
                query={query} setQuery={setQuery} errorRes={errorRes}/>
    {isLoading ? (
      <Preloader/>) : ((displayedMovies.length === 0 && movies.length > 0) || (isShortFilm && movies.length === 0)) ? (
      <p
        className="movies_not-found-text">{errorRes ? errorRes : noResult}</p>) : (displayedMovies.length > 0 &&
      <MoviesCardList
        movies={displayedMovies}
        loadMore={loadMore} isAllMoviesDisplayed={isAllMoviesDisplayed} disabled={disabled}
        handleSaveMovie={handleSaveMovie} deleteMovie={deleteMovie} savedMovies={savedMovies}/>)}
  </section>)
}

export default Movies;