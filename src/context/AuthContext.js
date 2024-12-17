import React, { createContext, useState, useContext} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );
  const [role, setRole] = useState(
    () => localStorage.getItem("role") || null
  );

  const login = (email) => {
    let userRole = null;
    if (email.endsWith("@student.usv.ro")) userRole = "student";
    else if (email.endsWith("@sefsemigrupa.usv.ro")) userRole = "sefsemigrupa";
    else if (email.endsWith("@profesor.usv.ro")) userRole = "profesor";
    else if (email.endsWith("@secretar.usv.ro")) userRole = "secretar";

    setIsLoggedIn(true);
    setRole(userRole);
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("role", userRole);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setRole(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
