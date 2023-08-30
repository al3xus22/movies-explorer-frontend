import React, { useState } from "react";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import { validateEmail, validateName } from "../../utils/validation";
import ProfileInput from "../profile-input/profile-input";

function Profile(props) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "Алексей", email: "pochta@yandex.ru" });
  const [errors, setErrors] = useState({ name: "", email: "" });
  const [profileEditError, setProfileEditError] = useState("");
  const [editFormActive, setEditFormActive] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    })

    const newErrors = {
      ...errors,
      [name]: name === 'name' ? validateName(value) : validateEmail(value),
    };

    setErrors(newErrors);

    const hasInputErrors = Object.values(newErrors).some((error) => error !== '');
    if (hasInputErrors) {
      setProfileEditError('');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      email: validateEmail(formData.email),
      name: validateName(formData.name)
    };
    setErrors(newErrors);

    const isFormValid = Object.values(newErrors).every((error) => error === '') && Object.values(formData).every((value) => value !== '');

    if (isFormValid) {
      setProfileEditError("");
      toggleEditFormActive();
    } else {
      setProfileEditError("При обновлении профиля произошла ошибка")
    }
  };

  const handleSignOut = () => {
    props.handleLogin();
    navigate("/", { replace: true })
  }

  const toggleEditFormActive = () => {
    setEditFormActive(!editFormActive);
  }

  return (
    <section className="profile">
      <div className="profile-content">
        <h1 className="profile__title">Привет, Алексей!</h1>
        <form className="profile__form" noValidate id="profile" onSubmit={handleSubmit}>
          <ProfileInput editFormActive={editFormActive} label="Имя" type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} error={errors.name}/>
          <span className="profile__form-border"></span>
          <ProfileInput  editFormActive={editFormActive} label="E-mail" type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} error={errors.email}/>
          {profileEditError && <span className="profile__input-error profile__input-error-text">{profileEditError}</span>}
          {editFormActive && <button className="profile__button-submit profile__button-submit-text profile__buttons-position" type="submit">Сохранить</button>}
        </form>
      </div>
      {!editFormActive && <div className="profile__buttons-container profile__buttons-position">
        <button className="profile__button profile__button-text profile__button-edit hover-effect button-effect"
                type="button" onClick={toggleEditFormActive}>Редактировать
        </button>
        <button className="profile__button profile__button-text profile__button-sign-out hover-effect button-effect"
                type="submit" onClick={handleSignOut}>Выйти из аккаунта
        </button>
      </div>}
    </section>
  )
}

export default Profile;