import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState } from "react";
import { Login, Home, Register } from "./pages";
import { AddProjectModal } from "./components";
import "./App.css";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(false);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          path="/"
          element={<Login loggedInUser={setLoggedInUser} />}
        />
        <Route
          path="/home"
          element={loggedInUser ? <Home /> : <Navigate to="/" />}
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
