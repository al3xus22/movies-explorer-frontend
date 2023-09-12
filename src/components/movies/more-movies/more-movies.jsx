import React from "react";
import "./more-movies.css";

function MoreMovies({ loadMore }) {
  return (
    <div className="more-movies">
      <button type="button" className="more-movies__button more-movies__button-text hover-effect button-effect"
              onClick={loadMore}>Ещё
      </button>
    </div>
  )
}

export default MoreMovies;