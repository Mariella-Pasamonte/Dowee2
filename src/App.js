import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import React, {useState} from "react";
import {
  Test, 
  Login, 
  Home
} from "./pages";
import './App.css';

function App(){
  const [user, setUser] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          path="/"
          element={<Login />}
        />
        <Route
          path="/test"
          element={<Test />}
        />
        <Route
          path="/home"
          element={<Home />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
