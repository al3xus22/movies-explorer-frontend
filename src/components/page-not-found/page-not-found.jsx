import React from "react";
import "./page-not-found.css";

const goBack = () => {
  window.history.back();
}

function PageNotFound() {
  return (<div className="page-not-found">
      <div className="page-not-found__main-text">
        <h1 className="page-not-found__title">404</h1>
        <p className="page-not-found__description">Страница не найдена</p>
      </div>
      <button onClick={goBack} className="page-not-found__button hover-effect button-effect">
        <p className="page-not-found__link-text">Назад</p>
      </button>
    </div>)
}

export default PageNotFound;