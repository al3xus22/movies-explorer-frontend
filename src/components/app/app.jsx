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
import { MOVIE_URL } from "../../utils/constants";

function App() {
  const login = localStorage.getItem("login");                                     //Извлекаем из хранилища для определения залогиненности

  //Стейты для пользователя
  const [currentUser, setCurrentUser] = useState({ email: "", name: "" });    //Хранение данных текущего пользователя
  const [loggedIn, setLoggedIn] = useState(login);                                      //Залогинен пользователь или нет
  const [errorRes, setErrorRes] = useState("");                               //Ошибки с сервера
  const [serverRes, setServerRes] = useState("");                             //Успешный ответ с сервера
  const [editFormActive, setEditFormActive] = useState(false);                //Активировать инпуты редактирования профиля(кнопка редактировать/сохранить)
  const [isUserInfoChanged, setIsUserInfoChanged] = useState(false);          //Если данные в инпутах отличаются (при обновлении пользователя)
  const [isLoading, setIsLoading] = useState(false);                          //Ожидание ответа с сервера (загрузка фильмов, прелоадер)
  //Стейты для фильмов
  const [movies, setMovies] = useState([]);                                   //все фильмы
  const [query, setQuery] = useState("");                                     //значение в поисковой строке
  const [searched, setSearched] = useState(false);                            //Если ничего не найдено в поиске
  const [savedMovies, setSavedMovies] = useState([]);                         //Сохраненные фильмы

  const location = useLocation();
  const navigate = useNavigate();

  //Регистрация, аутентификация, редактирование профиля и выход пользователя-----------------------------------
  //Регистрация
  const registerUser = ({ name, email, password }) => {
    MainApi.register({ name, email, password })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Ошибка: ${res.status}`);
        }
        return MainApi.authorize({ email, password });
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
      .then(({ user }) => {
        localStorage.setItem("userId", user._id);
        setLoggedIn(true);
        setCurrentUser(user);
        navigate("/movies", { replace: true });
      })
      .catch((error) => {
        if (error === "Ошибка: 409") {
          setErrorRes("Пользователь с таким email уже существует");
        } else if (error === "Ошибка: 400") {
          setErrorRes("При регистрации пользователя произошла ошибка.");
        } else {
          setErrorRes("На сервере произошла ошибка.");
        }
      });
  };

  //Аутентификация
  const handleLogin = (formData) => {
    const { email, password } = formData;
    MainApi.authorize({ email, password })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .then(({ user }) => {
        localStorage.setItem("login", true);
        setLoggedIn(true);
        navigate("/movies", { replace: true });
        setCurrentUser(user);
      })
      .catch((err) => {
        let errorResMessage = "На сервере произошла ошибка.";
        if (err ==="Ошибка: 401") {
          errorResMessage = "Вы ввели неправильный логин или пароль.";
        } else if (err === "Ошибка: 400") {
          errorResMessage = "При авторизации произошла ошибка. Токен не передан или передан не в том формате.";
        } else if (err === "Ошибка: 403") {
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
        if (error === "Ошибка: 409") {
          setErrorRes("Пользователь с таким email уже существует");
        } else if (error ==="Ошибка: 400") {
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
        setQuery("");
        setMovies([]);
        setSearched(false);
        localStorage.clear();
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (login) {
      Promise.all([MainApi.getUserInfo(), MainApi.getSavedMovies()])
        .then(([userRes, savedMoviesRes]) => {
          if (userRes.ok && savedMoviesRes.ok) {
            return Promise.all([userRes.json(), savedMoviesRes.json()]);
          } else {
            return Promise.reject(`Ошибка: ${userRes.status}, ${savedMoviesRes.status}`);
          }
        })
        .then(([user, savedMovies]) => {
          setCurrentUser(user);
          setSavedMovies(savedMovies);
          setLoggedIn(true);
        })
        .catch((err) => {
          if (err === "Ошибка: 401") {
            setLoggedIn(false);
            localStorage.clear();
            return;
          }
          console.log(err)
        });
    }
  }, [login]);

//Поиск, добавление, удаления фильмов-------------------------------------------------------------------------
  //Сохранение фильма (лайк)
  function handleSaveMovie(movie) {
    const movieData = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `${MOVIE_URL}${movie.image.url}`,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: `${MOVIE_URL}${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
    };
    MainApi.saveMovies(movieData)
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .then((saveMovies) => {
        setSavedMovies((prevSavedMovies) => [...prevSavedMovies, saveMovies]);
      })
      .catch((error) => {
        setErrorRes("Ошибка при сохранении фильма")
        console.log(error)
      })
  }

  //Удаление фильма из сохраненных
  function handleDeleteMovie(movie) {
    const movieId = savedMovies.find(savedMovie => savedMovie.movieId === movie.id);
    if (currentUser._id !== movie.owner) {
      setErrorRes("Вы не можете удалить чужую карточку");
      return;
    }
    MainApi.deleteMovies(movie._id || movieId._id)
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .then((res) => {
        setSavedMovies((presSavedMovies) => presSavedMovies.filter((savedMovie) => savedMovie._id !== res._id))
      })
      .catch((error) => {
        if (error === "Ошибка: 401") {
          setErrorRes("Вы не можете удалить фильм. Вы не авторизованы");
        }
        console.log(error)
      })
  }

  //Получение всех фильмов
  useEffect(() => {
    if (query && movies.length === 0) {
      setIsLoading(true);
      moviesApi.getMovies()
        .then((movies) => {
          setMovies(movies);
        })
        .catch((err) => {
          if (err === "Ошибка: 401") {
            setLoggedIn(false);
            localStorage.clear();
            return;
          }
          setErrorRes("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз");
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        })
    }
  }, [query, movies]);

  useEffect(() => {
    //Сбрасываем ошибки при переходах по роутам
    setErrorRes("");
    setEditFormActive(false);
    setServerRes("");
  }, [location]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="Root">
        <div className="App">
          {["/", "/movies", "/saved-movies", "/profile"].includes(location.pathname) && <Header loggedIn={loggedIn}/>}
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/movies" element={
              <ProtectedRoute loggedIn={loggedIn} element={Movies}
                              movies={movies} savedMovies={savedMovies}
                              isLoading={isLoading} query={query} setQuery={setQuery}
                              setSearched={setSearched} searched={searched} errorRes={errorRes}
                              handleSaveMovie={handleSaveMovie} deleteMovie={handleDeleteMovie}/>
            }/>
            <Route path="/saved-movies" element={
              <ProtectedRoute loggedIn={loggedIn} element={SavedMovies} query={query} setQuery={setQuery}
                              savedMovies={savedMovies} handleSaveMovie={handleSaveMovie}
                              deleteMovie={handleDeleteMovie} searched={searched} setSearched={setSearched}
                              errorRes={errorRes} setErrorRes={setErrorRes}/>
            }/>
            <Route path="/profile" element={
              <ProtectedRoute loggedIn={loggedIn} element={Profile}
                              signOut={handleSignOut} handleUpdateUser={handleUpdateUser}
                              updateError={errorRes} setUpdateError={setErrorRes}
                              setEditFormActive={setEditFormActive} editFormActive={editFormActive}
                              setIsUserInfoChanged={setIsUserInfoChanged} isUserInfoChanged={isUserInfoChanged}
                              serverRes={serverRes} setServerRes={setServerRes}/>
            }/>
            <Route path="/signin"
                   element={loggedIn ? <Navigate to="/"/> :
                     <Login onLogin={handleLogin} authError={errorRes} setAuthError={setErrorRes} setQuery={setQuery} setMovies={setMovies}/>}/>
            <Route path="/signup"
                   element={loggedIn ? <Navigate to="/"/> : <Register register={registerUser} authError={errorRes} setQuery={setQuery} setMovies={setMovies}/>}/>
            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
          {["/", "/movies", "/saved-movies"].includes(location.pathname) && <Footer/>}
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
