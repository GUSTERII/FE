import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import DespreNoi from "./pages/DespreNoi";
import Orar from "./pages/Orar";
import Logare from "./pages/Logare";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/despre-noi" element={<DespreNoi />} />
          <Route path="/orar" element={<Orar />} />
          <Route path="/logare" element={<Logare />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
