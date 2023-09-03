import React from 'react';
import { useLocation} from "react-router-dom";
import "./profile-button.css";
import profileLogo from "../../images/profile-button.svg";

function ProfileButton() {

  const location = useLocation();

  return(
    <button type="button"
            className={`profile-button ${location.pathname === "/" ? "profile-button_main" : ""} profile-button_text hover-effect button-effect`}>Аккаунт<img
      src={profileLogo} alt="Профиль" className="profile-button__logo"/>
    </button>
  )
}

export default ProfileButton;