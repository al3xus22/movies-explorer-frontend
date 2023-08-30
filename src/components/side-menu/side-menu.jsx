import React from "react";
import "./side-menu.css";
import Navigation from "../navigation/navigation";
import ProfileButton from "../profile-button/profile-button";
import { Link } from "react-router-dom";

function SideMenu(props) {

  return (
    <div className={`side-menu ${props.isOpen ? "side-menu_opened" : ""}`}>
      <div className="side-menu__content">
        <button type="button" className="side-menu_close-button hover-effect button-effect"
                onClick={props.handleCloseSideMenu}></button>
          <Navigation handleCloseSideMenu={props.handleCloseSideMenu}/>
        <Link to="/profile" onClick={props.handleCloseSideMenu}>
          <ProfileButton/>
        </Link>
      </div>
    </div>
  )
}

export default SideMenu;