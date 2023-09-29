import React, { useEffect, useState } from "react";
import "./login.css";
import logo from "../../images/header__logo.svg";
import { Link } from "react-router-dom";
import AuthInput from "../auth-input/auth-input";
import { useFormWithValidation } from "../../utils/validation";

function Login({ onLogin, authError, setQuery, setMovies, disabled }) {

  const [loginError, setLoginError] = useState("");                      //Вывод сообщения об ошибке
  const requiredFields = ["email", "password"];                                    //Обязательные поля, для проверки их заполненности

  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation({ email: "", password: "" })

  const isFormValid = isValid && requiredFields.every((field) => values[field] !== undefined);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid) {
      onLogin({
        email: values.email, password: values.password
      });
      setLoginError("");
      setQuery("");
      setMovies("");
    } else {
      setLoginError("Вы ввели неправильный логин или пароль")
    }
  };

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (<section className="login">
    <div className="login__content">
      <Link className="login__main-link" to="/">
        <img src={logo} alt="Логотип" className="login__logo link-effect hover-effect"/>
      </Link>
      <h1 className="login__title">Рады видеть!</h1>
      <form className="login__form" onSubmit={handleSubmit} id="login" noValidate>
        <AuthInput label="E-mail" type="email" value={values.email} name="email" id="email" placeholder="E-mail"
                   onChange={handleChange} error={errors.email} disabled={disabled}/>
        <AuthInput label="Пароль" type="password" value={values.password} name="password" id="password"
                   placeholder="Пароль"
                   onChange={handleChange} error={errors.password} disabled={disabled}/>
        {(loginError || authError) &&
          <span className="login__input-error login__input-error-text">{loginError || authError}</span>}
        <button type="submit"
                className={`login-button login-button-text login__button-submit ${(!isFormValid || disabled) && "login__button-submit_disabled"} hover-effect button-effect`}
                disabled={!isFormValid || disabled}>Войти
        </button>
      </form>
    </div>
    <div className="login__register">
      <p className="login__description">Ещё не зарегистрированы?</p>
      <Link to="/signup" className="login__register-link hover-effect link-effect">Регистрация</Link>
    </div>
  </section>)
}

export default Login;