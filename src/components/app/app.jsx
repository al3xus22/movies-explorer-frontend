import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
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

function App() {

  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);

  function handleLogin() {
    setLoggedIn(!loggedIn);
  }

  return (
    <div className="Root">
      <div className="App">
        {["/", "/movies", "/saved-movies", "/profile"].includes(location.pathname) && <Header loggedIn={loggedIn}/>}
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/movies" element={<Movies/>}/>
          <Route path="/saved-movies" element={<SavedMovies/>}/>
          <Route path="/profile" element={<Profile handleLogin={handleLogin}/>}/>
          <Route path="/signin" element={<Login handleLogin={handleLogin}/>}/>
          <Route path="/signup" element={<Register/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
        {["/", "/movies", "/saved-movies"].includes(location.pathname) && <Footer/>}
      </div>
    </div>
  );
}

export default App;
