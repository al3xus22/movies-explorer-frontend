import React from "react";
import "./search-form.css";
import FilterCheckbox from "../filter-checkbox/filter-checkbox";

function SearchForm({ isShortFilm, setIsShortFilm, errors, setErrors, query, setQuery, errorRes }) {

  const handleInputChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    setErrors("");
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query) {
      setErrors("Введите ключевое слово");
      localStorage.removeItem("searchMovies");
      localStorage.removeItem("query");
    } else {
      setErrors("");
    }
  }

  function handleCheckbox() {
    setIsShortFilm(!isShortFilm);
  }

  return (<div className="search-form">
    <form id="search-movie" className="search-form__container" noValidate onSubmit={handleSubmit}>
      <input type="search" className="search-form__input search-form__input-text" placeholder="Фильм"
             name="search-movie" maxLength="50" onChange={handleInputChange} value={query}/>
      <button className="search-form__button search-form__button-text button-effect hover-effect"
              type="submit">Найти
      </button>
      <span className="search-form__input-border"></span>
    </form>
    {(errors || errorRes) &&
      <span className="search-form__input-error search-form__input-error-text">{errors || errorRes}</span>}
    <div className="search-form__checkbox">
      <FilterCheckbox handleCheckbox={handleCheckbox} isShortFilm={isShortFilm}/>
    </div>
  </div>)
}

export default SearchForm;