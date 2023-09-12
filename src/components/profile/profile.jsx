import React, { useState, useContext } from "react";
import "./profile.css";
import { validateEmail, validateName } from "../../utils/validation";
import ProfileInput from "../profile-input/profile-input";
import { CurrentUserContext } from "../../contexts/current-user-context";

function Profile({
                   signOut,
                   handleUpdateUser,
                   updateError,
                   setUpdateError,
                   editFormActive,
                   setEditFormActive,
                   isUserInfoChanged,
                   setIsUserInfoChanged,
                   serverRes
                 }) {
  const currentUser = useContext(CurrentUserContext);

  const [formData, setFormData] = useState({ name: currentUser.name, email: currentUser.email });
  const [errors, setErrors] = useState({ name: "", email: "" });
  const [profileEditError, setProfileEditError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    })

    const newErrors = {
      ...errors,
      [name]: name === "name" ? validateName(value) : validateEmail(value),
    };

    setErrors(newErrors);

    const hasInputErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasInputErrors) {
      setProfileEditError("");
    }

    setUpdateError("");

    setIsUserInfoChanged((prevInfo) => ({
      ...prevInfo,
      [name]: name === "name" || name === "email" ? value !== currentUser[name] : prevInfo[name],
    }));
  }

  //Проверяем были ли изменения в инпутах
  const isUserDataChanged = Object.values(isUserInfoChanged).some((value) => value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      email: validateEmail(formData.email),
      name: validateName(formData.name)
    };
    setErrors(newErrors);

    const isFormValid = Object.values(newErrors).every((error) => error === "") && Object.values(formData).every((value) => value !== "");

    if (isFormValid) {
      setProfileEditError("");
      handleUpdateUser({ name: formData.name, email: formData.email });
    } else {
      setProfileEditError("При обновлении профиля произошла ошибка")
    }
  };

  //Редактировать (делаем активными инпуты)
  const toggleEditFormActive = () => {
    setEditFormActive(!editFormActive);
    setProfileEditError("");
    setUpdateError("");
  }

  return (
    <section className="profile">
      <div className="profile-content">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form className="profile__form" noValidate id="profile" onSubmit={handleSubmit}>
          <ProfileInput editFormActive={editFormActive} label="Имя" type="text" name="name" id="name"
                        value={formData.name} placeholder="Имя" onChange={handleInputChange} error={errors.name}/>
          <span className="profile__form-border"></span>
          <ProfileInput editFormActive={editFormActive} label="E-mail" type="email" name="email" id="email"
                        value={formData.email} placeholder="E-mail" onChange={handleInputChange} error={errors.email}/>
          {(profileEditError || updateError || serverRes) &&
            <span className={`profile__input-error profile__input-error-text ${serverRes ? "profile__input-error-text_res" : ""}`}>{profileEditError || updateError || serverRes}</span>}
          {editFormActive && <button
            className={`profile__button-submit profile__button-submit-text profile__buttons-position ${isUserDataChanged ? "" : "profile__button-submit_disabled"}`}
            type="submit" onClick={handleSubmit} disabled={!isUserDataChanged}>Сохранить</button>}
        </form>
      </div>
      {!editFormActive && <div className="profile__buttons-container profile__buttons-position">
        <button className="profile__button profile__button-text profile__button-edit hover-effect button-effect"
                type="button" onClick={toggleEditFormActive}>Редактировать
        </button>
        <button className="profile__button profile__button-text profile__button-sign-out hover-effect button-effect"
                type="submit" onClick={signOut}>Выйти из аккаунта
        </button>
      </div>}
    </section>
  )
}

export default Profile;