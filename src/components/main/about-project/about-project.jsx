import React from "react";
import SectionTitle from "../section-title/section-title";
import "./about-project.css";

function AboutProject() {
  return (
    <section className="about-project" id="more-info">
      <SectionTitle title={"О проекте"}/>
      <div className="about-project__content">
        <div className="about-project__brief">
          <div className="about-project__brief-column">
            <h3 className="about-project__brief-title">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__brief-description">Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.</p>
          </div>
          <div className="about-project__brief-column">
            <h3 className="about-project__brief-title">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__brief-description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно
              было соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="about-project__duration">
          <h4 className="about-project__duration-title about-project__duration-align">1 неделя</h4>
          <h4 className="about-project__duration-title about-project__duration-align">4 недели</h4>
          <p className="about-project__duration-description about-project__duration-align">Back-end</p>
          <p className="about-project__duration-description about-project__duration-align">Front-end</p>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;