import React, { useState } from "react";
import "./header.css";
import headerLogo from "../../images/header__logo.svg";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../navigation/navigation";
import ProfileButton from "../profile-button/profile-button";
import SideMenu from "../side-menu/side-menu";

function Header(props) {

  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  function handleBurgerClick() {
    setIsOpen(true);
  }

  function handleCloseSideMenu() {
    setIsOpen(false);
  }

  return (
    <header className={`header ${location.pathname === "/" ? "header_main" : ""}`}>
      <Link className="header__link" to="/">
        <img src={headerLogo} alt="Логотип" className="header__logo link-effect hover-effect"/>
      </Link>
      {props.loggedIn && <div className="header__navigation">
        <Navigation/>
      </div>}
      {location.pathname === "/" && !props.loggedIn ? (<nav className="header__sign-in">
        <Link className="header__sign-in-link hover-effect link-effect" to="/signup">Регистрация</Link>
        <Link className="header__sign-in-link" to="/signin">
          <button type="submit" className="header__sign-in-button hover-effect button-effect">Войти</button>
        </Link>
      </nav>) : ""}
      {props.loggedIn && <Link className="header__profile" to="/profile">
        <ProfileButton/>
      </Link>}
      {props.loggedIn && <button type="button"
               className={`header__burger-button ${location.pathname === "/" ? "header__burger-button_invert" : ""} hover-effect button-effect`}
               onClick={handleBurgerClick}></button>}
      <SideMenu isOpen={isOpen} handleCloseSideMenu={handleCloseSideMenu}/>
    </header>
  );
}

export default Header;