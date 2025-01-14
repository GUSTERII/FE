import React from "react";
import "../styles/AboutSection.css";
import img1 from "../assets/profile-images/IMG1.jpg";
import img2 from "../assets/profile-images/IMG2.jpg";
import img3 from "../assets/profile-images/IMG3.jpg";
import img4 from "../assets/profile-images/IMG4.jpg";

const AboutSection = () => {
  const teamMembers = [
    { name: "Victor Balan", role: "Backend", img: img1 },
    { name: "Ștefan-Alexandru Cozloschi", role: "Frontend", img: img2 },
    { name: "Vlad Mihalache", role: "UI/UX Designer", img: img3 },
    { name: "Emanuel Gherasimescu", role: "Tester", img: img4 },
  ];

  return (
    <>
      <div className="about-banner">
        <h1>Organizează-ți timpul, cucerește examenele!</h1>
      </div>

      <div className="about-section">
        <Section
          title="Povestea noastră"
          content={
            <>
              Suntem o echipă de 4 studenți de la USV care au primit ca temă de
              proiect să creeze o aplicație pentru planificarea examenelor.
              Misiunea noastră este să facem procesul de organizare mai simplu
              și eficient pentru studenți.
            </>
          }
          imageSrc="https://usv.ro/wp-content/uploads/2019/12/foto_usv_18-900x400.jpg"
          imageAlt="Povestea noastră"
        />

        <Section
          title="Valorile noastre"
          content={
            <>
              Credem în inovație, colaborare și dedicare. Fiecare proiect este o
              oportunitate de a învăța și de a contribui la comunitatea
              academică. Prin valorile noastre, dorim să inspirăm alte echipe să
              fie creative și eficiente.
            </>
          }
          imageSrc="https://media.istockphoto.com/id/1346944001/photo/close-up-of-co-workers-stacking-their-hands-together.jpg?s=612x612&w=0&k=20&c=lidJcFUSR3rkMt4B0yoNwH55lz3sth9o2280keqBXGE="
          imageAlt="Valorile noastre"
        />

        <Section
          title="Ce facem"
          content={
            <>
              Dezvoltăm aplicații web care ajută studenții să-și organizeze mai
              bine timpul și resursele. Prin funcționalități moderne și
              intuitive, ne dorim să facem planificarea mai eficientă, oferind
              soluții personalizate pentru fiecare.
            </>
          }
        />

        <TeamSection teamMembers={teamMembers} />

        <Section
          title="Contact"
          content={
            <>
              Pentru orice întrebări, sugestii sau feedback, te invităm să ne
              contactezi folosind informațiile disponibile în secțiunea de
              footer. Suntem aici să te ajutăm și să îți oferim suportul de care
              ai nevoie pentru o experiență cât mai plăcută cu aplicația
              noastră.
            </>
          }
        />
      </div>
    </>
  );
};

const Section = ({ title, content, imageSrc, imageAlt }) => (
  <div className="about-item">
    <div className="about-item-content">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
    {imageSrc && <img src={imageSrc} alt={imageAlt} />}
  </div>
);

const TeamSection = ({ teamMembers }) => (
  <div className="team-section">
    <h2 className="team-title">Echipa</h2>
    <div className="team-container">
      {teamMembers.map((member, index) => (
        <div className="profile-card" key={index}>
          <img src={member.img} alt={member.name} className="profile-img" />
          <h3 className="profile-name">{member.name}</h3>
          <p className="profile-role">{member.role}</p>
        </div>
      ))}
    </div>
  </div>
);

export default AboutSection;
