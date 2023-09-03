import React from "react";
import "./about_me.css";
import SectionTitle from "../section-title/section-title";
import "./about_me.css";

function AboutMe() {
  return (
    <section className="about-me">
      <SectionTitle title={"Студент"}/>
      <div className="about-me__content">
        <div className="about-me__info">
          <div className="about-me__main-text">
            <h3 className="about-me__name">Алексей</h3>
            <h4 className="about-me__job">Фронтенд-разработчик, 36 лет</h4>
            <p className="about-me__description about-me__description-position">Я родился в Тверской области, но живу в Москве, закончил
              судомеханический факультет МГАВТ. У меня есть жена . Я люблю слушать и играть музыку, а теперь ещё и
              кодить. С 2017 года работал в компании
              «Галвент». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с
              постоянной работы.</p>
          </div>
          <a href="https://github.com/al3xus22" className="about-me__link hover-effect link-effect">Github</a>
        </div>
        <img src="https://static.tildacdn.com/tild3939-3563-4465-b063-356232646136/15-back-end-develope.jpg" alt="Фото разработчика" className="about-me__image"/>
      </div>
    </section>
  )
}

export default AboutMe;