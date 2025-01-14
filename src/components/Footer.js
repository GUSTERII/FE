import React from "react";
import "../styles/Footer.css"; // Import the CSS file for styling
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaMapMarkerAlt,
} from "react-icons/fa";

// Social media links component
const SocialLinks = () => (
  <div className="footer-social">
    <a
      href="https://facebook.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Facebook"
    >
      <FaFacebook />
    </a>
    <a
      href="https://twitter.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Twitter"
    >
      <FaTwitter />
    </a>
    <a
      href="https://instagram.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
    >
      <FaInstagram />
    </a>
  </div>
);

// Footer section component (e.g., categories, terms)
const FooterSection = ({ title, children }) => (
  <div className="footer-section">
    <h3>{title}</h3>
    {children}
  </div>
);

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo and description */}
        <div className="footer-logo">
          <h2>Gușterii</h2>
          <p>Codăm cu pasiune, inovăm cu viziune.</p>
          <SocialLinks />
        </div>

        {/* Footer sections */}
        <FooterSection title="Categorii">
          <a href="#orar">Orar</a>
          <a href="#lorem1">Lorem</a>
          <a href="#lorem2">Lorem</a>
        </FooterSection>

        <FooterSection title="Termeni și condiții">
          <a href="#politica">Politică confidențialitate</a>
          <a href="#cookies">Cookies</a>
          <a href="#lorem3">Lorem</a>
        </FooterSection>

        <FooterSection title="Contact">
          <p>&#9742; (+40) 000 000 00</p>
          <p>&#9993; gusterii@code.com</p>
          <p>
            <FaMapMarkerAlt /> Strada Universității 13
          </p>
        </FooterSection>
      </div>

      {/* Separator line */}
      <hr className="footer-divider" />

      {/* Footer bottom */}
      <div className="footer-bottom">
        <p>Copyright © 2024 Gușterii. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
