import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Test, Login, Home, Register } from "./pages";
import "./App.css";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [backendData, setBackendData] = useState([{}]);

  fetch("/")
    .then((res) => res.json())
    .then((data) => {
      setBackendData(data);
    });

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
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
