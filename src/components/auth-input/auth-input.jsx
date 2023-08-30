import React from "react";
import "./auth-input.css";

function AuthInput(props) {
  return (
    <div className="auth-input">
      <label className="auth-input__label" htmlFor={props.id}>{props.label}</label>
      <input type={props.type} className={`auth-input__input auth-input__input-text ${props.error && "auth-input__input-text_error"}`} name={props.name} id={props.id} value={props.value}
             onChange={props.onChange} />
      {props.error && <span className="auth-input__input-error auth-input__input-error-text">{props.error}</span>}
    </div>
  )
}

export default AuthInput;