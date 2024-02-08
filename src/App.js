import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from "react";
import logo from './logo.svg';
import Test from "./pages/test";
import Test2 from "./pages/test2";
import './App.css';

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          path="/Test"
          element={<Test />}
        />
        <Route
          path="/Test2"
          element={<Test2 />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
