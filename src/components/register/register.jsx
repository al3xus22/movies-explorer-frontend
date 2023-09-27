import React, { useEffect, useState } from "react";
import "../login/login.css";
import logo from "../../images/header__logo.svg";
import { Link } from "react-router-dom";
import AuthInput from "../auth-input/auth-input";
import { useFormWithValidation } from "../../utils/validation";

function Register({ register, authError, setQuery, setMovies, disabled }) {

  const [registerError, setRegisterError] = useState("");       //Вывод сообщения об ошибке
  const requiredFields = ["name", "email", "password"];                   //Обязательные поля, для проверки их заполненности
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation({
    name: "",
    email: "",
    password: "",
  })

  const isFormValid = isValid && requiredFields.every((field) => values[field] !== undefined);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      register({ name: values.name, email: values.email, password: values.password });
      setRegisterError("");
      setQuery("");
      setMovies("");
    } else {
      setRegisterError("При регистрации пользователя произошла ошибка.");
    }
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);



  return (<section className="login">
    <div className="login__content">
      <Link className="login__main-link" to="/">
        <img src={logo} alt="Логотип" className="login__logo link-effect hover-effect"/>
      </Link>
      <h1 className="login__title">Добро пожаловать!</h1>
      <form className="login__form" onSubmit={handleSubmit} id="register" noValidate>
        <AuthInput label="Имя" type="text" value={values.name} name="name" id="name" placeholder="Имя"
                   onChange={handleChange} error={errors.name} disabled={disabled}/>
        <AuthInput label="E-mail" type="email" value={values.email} name="email" id="email" placeholder="E-mail"
                   onChange={handleChange} error={errors.email} disabled={disabled}/>
        <AuthInput label="Пароль" type="password" value={values.password} name="password" id="password"
                   placeholder="Пароль"
                   onChange={handleChange} error={errors.password} disabled={disabled}/>
        {(registerError || authError) &&
          <span className="login__input-error login__input-error-text">{registerError || authError}</span>}
        <button type="submit"
                className={`login-button login-button-text login__button-submit ${(!isFormValid || disabled) && "login__button-submit_disabled"} hover-effect button-effect`}
                disabled={disabled || !isFormValid}>Зарегистрироваться
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