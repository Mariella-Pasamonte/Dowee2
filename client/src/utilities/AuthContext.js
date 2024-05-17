import React, { createContext, useState } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userID: null,
  setUserID: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState(null);

  // Simulate login logic (replace with your backend integration)
  const login = (userID) => {
    // Simulate successful login
    console.log("login succssful")
    setIsLoggedIn(true);
    setUserID(userID); // Example user data
  };

  // Simulate logout logic
  const logout = () => {
    setIsLoggedIn(false);
    setUserID(null);
  };

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    userID,
    setUserID,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;