import React, { createContext, useState, useContext} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );
  const [role, setRole] = useState(
    () => localStorage.getItem("role") || null
  );

  const login = (tokenData) => {
    let userRole = null;
    userRole = tokenData.role;
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
