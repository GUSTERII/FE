import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userActions"; // Import the logout action
import "../styles/Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access the isLoggedIn state from Redux
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action to reset login state
    navigate("/"); // Redirect to the homepage
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <NavLink to="/" className="navbar-logo" aria-label="Homepage">
        USV Exams
      </NavLink>

      {/* Navigation links */}
      <div className="navbar-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
          }
          aria-label="Home"
        >
          Acasă
        </NavLink>

        <NavLink
          to="/despre-noi"
          className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
          }
          aria-label="About Us"
        >
          Despre Noi
        </NavLink>

        <NavLink
          to="/orar"
          className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
          }
          aria-label="Schedule"
        >
          Orar
        </NavLink>

        {/* Conditional rendering for login/logout */}
        {!isLoggedIn ? (
          <NavLink
            to="/logare"
            className={({ isActive }) =>
              isActive
                ? "navbar-link active navbar-link-right"
                : "navbar-link navbar-link-right"
            }
            aria-label="Login"
          >
            Logare
          </NavLink>
        ) : (
          <button
            className="navbar-logout-button navbar-link-right"
            onClick={handleLogout}
            aria-label="Logout"
          >
            Deconectare
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
