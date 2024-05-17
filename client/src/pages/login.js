import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorToast, InputLabel } from "../components";
import AuthContext from "../utilities/AuthContext";
import loginImg from "../images/Login.png";
import loginImg2 from "../images/Login2.png";
import axios from "axios";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validUserError, setValidUserError] = useState(false);
  const [isFilled, setIsFilled] = useState(true);
  const [isFilledError, setIsFilledError] = useState(false);
  const { login, userID } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const checkCredentials = async (e) => {
    if(username !== '' || password !== ''){
      setUsername(username)
      setPassword(password)
      setIsFilled(true)
      await axiosLogin();
    } else {
      setIsFilled(false)
      setIsFilledError(true)
    }
  };
    
  const axiosLogin = async (processing) => {
    const loginData = {
        username: username,
        password: password,
    };
  
    await axios
    .post("http://localhost:3000/login", loginData)
    .then((response) => {
      if (response.data.status === true) {
        // props.login(true);
        // localStorage.setItem("isLoggedIn", true);
        login(response.data.data);
        navigate("/home");
        setIsFilled(true);
        setValidUserError(false);
      } else {
        console.log("username:", username);
        console.log("password:", password);
        setValidUserError(true); 
      }
    })
    .catch((error) => {
      console.log(error);
    });
  };

  useEffect(()=>{
    axios.get('http://localhost:3000/login', {
      headers:{ 
        userId: userID
      }
    })
    .then((response)=>{
      if (response.data.status === true) {
        localStorage.setItem('isLoggedIn', true);
        navigate("/home");
      }
    }).catch((error) =>{
      console.log(error);
    });
  },[navigate,userID])

  var inputLabelClassName = "flex flex-row mt-4 xl:mt-7";
  return (
    <>
      <div className="">
        <div className="flex flex-col justify-center md:flex-row">
          <div className="collapse rounded-md h-0 w-0 flex flex-col justify-center lg:h-dvh lg:w-full lg:visible">
            <div className="relative flex flex-row justify-center">
              <ErrorToast
                id="LoginInvalidUsername"
                isError={validUserError}
                setIsError={setValidUserError}
              >
                <div class="ms-3 text-sm font-normal">
                  Invalid username and password
                </div>
              </ErrorToast>
              <ErrorToast
                id="LoginFilledError"
                isError={isFilledError}
                setIsError={setIsFilledError}
              >
                <div class="ms-3 text-sm font-normal">
                  Please fill out all required fields.
                </div>
              </ErrorToast>
            </div>
            <div
              className="flex flex-col justify-center bg-contain bg-no-repeat h-dvh bg-center xl:bg-cover xl:h-full"
              style={{ backgroundImage: `url(${loginImg})` }}
            >
              <div className="flex flex-row justify-end">
                <div className="flex flex-col justify-center h-full w-4/12 mr-28 xl:w-5/12 xl:mr-12 bg-gradient-to-r from-[#c9c9c9]/25 to-[#C4C4C4]/5 rounded-2xl">
                  <div className="text-white flex flex-col pt-4 pb-8 px-8">
                    <div
                      id="LoginHeader"
                      className="text-4xl xl:text-5xl font-Iceland"
                    >
                      Login
                    </div>
                    <hr className="mt-2 mb-1 w-28 xl:w-32"></hr>
                    <div className="mb-10">
                      <p
                        id="LoginSubHeader"
                        className="font-Montserrat font-light text-xl xl:text-2xl"
                      >
                        Welcome to Doify
                      </p>
                    </div>
                    <form>
                      <InputLabel
                        id="LoginUsernameLabel"
                        isFilled={isFilled}
                        classname="flex flex-row"
                      >
                        <p className="font-Montserrat text-base">Username</p>
                      </InputLabel>
                      <input
                        id="LoginUsername"
                        name="LoginUsername"
                        type="text"
                        placeholder="Enter your username"
                        onChange={(e) => handleUsernameChange(e)}
                        className="p-2 font-Montserrat rounded-lg bg-opacity-10 bg-white placeholder-white/30 text-white w-full text-sm focus:outline-[0.5px] focus:outline-white/10 focus:text-white dark:text-white xl:text-base xl:p-3"
                      />
                      <InputLabel
                        id="LoginPasswordLabel"
                        isFilled={isFilled}
                        classname={inputLabelClassName}
                      >
                        <p className="text-base font-montserrat">Password</p>
                      </InputLabel>
                      <input
                        id="LoginPassword"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e) => handlePasswordChange(e)}
                        className="p-2 font-Montserrat rounded-lg bg-opacity-10 bg-white placeholder-white/30 text-white w-full text-sm focus:outline-[0.5px] focus:outline-white/10 focus:text-white dark:text-white xl:text-base xl:p-3"
                      />
                    </form>
                    <div
                      id="LoginForgotPassword"
                      className="w-full flex flex-row justify-end text-sm mt-2 mb-3 font-Montserrat"
                    >
                      <Link to="/test" className="hover:underline">
                        Forgot Password?
                      </Link>
                    </div>
                    <div className="mt-2 mb-2">
                      <button
                        id="LoginButton"
                        onClick={(e) => checkCredentials(e)}
                        className="bg-[#A5D9D0] font-Montserrat font-extrabold text-black w-full text-base hover:bg-teal-400 py-2 rounded"
                      >
                        LOGIN
                      </button>
                    </div>
                    <div
                      id="LoginSignUp"
                      className="flex flex-row justify-center mt-2 text-sm font-Montserrat"
                    >
                      <Link to="/register">
                        New to Doify? <b>Sign up</b> now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="visible rounded-md flex flex-col justify-center h-fit w-full lg:h-0 lg:hidden lg:w-0">
            <img
              src={loginImg2}
              alt="Login Page"
              className="h-fit rounded-md"
            />
            <div className="flex flex-row justify-center">
              <div className="relative bg-gradient-to-r from-[#c9c9c9]/30 to-[#C4C4C4]/10 rounded-2xl text-white w-full flex flex-col pt-4 pb-8 px-8 md:w-3/4">
                <div
                  id="LoginHeader"
                  className="font-Iceland text-4xl xl:text-5xl"
                >
                  Login
                </div>
                <hr className="mt-2 mb-2 w-28 xl:w-32"></hr>
                <div className="mb-0">
                  <p
                    id="LoginSubHeader"
                    className="font-Montserrat font-light text-xl xl:text-2xl"
                  >
                    Welcome to Doify
                  </p>
                </div>
                <div className="relative mb-10 flex flex-row justify-center">
                  <ErrorToast
                    isError={validUserError}
                    setIsError={setValidUserError}
                  >
                    <div class="ms-3 text-sm font-normal">
                      Invalid username and password
                    </div>
                  </ErrorToast>
                  <ErrorToast
                    isError={isFilledError}
                    setIsError={setIsFilledError}
                  >
                    <div class="ms-3 text-sm font-normal">
                      Please fill out all required fields.
                    </div>
                  </ErrorToast>
                </div>
                <form>
                  <InputLabel isFilled={isFilled} classname="flex flex-row">
                    <p className="font-Montserrat text-base">Username</p>
                  </InputLabel>
                  <input
                    id="LoginUsername"
                    name="LoginUsername"
                    type="text"
                    placeholder="Enter your username"
                    onChange={(e) => handleUsernameChange(e)}
                    className="p-2 font-Montserrat rounded-lg bg-opacity-10 bg-white placeholder-white/30 text-white w-full text-sm focus:outline-[0.5px] focus:outline-white/10 focus:text-white dark:text-white xl:text-base xl:p-3"
                  />
                  <InputLabel
                    isFilled={isFilled}
                    classname={inputLabelClassName}
                  >
                    <p className="text-base font-montserrat">Password</p>
                  </InputLabel>
                  <input
                    id="LoginPassword"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    onChange={(e) => handlePasswordChange(e)}
                    className="p-2 font-Montserrat rounded-lg bg-opacity-10 bg-white placeholder-white/30 text-white w-full text-sm focus:outline-[0.5px] focus:outline-white/10 focus:text-white dark:text-white xl:text-base xl:p-3"
                  />
                </form>
                <div
                  id="LoginForgotPassword"
                  className="w-full flex flex-row justify-end text-sm mt-2 mb-3 font-Montserrat"
                >
                  <Link to="/test" className="hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <div className="mt-2 mb-2">
                  <button
                    id="LoginButton"
                    onClick={(e) => checkCredentials(e)}
                    className="bg-[#A5D9D0] font-Montserrat font-extrabold text-black w-full text-base hover:bg-teal-400 py-2 rounded"
                  >
                    LOGIN
                  </button>
                </div>
                <div
                  id="LoginSignUp"
                  className="flex flex-row justify-center mt-2 text-sm font-Montserrat"
                >
                  <Link to="/register">
                    New to Doify? <b>Sign up</b> now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
