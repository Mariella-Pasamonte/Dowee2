import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Login, Home, Register, Invoice } from "./pages";
import "./App.css";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(false);
  
  //Loading animation
  window.onload = function() {
    document.getElementById("loading-animation").style.display = "none";
  };
  function login(flag) {
    setLoggedInUser(()=>flag);
  }
  const checkUser = () => {
    if (localStorage.getItem('userId'))
      setLoggedInUser(()=>true);
  }
  useEffect (()=>{
    
    checkUser();
    return ()=> checkUser();
  },[])
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          path="/"
          element={<Login login={login} />}
        />
        <Route
          path="/home"
          element={<Home loggedInUser={loggedInUser} login={login}/>}
        />
        <Route
          path="/invoice/:id"
          element={<Invoice loggedInUser={loggedInUser}/>}
          />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
