import {BrowserRouter, Routes, Route} from "react-router-dom";
import React, {useState, createContext} from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {
  Test, 
  Login, 
  Home,
  Register
} from "./pages";
import './App.css';

export const MyContext = createContext();
const usersList =[
  {
    username: 'mariellapasamonte',
    password: '123456789',
    email: 'mariellapasamonte@email.com',
    contact: '+9123456789',
    fname: 'Mariella',
    lname: 'Pasamonte',
    gender: 'female',
    userID: '0',
  }
]
function App(){
  const [userDetails, setUserDetails] = useState(usersList);

  return (
    <BrowserRouter>
      <MyContext.Provider value={userDetails}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Routes>
            <Route
              index
              path="/"
              element={<Login />}
            />
            <Route
              path="/register"
              element={<Register />}
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
        </LocalizationProvider>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
