import React from "react";
import "./search-form.css";
import FilterCheckbox from "../filter-checkbox/filter-checkbox";

function SearchForm() {
  return (
    <div className="search-form">
      <div className="search-form__container">
        <input type="search" className="search-form__input search-form__input-text" placeholder="Фильм"
               name="search-movie"/>
        <button className="search-form__button search-form__button-text button-effect hover-effect"
                type="submit">Найти
        </button>
      </div>
      <div className="search-form__checkbox">
        <FilterCheckbox/>
      </div>
    </div>
  )
}

export default SearchForm;