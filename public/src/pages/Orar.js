import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Importăm contextul pentru autentificare
import CalendarSection from "../components/CalendarSection";
import Footer from '../components/Footer';
const Orar = () => {
  const { isLoggedIn } = useAuth(); // Obținem starea de autentificare
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      // Dacă utilizatorul nu este logat, redirecționează la pagina de logare
      navigate("/logare");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
    <CalendarSection/>
    
    <br/><br/>
    <br/> <br/>
    <br/> <br/>
    <br/> <br/>
    <br/> <br/>
    <Footer/>
    </div>
  );
};

export default Orar;
