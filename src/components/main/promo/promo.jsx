import React from "react"
import "./promo.css";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__content">
        <div className="promo__main-text">
          <h1 className="promo__title">Учебный проект студента факультета <span className="promo__text-no-wrap">Веб-разработки.</span></h1>
          <div className="promo__description-area">
            <p className="promo__description">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          </div>
        </div>
        <a href="#more-info" className="promo__link">
          <button className="promo__button-more promo__button-more_text hover-effect button-effect">Узнать больше</button>
        </a>
      </div>
      <div className="promo__logo"></div>
    </section>
  );
}

export default Promo;