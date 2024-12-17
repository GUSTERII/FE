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

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      if (response.ok) {
        console.log("Autentificare reușită!");
        login(email); // Trimite email-ul pentru setarea rolului
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
