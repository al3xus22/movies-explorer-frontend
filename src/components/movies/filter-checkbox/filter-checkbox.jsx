import React from "react";
import "./filter-checkbox.css";

function FilterCheckbox({ isShortFilm, toggleShortFilm }) {
  return (
    <div className="filter-checkbox">
      <input type="checkbox" id="filter-checkbox" checked={ isShortFilm } onChange={ toggleShortFilm }/>
      <label htmlFor="filter-checkbox" className="filter-checkbox__text">Короткометражки</label>
    </div>
  )
}

export default FilterCheckbox;