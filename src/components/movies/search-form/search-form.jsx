import React, { useState } from "react";
import "./search-form.css";
import FilterCheckbox from "../filter-checkbox/filter-checkbox";

function SearchForm({ setQuery, handleCheckbox, isShortFilm, handleSearch, setSearched }) {
  const [inputValue, setInputValue] = useState("");
  const [errors, setErrors] = useState("");

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
    setQuery(value);
    setErrors("");
    setSearched(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputValue) {
      setErrors("Введите ключевое слово");
    } else {
      setErrors("");
      handleSearch(inputValue);
      setSearched(true);
    }
  }

  return (
    <div className="search-form">
      <form id="search-movie" className="search-form__container" noValidate onSubmit={handleSubmit}>
        <input type="search" className="search-form__input search-form__input-text" placeholder="Фильм"
               name="search-movie" maxLength="50" onChange={handleInputChange} value={inputValue}/>
        <button className="search-form__button search-form__button-text button-effect hover-effect"
                type="submit">Найти
        </button>
        <span className="search-form__input-border"></span>
      </form>
      {errors && <span className="search-form__input-error search-form__input-error-text">{errors}</span>}
      <div className="search-form__checkbox">
        <FilterCheckbox handleCheckbox={handleCheckbox} isShortFilm={isShortFilm}/>
      </div>
    </div>
  )
}

export default SearchForm;