import { BrowserRouter, Routes, Route,} from "react-router-dom";
import React from "react";
import { Login, Home, Register, InvoicePage } from "./pages";
import PrivateRoute from "./utilities/PrivateRoute";
import { AuthProvider } from './utilities/AuthContext';
import "./App.css";


function App() {
  //Loading animation
  window.onload = function() {
    document.getElementById("loading-animation").style.display = "none";
  };

  // function login(flag) {
  //   setLoggedInUser(()=>flag);
  // }
  
  // const checkUser = () => {
  //   if (localStorage.getItem('userId'))
  //     setLoggedInUser(()=>true);
  // }
  // useEffect (()=>{
    
  // checkUser();
  //   return ()=> checkUser();
  // },[])
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            index
            path="/"
            element={<Login/>}
          />
          <Route
            path="/home"
            element={<PrivateRoute><Home/></PrivateRoute>}
          />
          <Route
            path="/invoice/:id"
            element={<PrivateRoute><InvoicePage/></PrivateRoute>}
          />
          <Route 
            path="/register" 
            element={<Register />} 
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
