import React, { useState } from "react";
import "../login/login.css";
import logo from "../../images/header__logo.svg";
import { Link } from "react-router-dom";
import AuthInput from "../auth-input/auth-input";
import { validateName, validateEmail, validatePassword } from "../../utils/validation";

function Register({ register, authError, setAuthError, setQuery, setMovies, disabled }) {

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });         //Ошибки валидации
  const [registerError, setRegisterError] = useState("");                              //Вывод сообщения об ошибке

  const handleInputChange = (e) => {
    setRegisterError("");
    setAuthError("")
    const { name, value } = e.target;
    setFormData({
      ...formData, [name]: value,
    })

    const newErrors = {
      ...errors, [name]: validateField(name, value),
    };

    setErrors(newErrors);

    const hasInputErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasInputErrors) {
      setRegisterError("");
    }
  }

  const validateField = (name, value) => {
    if (name === "name") {
      return validateName(value);
    }
    if (name === "email") {
      return validateEmail(value);
    }
    if (name === "password") {
      return validatePassword(value);
    }
    return "";
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password)
    };
    setErrors(newErrors);

    const isFormValid = Object.values(newErrors).every((error) => error === "");

    if (isFormValid) {
      setRegisterError("");
      setQuery("");
      setMovies("");
      register({ name: formData.name, email: formData.email, password: formData.password });
    } else {
      setRegisterError("При регистрации пользователя произошла ошибка.")
    }
  };

  const isFormValid = Object.values(errors).every((error) => error === "") && Object.values(formData).every((value) => value !== "");
  return (<section className="login">
    <div className="login__content">
      <Link className="login__main-link" to="/">
        <img src={logo} alt="Логотип" className="login__logo link-effect hover-effect"/>
      </Link>
      <h1 className="login__title">Добро пожаловать!</h1>
      <form className="login__form" onSubmit={handleSubmit} id="register" noValidate>
        <AuthInput label="Имя" type="text" value={formData.name} name="name" id="name" placeholder="Имя"
                   onChange={handleInputChange} error={errors.name} disabled={disabled}/>
        <AuthInput label="E-mail" type="email" value={formData.email} name="email" id="email" placeholder="E-mail"
                   onChange={handleInputChange} error={errors.email} disabled={disabled}/>
        <AuthInput label="Пароль" type="password" value={formData.password} name="password" id="password"
                   placeholder="Пароль"
                   onChange={handleInputChange} error={errors.password} disabled={disabled}/>
        {(registerError || authError) &&
          <span className="login__input-error login__input-error-text">{registerError || authError}</span>}
        <button type="submit"
                className={`login-button login-button-text login__button-submit ${(!isFormValid || disabled) && "login__button-submit_disabled"} hover-effect button-effect`}
                disabled={!isFormValid || disabled}>Зарегистрироваться
        </button>
      </form>
    </div>
    <div className="login__register">
      <p className="login__description">Уже зарегистрированы?</p>
      <Link to="/signin" className="login__register-link hover-effect link-effect">Войти</Link>
    </div>
  </section>)
}

export default Register;