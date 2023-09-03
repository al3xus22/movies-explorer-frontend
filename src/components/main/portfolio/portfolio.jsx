import React from 'react';
import "./portfolio.css";
import portfolioLink from "../../../images/pointer_link.svg";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a href="https://al3xus22.github.io/how-to-learn/" target="_blank" className="portfolio__item-text hover-effect link-effect">Статичный сайт</a>
          <a href="https://al3xus22.github.io/how-to-learn/"  target="_blank" className="portfolio__link hover-effect link-effect">
            <img src={portfolioLink} alt="Ссылка" className="portfolio__link-image"/>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a href="https://al3xus22.github.io/how-to-learn/" target="_blank" className="portfolio__item-text hover-effect link-effect">Адаптивный сайт</a>
          <a href="https://al3xus22.github.io/how-to-learn/" target="_blank" className="portfolio__link hover-effect link-effect">
            <img src={portfolioLink} alt="Ссылка" className="portfolio__link-image"/>
            </a>
        </li>
        <li className="portfolio__list-item">
          <a href="https://al3xus22.github.io/how-to-learn/" target="_blank" className="portfolio__item-text hover-effect link-effect">Одностраничное приложение</a>
          <a href="https://al3xus22.github.io/how-to-learn/" target="_blank" className="portfolio__link hover-effect link-effect">
            <img src={portfolioLink} alt="Ссылка" className="portfolio__link-image"/>
          </a>
        </li>
      </ul>
    </section>
)
}

export default Portfolio;