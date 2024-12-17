import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/CalendarSection.css";

const CalendarSection = () => {
  const { role } = useAuth();
  const [exams, setExams] = useState(() => {
    const savedExams = localStorage.getItem("exams");
    return savedExams ? JSON.parse(savedExams) : [];
  });
  const [newExam, setNewExam] = useState({
    name: "",
    professor: "",
    group: "",
    room: "",
    date: "",
    time: "",
    duration: "",
    status: "pending",
  });
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    // Sterge examenele care au inceput
    const now = new Date();
    const updatedExams = exams.filter((exam) => {
      const examDateTime = new Date(`${exam.date}T${exam.time}`);
      return examDateTime > now;
    });
    setExams(updatedExams);
    localStorage.setItem("exams", JSON.stringify(updatedExams));
  }, [exams]);

  const handleAddExam = () => {
    if (role !== "sefsemigrupa") {
      alert("Nu aveți permisiunea de a adăuga examene.");
      return;
    }
    setExams([...exams, { ...newExam, status: "pending" }]);
    setNewExam({
      name: "",
      professor: "",
      group: "",
      room: "",
      date: "",
      time: "",
      duration: "",
      status: "pending",
    });
    setIsFormVisible(false);
  };

  const handleApproval = (index, action) => {
    const updatedExams = [...exams];
    const exam = updatedExams[index];

    if (role === "profesor" && exam.status === "pending") {
      if (action === "reject") {
        updatedExams.splice(index, 1); // Șterge examenul dacă este refuzat
      } else {
        exam.status = "pending-secretar";
      }
    } else if (role === "secretar" && exam.status === "pending-secretar") {
      if (action === "accept") {
        const room = prompt("Introduceți sala pentru examen:");
        if (room) {
          exam.room = room;
          exam.status = "approved";
        } else {
          alert("Sala este obligatorie pentru a aproba examenul.");
          return;
        }
      } else {
        updatedExams.splice(index, 1); // Șterge examenul dacă este refuzat
      }
    } else {
      alert("Nu aveți permisiunea de a efectua această acțiune.");
      return;
    }
    setExams(updatedExams);
  };

  return (
    <div className="calendar-section">
      <h1>Calendar Examene</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Numele Examenului</th>
            <th>Profesor</th>
            <th>Grupa</th>
            <th>Sala</th>
            <th>Data și Ora</th>
            <th>Durata (minute)</th>
            <th>Status</th>
            {role === "profesor" || role === "secretar" ? <th>Acțiuni</th> : null}
          </tr>
        </thead>
        <tbody>
          {exams
            .filter((exam) => role !== "student" || exam.status === "approved")
            .map((exam, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{exam.name}</td>
                <td>{exam.professor}</td>
                <td>{exam.group}</td>
                <td>{exam.room || "-"}</td>
                <td>
                  {exam.date} {exam.time}
                </td>
                <td>{exam.duration}</td>
                <td>{exam.status}</td>
                {((role === "profesor" && exam.status === "pending") ||
                  (role === "secretar" && exam.status === "pending-secretar")) && (
                  <td>
                    <button onClick={() => handleApproval(index, "accept")}>Acceptă</button>
                    <button onClick={() => handleApproval(index, "reject")}>Refuză</button>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>

      {role === "sefsemigrupa" && (
        <>
          <button
            className="toggle-form-btn"
            onClick={() => setIsFormVisible(!isFormVisible)}
          >
            {isFormVisible ? "Închide Formularul" : "Adaugă Examen"}
          </button>

          <div className={`form-container ${isFormVisible ? "visible" : ""}`}>
            <h2>Adaugă Examen</h2>
            <input
              type="text"
              placeholder="Numele Examenului"
              value={newExam.name}
              onChange={(e) => setNewExam({ ...newExam, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Profesor"
              value={newExam.professor}
              onChange={(e) =>
                setNewExam({ ...newExam, professor: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Grupa"
              value={newExam.group}
              onChange={(e) => setNewExam({ ...newExam, group: e.target.value })}
            />
            <input
              type="date"
              value={newExam.date}
              onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
            />
            <input
              type="time"
              value={newExam.time}
              onChange={(e) => setNewExam({ ...newExam, time: e.target.value })}
            />
            <input
              type="number"
              placeholder="Durata (minute)"
              value={newExam.duration}
              onChange={(e) =>
                setNewExam({ ...newExam, duration: e.target.value })
              }
            />
            <button onClick={handleAddExam}>Propune Examen</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CalendarSection;
