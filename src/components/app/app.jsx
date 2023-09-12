import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/current-user-context";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./app.css";
import Movies from "../movies/movies";
import SavedMovies from "../saved-movies/saved-movies";
import PageNotFound from "../page-not-found/page-not-found";
import Header from "../header/header";
import Footer from "../footer/footer";
import Main from "../main/main";
import Profile from "../profile/profile";
import Login from "../login/login";
import Register from "../register/register";
import { ProtectedRoute } from "../protected-route";
import { moviesApi } from "../../utils/movies-api";
import * as MainApi from "../../utils/main-api";

let resizeTimer;

function App() {

  const location = useLocation();
  const navigate = useNavigate();

  //Стейты для пользователя
  const [currentUser, setCurrentUser] = useState({ email: "", name: "" });    //Хранение данных текущего пользователя
  const [loggedIn, setLoggedIn] = useState(false);                            //Залогинен пользователь или нет
  const [errorRes, setErrorRes] = useState("");                               //Ошибки с сервера
  const [serverRes, setServerRes] = useState("");                             //Успешный ответ с сервера
  const [editFormActive, setEditFormActive] = useState(false);                //Активировать инпуты редактирования профиля(кнопка редактировать/сохранить)
  const [isUserInfoChanged, setIsUserInfoChanged] = useState(false);          //Если данные в инпутах отличаются (при обновлении пользователя)

  const [isLoading, setIsLoading] = useState(false);                          //Ожидание ответа с сервера (загрузка фильмов, прелоадер)

  //Стейты для фильмов
  const [movies, setMovies] = useState([]);                                   //все фильмы
  const [hasFetchedMovies, setHasFetchedMovies] = useState(false);            //Получены ли фильмы с сервера
  const [searchMovies, setSearchMovies] = useState(() => {                    //фильмы по поиску
    const saveState = localStorage.getItem("searchMovies");
    return saveState ? JSON.parse(saveState) : [];
  });
  const [query, setQuery] = useState("");                                     //значение в поисковой строке
  const [isShortFilm, setIsShortFilm] = useState(() => {                      //чекбокс короткометрражек
    const saveState = localStorage.getItem("isShortFilm");
    return saveState ? JSON.parse(saveState) : false;
  });
  const [searched, setSearched] = useState(false);                           //Если ничего не найдено в поиске
  const [displayedMovies, setDisplayedMovies] = useState([]);                //Отображамые фильмы на странице
  const [cardsRow, setCardsRow] = useState(0);                               //Карточек в ряду
  const [showCards, setShowCards] = useState(0);                             //Фильмов на странице изначально
  const [savedMovies, setSavedMovies] = useState([]);                        //Сохраненные фильмы

  //Регистрация, аутентификация, редактирование профиля и выход пользователя-----------------------------------
  //Регистрация
  const registerUser = ({ name, email, password }) => {
    MainApi.register({ name, email, password })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .then(() => {
        MainApi.authorize({ email, password })
          .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
          .then(({ user }) => {
            localStorage.setItem("userId", user._id);
            setLoggedIn(true);
            navigate("/movies", { replace: true });
            setCurrentUser(user);
          })
          .catch((err) => {
            setErrorRes("Ошибка авторизации");
            console.log(err);
          });
      })
      .catch((error) => {
        if (error.includes("Ошибка: 409")) {
          setErrorRes("Пользователь с таким email уже существует");
        } else if (error.includes("Ошибка: 400")) {
          setErrorRes("При регистрации пользователя произошла ошибка.");
        } else {
          setErrorRes("На сервере произошла ошибка.");
        }
      });
  }

  //Аутентификация
  const handleLogin = (formData) => {
    const { email, password } = formData;
    MainApi.authorize({ email, password })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .then(({ user }) => {
        localStorage.setItem("userId", user._id);
        setLoggedIn(true);
        navigate("/movies", { replace: true });
        setCurrentUser(user);
      })
      .catch((err) => {
        let errorResMessage = "На сервере произошла ошибка.";
        if (err.includes("Ошибка: 401")) {
          errorResMessage = "Вы ввели неправильный логин или пароль.";
        } else if (err.includes("Ошибка: 400")) {
          errorResMessage = "При авторизации произошла ошибка. Токен не передан или передан не в том формате.";
        } else if (err.includes("Ошибка: 403")) {
          errorResMessage = "Переданный токен некорректен.";
        }
        setErrorRes(errorResMessage);
        console.log(err);
      })
  }

  //Изменеие (обновление) профиля пользователя
  function handleUpdateUser(newUserData) {
    MainApi.setUserInfo(newUserData)
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .then((data) => {
        setCurrentUser(data);
        setEditFormActive(!editFormActive);
        setIsUserInfoChanged(false);
        setServerRes("Данные успешно обновлены!");
      })
      .catch((error) => {
        if (error.includes("Ошибка: 409")) {
          setErrorRes("Пользователь с таким email уже существует");
        } else if (error.includes("Ошибка: 400")) {
          setErrorRes("При обновлении профиля произошла ошибка");
        } else {
          setErrorRes("На сервере произошла ошибка.");
        }
      });
  }

  //Выход
  const handleSignOut = () => {
    MainApi.signOut()
      .then(() => {
        navigate('/', { replace: true });
        setLoggedIn(false);
        localStorage.clear();
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
      MainApi.getUserInfo()
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
        .then((user) => {
          setCurrentUser(user);
          setLoggedIn(true);
        })
        .catch((err) => console.log(err));
  }, []);

//Поиск, добавление, удаления фильмов-------------------------------------------------------------------------
  //Если все фильмы показаны
  const isAllMoviesDisplayed = searchMovies.length === displayedMovies.length || movies.length === displayedMovies.length;

  //Переключатель короткометражек
  function handleCheckbox() {
    setIsShortFilm(!isShortFilm);
  }

function handleSaveMovie(movie) {
  if (!currentUser) {
    // Добавьте обработку случая, когда currentUser не определен
    console.log("Пользователь не определен");
    return;
  }

  const isLiked = movie.likes?.some((i) => i === currentUser._id);
  MainApi.saveMovies(movie._id, !isLiked)
    .then((response) => {
      const updatedCard = response.data;
      setSavedMovies((state) => state.map((c) => (c._id === updatedCard._id ? updatedCard : c))
      );
    })
    .catch((error) => {
      console.log(error)
    })
}

  //Поиск
  const handleSearch = (query, isShortFilm, movies) => {
    let filtered = movies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(query.toLowerCase()) || movie.nameEN.toLowerCase().includes(query.toLowerCase())
    );

    if (isShortFilm) {                                   //Фильтр короткометражек
      filtered = filtered.filter((movie) =>
        movie.duration <= 40);
    }
    setSearchMovies(filtered);
  }

  //Функция поиска (кнопка Еще и отрисовка фильмов при поске)
  const handleSearchClick = () => {
    handleSearch(query, isShortFilm, movies);
  }

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

  useEffect(() => {
    const savedSearchMovie = localStorage.getItem("searchMovies");
    if (savedSearchMovie) {
      setSearchMovies(JSON.parse(savedSearchMovie));
    }
  }, []);

  //Получение всех фильмов
  useEffect(() => {
    if (query && !hasFetchedMovies) {
      setIsLoading(true);
      moviesApi.getMovies()
        .then((movies) => {
          setMovies(movies);
          setHasFetchedMovies(true);
        })
        .catch((err) => {
          setErrorRes("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз");
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        })
    }
  }, [query, hasFetchedMovies]);

  //Поиск фильмов
  useEffect(() => {
    handleSearch(query, isShortFilm, movies);
  }, [query, isShortFilm, movies]);

  //Отображаемые на странице карточки и данные для кнопки Ещё
  useEffect(() => {
    const handleResizeWithTimeout = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        handleResize();
      }, 800);
    };

    handleResizeWithTimeout();
    if (isShortFilm && !query) {
      // Фильтр короткометражек
      const filteredShortFilms = movies.filter((movie) => movie.duration <= 40);
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

  //Сохранение состояния в хранилище--------------------------------------------------------
  useEffect(() => {
    if (loggedIn)
      localStorage.setItem('isShortFilm', JSON.stringify(isShortFilm));
  }, [loggedIn, isShortFilm]);

  useEffect(() => {
    localStorage.setItem("searchMovies", JSON.stringify(searchMovies));
  }, [searchMovies])

  useEffect(() => {
    localStorage.setItem("loggedIn", loggedIn);
  }, [loggedIn])

  useEffect(() => {
    //Сбрасываем ошибки при переходах по роутам
    setErrorRes("");
    setEditFormActive(false);
    setServerRes("");
  }, [location]);

  console.log(movies);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="Root">
        <div className="App">
          {["/", "/movies", "/saved-movies", "/profile"].includes(location.pathname) && <Header loggedIn={loggedIn}/>}
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/movies" element={
              <ProtectedRoute loggedIn={loggedIn} element={Movies}
                              movies={displayedMovies} setQuery={setQuery} handleCheckbox={handleCheckbox}
                              isShortFilm={isShortFilm} isLoading={isLoading}
                              handleSearch={handleSearchClick} setSearched={setSearched}
                              searched={searched} loadMore={loadMore} isAllMoviesDisplayed={isAllMoviesDisplayed}
                              errorRes={errorRes}/>
            }/>
            <Route path="/saved-movies" element={
              <ProtectedRoute loggedIn={loggedIn} element={SavedMovies} handleSaveMovie={handleSaveMovie} savedMovies={savedMovies}/>
            }/>
            <Route path="/profile" element={
              <ProtectedRoute loggedIn={loggedIn} element={Profile}
                              handleLogin={handleLogin} signOut={handleSignOut} handleUpdateUser={handleUpdateUser}
                              updateError={errorRes} setUpdateError={setErrorRes}
                              setEditFormActive={setEditFormActive} editFormActive={editFormActive}
                              setIsUserInfoChanged={setIsUserInfoChanged} isUserInfoChanged={isUserInfoChanged}
                              serverRes={serverRes}/>
            }/>
            <Route path="/signin"
                   element={loggedIn ? <Navigate to="/"/> :
                     <Login onLogin={handleLogin} authError={errorRes} setAuthError={setErrorRes}/>}/>
            <Route path="/signup"
                   element={loggedIn ? <Navigate to="/"/> : <Register register={registerUser} authError={errorRes}/>}/>
            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
          {["/", "/movies", "/saved-movies"].includes(location.pathname) && <Footer/>}
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
