import React from "react";
import "../styles/CardSection.css"; // Importăm fișierul CSS pentru stiluri
import { FaCog, FaRocket, FaLaptop, FaApple, FaBook } from "react-icons/fa"; // Diferite iconițe pentru fiecare card

const CardSection = () => {
  const cardData = [
    {
      title: "Card Transparent",
      description: "Acest card este transparent și diferit de celelalte.",
      type: "transparent",
      icon: <FaRocket />, 
    },
    {
      title: "Card 1",
      description: "Conținut personalizat pentru Card 1.",
      icon: <FaCog />, 
    },
    {
      title: "Card 2",
      description: "Conținut personalizat pentru Card 2.",
      icon: <FaLaptop />, 
    },
    {
      title: "Card 3",
      description: "Conținut personalizat pentru Card 3.",
      icon: <FaApple />, 
    },
    {
      title: "Card 4",
      description: "Conținut personalizat pentru Card 4.",
      icon: <FaBook />, 
    },
    {
      title: "Card 5",
      description: "Conținut personalizat pentru Card 5.",
      icon: <FaRocket />, 
    },
  ];

  return (
    <div className="card-section">
      {cardData.map((card, index) => (
        <div
          className={card.type === "transparent" ? "card-transparent" : "card-normal"}
          key={index}
        >
          {card.icon} 
          <div className="card-text">
            <h2>{card.title}</h2>
            <p>{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardSection;
