import React from "react";
import "./filter-checkbox.css";

function FilterCheckbox({ handleCheckbox, isShortFilm }) {
  return (
    <div className="filter-checkbox">
      <input type="checkbox" id="filter-checkbox" checked={isShortFilm} onChange={ handleCheckbox }/>
      <label htmlFor="filter-checkbox" className="filter-checkbox__text">Короткометражки</label>
    </div>
  )
}

export default FilterCheckbox;