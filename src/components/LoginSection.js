import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/LoginSection.css";

const LoginSection = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin1 = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      if (response.ok) {
        console.log("Autentificare reușită!");
        login(); // Actualizare stare autentificare
        navigate("/orar"); // Redirectionare la pagina Orar
      } else {
        const data = await response.json();
        setError(data.message || "Eroare necunoscută.");
      }
    } catch (err) {
      console.error("Eroare la autentificare:", err);
      setError("A apărut o problemă. Încercați din nou.");
    }
  };
  const login2 = async (email, password) => {
    const response = await fetch("http://localhost:8081/auth/sing-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      try {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return await response.json();
        } else {
          return {}; // Return an empty object if there's no JSON body
        }
      } catch (error) {
        return {}; // Return an empty object if parsing fails
      }
    } else {
      throw new Error("Login failed");
    }
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await login2(email, password);
      console.log("Login response:", response);
      login(); // Actualizare stare autentificare
      navigate("/orar"); // Redirectionare la pagina Orar
    } catch (error) {
      console.error("Login failed:", error.message);
      if (error.message === "Login failed") {
        setError("Email sau parolă greșită.");
      } else {
        setError("A apărut o problemă. Încercați din nou.");
      }
    }
  };

  return (
    <div className="login-section">
      {/* Container pentru formularul de logare */}
      <div className="login-form-container">
        <div className="login-form">
          <h2>Logare</h2>
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              placeholder="Introduceți mail-ul"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Password*</label>
            <input
              type="password"
              id="password"
              placeholder="Introduceți parola"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Loghează-te</button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>

      {/* Branding-ul aplicatiei */}
      <div className="login-branding">
        <h1>
          <span>USV</span> Exams
        </h1>
        <p>&lt;GUȘTERII&gt;</p>
      </div>
    </div>
  );
};

export default LoginSection;
