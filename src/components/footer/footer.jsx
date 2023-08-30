import React from "react";
import "./footer.css";

function Footer() {
  return(
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__description footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__columns">
          <p className="footer__copyright footer__text">© 2023</p>
          <nav className="footer__links">
            <a className="footer__link footer__text hover-effect link-effect" target="_blank" href="https://practicum.yandex.ru/profile/web/">Яндекс.Практикум</a>
            <a className="footer__link footer__text hover-effect link-effect" target="_blank" href="https://github.com/al3xus22">Github</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer;