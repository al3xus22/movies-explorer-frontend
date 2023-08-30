import React from "react";
import "./profile-input.css";

function ProfileInput(props) {
  return(
    <div className="profile-input">
      <label className="profile-input__label profile-input__label-text" htmlFor={props.id}>{props.label}</label>
      <input type={props.type} className={`profile-input__input profile-input__input-text ${props.error && "profile-input__input-text_error"}`} name={props.name} id={props.id} value={props.value}
             onChange={props.onChange} disabled={!props.editFormActive} maxLength="40"/>
      {props.error && <span className="profile-input__input-error profile-input__input-error-text">{props.error}</span>}
    </div>
  )
}

export default ProfileInput;
