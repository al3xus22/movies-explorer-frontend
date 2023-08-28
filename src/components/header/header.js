import React, {useState} from "react";
import "./header.css";
import headerLogo from "../../images/header__logo.svg";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../navigation/navigation";
import ProfileButton from "../movies/profile-button/profile-button";
import SideMenu from "../movies/side-menu/side-menu";

function Header() {

  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  function handleBurgerClick() {
    setIsOpen(true);
  }

  function handleCloseSideMenu() {
    setIsOpen(false);
  }

  return (
    <header className={`header ${location.pathname === "/" ? "header__main" : ""}`}>
      <Link className="header__link" to="/">
        <img src={headerLogo} alt="Логотип" className="header__logo link-effect hover-effect"/>
      </Link>
      <div className="header__navigation">
        <Navigation/>
      </div>
      {location.pathname === "/" && <nav className="header__sign-in">
        <Link className="header__sign-in hover-effect link-effect" to="/sign-up">Регистрация</Link>
        <Link className="header__sign-in" to="/sign-in">
          <button type="submit" className="header__sign-in-button hover-effect button-effect">Войти</button>
        </Link>
      </nav>}
      <Link className="header__profile" to="/profile">
        <ProfileButton/>
      </Link>
      <button type="button" className={`header__burger-button ${location.pathname === "/" ? "header__burger-button_invert" : ""} hover-effect button-effect`} onClick={handleBurgerClick}></button>
      <SideMenu isOpen={isOpen} handleCloseSideMenu={handleCloseSideMenu}/>
    </header>
  );
}

export default Header;