import React from "react";
import { CiClock2 } from "react-icons/ci"; 
import { CiCalendar } from "react-icons/ci";
import { PiCrownSimpleLight } from "react-icons/pi"; 
import '../styles/IconSection.css'; 

const IconSection = () => {
  return (
    <div className="flexbox">
      {/* Container pentru prima icnita si text */}
      <div className="icon-container">
        <CiClock2 />
        <div className="icon-text">
          <h3 className="icon-title">Organizează-ți timpul</h3>
          <p className="icon-subtitle">Verifică orarul pentru un program flexibil</p>
        </div>
      </div>

      {/* Container pentru a doua iconita si text */}
      <div className="icon-container">
        <CiCalendar />
        <div className="icon-text">
          <h3 className="icon-title">Planifică-ți materiile</h3>
          <p className="icon-subtitle">Stabilește examenele împreună cu profesorii</p>
        </div>
      </div>

      {/* Container pentru a treia iconita si text */}
      <div className="icon-container">
        <PiCrownSimpleLight />
        <div className="icon-text">
          <h3 className="icon-title">Cucerește examenele</h3>
          <p className="icon-subtitle">Pregătire eficientă, rezultate pe măsură</p>
        </div>
      </div>
    </div>
  );
};

export default IconSection;
