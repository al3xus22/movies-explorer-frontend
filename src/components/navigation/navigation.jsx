import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./navigation.css";

function Navigation(props) {

  const location = useLocation();

  return (
    <nav className="navigation">
      <Link to="/"
            className={`navigation__movies navigation__movies-text navigation__hidden-link ${location.pathname === "/" ? "selected" : ""} hover-effect link-effect`}
            onClick={props.handleCloseSideMenu}>Главная</Link>
      <Link
        className={`navigation__movies navigation__movies-text ${location.pathname === "/movies" ? " selected" : ""} ${location.pathname === "/" ? " navigation__movies_main" : ""} hover-effect link-effect`}
        to="/movies" onClick={props.handleCloseSideMenu}>Фильмы</Link>
      <Link
        className={`navigation__movies navigation__movies-text ${location.pathname === "/saved-movies" ? " selected" : ""} ${location.pathname === "/" ? " navigation__movies_main" : ""} hover-effect link-effect`}
        to="/saved-movies" onClick={props.handleCloseSideMenu}>Сохраненные фильмы</Link>
    </nav>
  )
}

export default Navigation;