import React, { useState } from "react";
import "./login.css";
import logo from "../../images/header__logo.svg";
import { Link, useNavigate } from "react-router-dom";
import AuthInput from "../auth-input/auth-input";
import { validateEmail, validatePassword } from "../../utils/validation";

function Login(props) {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    })

    const newErrors = {
      ...errors,
      [name]: name === 'email' ? validateEmail(value) : validatePassword(value),
    };

    setErrors(newErrors);

    const hasInputErrors = Object.values(newErrors).some((error) => error !== '');
    if (hasInputErrors) {
      setLoginError('');
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
      props.handleLogin();
      setLoginError("");
      navigate("/", { replace: true });
    } else {
      setLoginError("Вы ввели неправильный логин или пароль")
    }
  };

  return (
    <section className="login">
      <div className="login__content">
        <Link className="login__main-link" to="/">
          <img src={logo} alt="Логотип" className="login__logo link-effect hover-effect"/>
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <form className="login__form" onSubmit={handleSubmit} id="login" noValidate>
            <AuthInput label="E-mail" type="email" value={formData.email} name="email" id="email"
                       onChange={handleInputChange} error={errors.email}/>
            <AuthInput label="Пароль" type="password" value={formData.password} name="password" id="password"
                       onChange={handleInputChange} error={errors.password}/>
          {loginError && <span className="login__input-error login__input-error-text">{loginError}</span>}
          <button type="submit"
                  className="login-button login-button-text login__button-submit hover-effect button-effect">Войти
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