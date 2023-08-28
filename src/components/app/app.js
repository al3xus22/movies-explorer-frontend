import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./app.css";
import Header from "../header/header";
import Footer from "../footer/footer";
import Main from "../main/main";

function App() {

  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);

  function handleLogin() {
    setLoggedIn(!loggedIn);
  }

  return (
    <div className="Root">
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/movies" element={<Movies/>}/>
          <Route path="/saved-movies" element={<SavedMovies/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
        {["/", "/movies", "/saved-movies"].includes(location.pathname) && <Footer/>}
      </div>
    </div>
  );
}

export default App;
