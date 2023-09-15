import React, { useState } from "react";
import "./login.css";
import logo from "../../images/header__logo.svg";
import { Link } from "react-router-dom";
import AuthInput from "../auth-input/auth-input";
import { validateEmail, validatePassword } from "../../utils/validation";

function Login({ onLogin, authError, setAuthError, setQuery, setMovies }) {

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });             //Ошибки валидации
  const [loginError, setLoginError] = useState("");                              //Вывод сообщения об ошибке

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAuthError("");
    setFormData({
      ...formData,
      [name]: value,
    })

    const newErrors = {
      ...errors,
      [name]: name === 'email' ? validateEmail(value) : validatePassword(value),
    };

    setErrors(newErrors);

    const hasInputErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasInputErrors) {
      setLoginError("");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password)
    };
    setErrors(newErrors);

    const isFormValid = Object.values(newErrors).every((error) => error === '') && Object.values(formData).every((value) => value !== '');

    if (isFormValid) {
      onLogin({
        email: formData.email,
        password: formData.password
      });
      setLoginError("");
      setQuery("");
      setMovies("");
    } else {
      setLoginError("Вы ввели неправильный логин или пароль")
    }
  };

  const isFormValid = Object.values(errors).every((error) => error === '') && Object.values(formData).every((value) => value !== '');

  return (
    <section className="login">
      <div className="login__content">
        <Link className="login__main-link" to="/">
          <img src={logo} alt="Логотип" className="login__logo link-effect hover-effect"/>
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <form className="login__form" onSubmit={handleSubmit} id="login" noValidate>
          <AuthInput label="E-mail" type="email" value={formData.email} name="email" id="email" placeholder="E-mail"
                     onChange={handleInputChange} error={errors.email}/>
          <AuthInput label="Пароль" type="password" value={formData.password} name="password" id="password"
                     placeholder="Пароль"
                     onChange={handleInputChange} error={errors.password}/>
          {(loginError || authError) && <span className="login__input-error login__input-error-text">{loginError || authError}</span>}
          <button type="submit"
                  className={`login-button login-button-text login__button-submit ${isFormValid ? "" : "login__button-submit_disabled"} hover-effect button-effect`} disabled={!isFormValid}>Войти
          </button>
        </form>
      </div>
      <div className="login__register">
        <p className="login__description">Ещё не зарегистрированы?</p>
        <Link to="/signup" className="login__register-link hover-effect link-effect">Регистрация</Link>
      </div>
    </section>
  )
}

export default Login;