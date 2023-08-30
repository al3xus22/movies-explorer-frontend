import React from "react";
import "./techs.css";
import SectionTitle from "../section-title/section-title";

function Techs() {
  return (
    <section className="techs">
      <SectionTitle title={"Технологии"}/>
      <div className="techs__content">
        <div className="techs__main-text">
          <h3 className="techs__title">7 технологий</h3>
          <p className="techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном
            проекте.</p>
        </div>
        <ul className="techs__stack-container">
          <li className="techs__stack-item techs__stack-text">HTML</li>
          <li className="techs__stack-item techs__stack-text">CSS</li>
          <li className="techs__stack-item techs__stack-text">JS</li>
          <li className="techs__stack-item techs__stack-text">React</li>
          <li className="techs__stack-item techs__stack-text">Git</li>
          <li className="techs__stack-item techs__stack-text">Express.js</li>
          <li className="techs__stack-item techs__stack-text">mongoDB</li>
        </ul>
      </div>
    </section>
  )
}

export default Techs;