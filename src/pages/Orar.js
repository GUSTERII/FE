import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CalendarSection from "../components/CalendarSection";
import Footer from "../components/Footer";

const Orar = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // Access Redux state

  useEffect(() => {
    if (!isLoggedIn) {
      // Redirect to the login page if the user is not logged in
      navigate("/logare");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <div id="root">
        <div className="page-content">
          <CalendarSection />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Orar;
