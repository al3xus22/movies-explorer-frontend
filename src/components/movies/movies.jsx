import React, { useEffect, useState } from "react";
import "./movies.css";
import SearchForm from "./search-form/search-form";
import MoviesCardList from "./movies-card-list/movies-card-list";
import Preloader from "../preloader/peloader";
import { filterMovies, filterShortFilms } from "../../utils/utilties";

let resizeTimer;

function Movies({
                  movies,
                  query,
                  setQuery,
                  isLoading,
                  setSearched,
                  searched,
                  errorRes,
                  handleSaveMovie,
                  deleteMovie,
                  savedMovies,
                }) {

  const queryValue = JSON.parse(localStorage.getItem("query"));
  const setSearchMovieValue = JSON.parse(localStorage.getItem("searchMovies"));

  const [searchMovies, setSearchMovies] = useState(() => {                     //фильмы по поиску
    const saveState = localStorage.getItem("isShortFilm");
    return saveState ? JSON.parse(saveState) : [];
  });
  const [showedShortMovies, setShowedShortMovies] = useState([])
  const [displayedMovies, setDisplayedMovies] = useState([]);                //Отображамые фильмы на странице
  const [cardsRow, setCardsRow] = useState(0);                               //Карточек в ряду
  const [showCards, setShowCards] = useState(0);                             //Фильмов на странице изначально
  const [isShortFilm, setIsShortFilm] = useState(() => {                      //чекбокс короткометрражек
    const saveState = localStorage.getItem("isShortFilm");
    return saveState ? JSON.parse(saveState) : false;
  });
  const [errors, setErrors] = useState("");

  const handleInputChange = (e) => {
    const { value } = e.target;
    // setInputValue(value);
    setQuery(value);
    setErrors("");
    setSearched(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query) {
      setErrors("Введите ключевое слово");
      localStorage.removeItem("searchMovies");
      localStorage.removeItem("query");
    } else {
      setErrors("");
      setSearched(true);
    }
  }

  //Отображаемые на странице карточки и данные для кнопки Ещё--------------------------------------------------------
  const isAllMoviesDisplayed = searchMovies.length === displayedMovies.length || movies.length === displayedMovies.length || showedShortMovies.length <= displayedMovies.length;

  //Изменение ширины
  const handleResize = () => {
    if (window.innerWidth >= 1280) {
      setShowCards(16);
      setCardsRow(4);
    } else if (window.innerWidth >= 990) {
      setShowCards(12);
      setCardsRow(3);
    } else if (window.innerWidth >= 768) {
      setShowCards(8);
      setCardsRow(2);
    } else if (320 <= window.innerWidth <= 480) {
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
    if (isShortFilm && searchMovies.length > 0) {
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


  // Поиск фильмов
  useEffect(() => {
    if (movies.length > 0) {
      const filteredMovies = filterMovies(query, movies)
      if (!query) {
        setSearchMovies(movies);
      } else if (filteredMovies.length > 0) {
        setSearchMovies(filteredMovies);
      } else if (query && filteredMovies.length === 0) {
        setSearchMovies([]);
      }
    }
  }, [query, movies]);

  //Установка значения поиска при загрузке----------------------------------------------------------------
  useEffect(() => {
    if (!setSearchMovieValue) {
      return;
    } else {
      setQuery(queryValue);
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


  return (
    <section className="movies">
      <SearchForm isShortFilm={isShortFilm} setIsShortFilm={setIsShortFilm}
                  errors={errors} inputValue={query}
                  handleSubmit={handleSubmit} onInputChange={handleInputChange} errorRes={errorRes}/>
      {isLoading ? (<Preloader/>) : searched && displayedMovies.length === 0 ? (
        <p
          className="movies_not-found-text">{`${errorRes ? errorRes : "Ничего не найдено"}`}</p>) : (displayedMovies.length > 0 &&
        <MoviesCardList
          movies={displayedMovies}
          loadMore={loadMore} isAllMoviesDisplayed={isAllMoviesDisplayed}
          handleSaveMovie={handleSaveMovie} deleteMovie={deleteMovie} savedMovies={savedMovies}/>)}
    </section>
  )
}

export default Movies;