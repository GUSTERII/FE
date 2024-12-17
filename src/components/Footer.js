import React from "react";
import "../styles/Footer.css"; // Importăm fișierul CSS pentru stiluri
import { FaFacebook, FaTwitter, FaInstagram, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo și descriere */}
        <div className="footer-logo">
          <h2>&lt;Gușterii&gt;</h2>
          <p>Codăm cu pasiune, inovăm cu viziune.</p>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Secțiuni din footer */}
        <div className="footer-section">
          <h3>Categorii</h3>
          <a href="#orar">Orar</a>
          <a href="#lorem1">Lorem</a>
          <a href="#lorem2">Lorem</a>
        </div>

        <div className="footer-section">
          <h3>Termeni și condiții</h3>
          <a href="#politica">Politică confidențialitate</a>
          <a href="#cookies">Cookies</a>
          <a href="#lorem3">Lorem</a>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>&#9742; (+40) 000 000 00</p>
          <p>&#9993; gusterii@code.com</p>
          <p>
            <FaMapMarkerAlt /> Strada Universității 13
          </p>
        </div>
      </div>

      {/* Linie separator */}
      <hr className="footer-divider" />

      {/* Linie de jos */}
      <div className="footer-bottom">
        <p>Copyright © 2024 Gușterii. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
