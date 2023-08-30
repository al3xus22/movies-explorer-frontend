import React from "react";
import "./section-title.css";

function SectionTitle(props) {
  return (
    <>
      <div className="section-title__container">
        <h2 className="section-title__title">{props.title}</h2>
      </div>
    </>
  )
}

export default SectionTitle;