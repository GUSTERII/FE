import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth(); // folosirea contextului
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Resetare logare
    navigate("/"); // Redirectionare la pagina principala
  };

  return (
    <div className="navbar">
      {/* Logo */}
      <NavLink to="/" className="navbar-logo">
        USV Exams
      </NavLink>

      {/* Linkuri */}
      <div className="navbar-links">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "navbar-link active" : "navbar-link")}
        >
          Acasă
        </NavLink>
        <span className="navbar-separator">|</span>

        <NavLink
          to="/despre-noi"
          className={({ isActive }) => (isActive ? "navbar-link active" : "navbar-link")}
        >
          Despre Noi
        </NavLink>
        <span className="navbar-separator">|</span>

        <NavLink
          to="/orar"
          className={({ isActive }) => (isActive ? "navbar-link active" : "navbar-link")}
        >
          Orar
        </NavLink>
        <span className="navbar-separator">|</span>

        {/* Se va afisa "Logare" sau "Deconectare" */}
        {!isLoggedIn ? (
          <NavLink
            to="/logare"
            className={({ isActive }) =>
              isActive ? "navbar-link active navbar-link-right" : "navbar-link navbar-link-right"
            }
          >
            Logare
          </NavLink>
        ) : (
          <button
            className="navbar-logout-button navbar-link-right"
            onClick={handleLogout}
          >
            Deconectare
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
