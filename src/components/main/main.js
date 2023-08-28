import React from 'react';
import './main.css';
import Promo from './promo/promo';
import AboutProject from "../main/about-project/about-project";
import Techs from "./techs/techs";
import AboutMe from "./about_me/about_me";
import Portfolio from "./portfolio/portfolio";

function Main() {
  return(
<main className="main">
  <Promo/>
  <AboutProject/>
  <Techs/>
  <AboutMe/>
  <Portfolio/>
</main>
  );
}

export default Main;