import React, { useState, useRef, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar } from "@natscale/react-calendar";
import { convertToBirthDate, getClickedDate, convertToDate} from "../utilities/date";
import {InputLabel, ErrorToast} from '../components';
import InputMask from 'react-input-mask';
import '@natscale/react-calendar/dist/main.css';
import axios from "axios";

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const today = new Date();
  const [calendarDate, setCalendarDate] = useState(today);
  const [contactNum, setContactNum] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showCalendar, setShowCalendar]= useState(false);
  const [isFilled, setIsFilled] = useState(true);
  const [isFilledError, setIsFilledError] = useState(false);
  const [isValidDateError, setIsValidDateError] = useState(false);
  const [existingUser, setExistingUser] = useState(false);
  const [existingUserError, setExistingUserError] = useState(false);
  const navigate = useNavigate();
  const calendarDivRef = useRef(null);
  const inputCalendarDivRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const calendarDivRect = calendarDivRef.current.getBoundingClientRect();
      if (inputCalendarDivRef.current && (!inputCalendarDivRef.current.contains(e.target)
      &&(e.clientX < calendarDivRect.left ||
      e.clientX > calendarDivRect.right ||
      e.clientY < calendarDivRect.top ||
      e.clientY > calendarDivRect.bottom)
      )) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [calendarDivRef,setShowCalendar]);

  const getBirthday = (date) =>{
    setBirthday(date);
  }

  const isDisabled = useCallback((date) => {
    return date > today;
  }, [today]);
  
  const getUserDetails = async(e) => {
    await axiosRegister();
  };  

  const axiosRegister = async (processing) => {
    if(isValidDateError == true){
      setIsFilledError(true);
      setIsFilled(false);
      return;
    } else if(firstName !== '' && lastName !== '' && emailAddress !== '' && birthday !== '' &&
    gender !== '' && contactNum !== '' && username !== '' && password !== ''){
      setIsFilled(true);
      const registerData = {
        fname: firstName,
        lname: lastName,
        email: emailAddress,
        gender: gender,
        birthday: birthday,
        contactNum: contactNum,
        username: username,
        password: password,
      };
      await axios
      .post("https://dowee2-server2.vercel.app/register", registerData)
      .then((res) => {
      const data = res.data;
      if (data === true) {
        setExistingUser(true);
        setExistingUserError(true);
        console.log("Account Exists");
      } else {
        console.log("Success: ", data);
        navigate("/home");
      }
      })
      .catch((error) => {
        console.log("Error: ", error);
      }); 
    } else{
      setIsFilledError(true);
      setIsFilled(false);
    }
  }
  var inputLabelClassName="flex flex-row mt-3";
  return(
    <>
      <div className='h-full w-full'>
        <div className="flex flex-col justify-center h-dvh bg-white/20">
          <div className="z-10 relative flex flex-row justify-center">
            <ErrorToast id="RegisterFillError" isError={isFilledError} setIsError={setIsFilledError}>
              <div className="ms-3 text-sm font-normal">
                Please fill out all required fields.
              </div>
            </ErrorToast>
            <ErrorToast id="RegisterDateError" isError={isValidDateError} setIsError={setIsValidDateError}>
              <div className="ms-3 text-sm font-normal">
                Please fill out the correct date.
              </div>
            </ErrorToast>
            <ErrorToast isError={existingUserError} setIsError={setExistingUserError}>
              <div  className="ms-3 text-sm font-normal">
                Account already exists
              </div>
            </ErrorToast>
            <div className="w-1/2 h-fit text-white rounded-md flex flex-col pt-4 pb-8 px-8 bg-white/10"> 
              <div className="text-4xl xl:text-5xl font-Iceland">
                Signup
              </div>
              <hr className="mt-2 mb-2 w-28 xl:w-32"></hr>
              <div className="mb-2 xl:mb-2" >
                <p className="font-Montserrat font-light text-xl xl:text-2xl">Register to Doify</p>
              </div>
              <form>
                <div className="flex flex-row justify-between">
                  <div className="w-1/3 mr-1">
                    <InputLabel id="RegisterFirstNameLabel" isFilled={isFilled?true:firstName!==''?true:false} classname={inputLabelClassName}>
                        <p className="font-Montserrat text-base">First Name</p>
                    </InputLabel>
                    <input 
                      id="fname" 
                      name="fname"
                      type="text"
                      value={firstName}
                      placeholder="Ex. John" 
                      onChange={e=>setFirstName(e.target.value)}
                      className="p-2 placeholder-white/30 font-Montserrat border-0 rounded-lg bg-opacity-10 bg-white w-full text-base block focus:outline-none focus:ring-0 focus:text-white dark:text-white"
                    />
                  </div>
                  <div className="w-1/3 ml-1 mr-1">
                    <InputLabel id="RegisterLastNameLabel" isFilled={isFilled?true:lastName!==''?true:false} classname={inputLabelClassName}>
                      <p className="font-Montserrat text-base">Last Name</p>
                    </InputLabel>
                    <input 
                      id="lname" 
                      name="lname"
                      type="text"
                      value={lastName}
                      placeholder="Ex. Cena" 
                      onChange={e=>setLastName(e.target.value)}
                      className="p-2 placeholder-white/30 font-Montserrat border-0 rounded-lg bg-opacity-10 bg-white w-full text-base block focus:outline-none focus:ring-0 focus:text-white dark:text-white"
                    />
                  </div>
                  <div className="w-1/3 ml-1">
                    <InputLabel id="RegisterGenderLabel" isFilled={isFilled?true:gender!==''?true:false} classname={inputLabelClassName}>
                      <p className="font-Montserrat text-base">Gender</p>
                    </InputLabel>
                    <ul className="items-center w-full text-sm font-medium bg-white bg-opacity-10 rounded-lg md:flex">
                      <li className="w-full border-b border-gray-200 md:border-b-0 md:border-r md:w-1/2 dark:border-gray-600">
                        <div className="flex items-center pl-2 py-2">
                          <input 
                            id="horizontal-list-radio-license" 
                            type="radio" 
                            value="female"
                            checked={gender === 'female'}
                            onChange={e=>setGender(e.target.value)} 
                            name="list-radio" 
                            className=" text-blue-600 bg-gray-100 border-gray-300 focus:ring-0 dark:focus:ring-0"
                          />
                          <label className="w-full ml-2 text-base font-light font-mono text-gray-200">Female</label>
                        </div>
                      </li>
                      <li className="w-1/2 border-gray-200 ">
                        <div className="flex items-center pl-2 py-1">
                          <input 
                            id="horizontal-list-radio-license" 
                            type="radio" 
                            value="male"
                            checked={gender === 'male'}
                            onChange={e=>setGender(e.target.value)} 
                            name="list-radio" 
                            className="  text-blue-600 bg-gray-100 border-gray-300 focus:ring-0 dark:focus:ring-0"
                          />
                          <label className="w-full ml-2 text-base font-light font-mono text-gray-200">Male</label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col w-1/2">
                    <InputLabel 
                      id="RegisterBirthdayLabel" 
                      isFilled={isFilled?true:birthday!==''?true:false} 
                      classname={inputLabelClassName}
                    >
                      <p className="font-Montserrat text-base">Birthday</p>
                    </InputLabel>
                    <div ref={inputCalendarDivRef} className=" relative">
                      <InputMask
                        id="birthday"
                        name="birthday"
                        type="text"
                        mask="99/99/9999"
                        value={birthday}
                        onClick={(e)=>{
                          setShowCalendar(true);
                        }}
                        onChange={(e)=>getBirthday(e.target.value)}
                        placeholder="Ex. mm/dd/yyyy"
                        className="p-2 placeholder-white/30 font-Montserrat border-0 rounded-lg bg-opacity-10 bg-white w-full text-base block focus:outline-none focus:ring-0 focus:text-white dark:text-white"
                      />
                      <div ref={calendarDivRef} className={`z-20 h-fit absolute ${showCalendar?'inline':'hidden'}`}>
                        <Calendar
                          useDarkMode
                          value={calendarDate}
                          onChange={(e)=>convertToBirthDate(getClickedDate(e), setIsValidDateError, setCalendarDate, setBirthday, setShowCalendar)}
                          onClick={(e)=>console.log("calendar:", calendarDivRef.current && !calendarDivRef.current.contains(e.target))}
                          className='border-[1px] h-fit bg-[#1B333A]'
                          isDisabled={isDisabled}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 ml-2">
                    <InputLabel id="RegisterContactNumLabel" isFilled={isFilled?true:contactNum!==''?true:false} classname={inputLabelClassName}>
                      <p className="font-Montserrat text-base">Contact Number</p>
                    </InputLabel>
                    <InputMask 
                      id="contactNum"
                      mask="+9999999999"
                      name="contactNum"
                      type="text"
                      value={contactNum}
                      placeholder="Ex. +9123456789" 
                      onChange={(e)=>setContactNum(e.target.value)}
                      className="p-2 placeholder-white/30 font-Montserrat border-0 rounded-lg bg-opacity-10 bg-white w-full text-base block focus:outline-none focus:ring-0 focus:text-white dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <InputLabel id="RegisterEmailAddressLabel" isFilled={isFilled?true:emailAddress!==''?true:false} classname={inputLabelClassName}>
                    <p className="font-Montserrat text-base">Email Address</p>
                  </InputLabel>
                  <input 
                    id="emailAddress" 
                    name="emailAddress"
                    type="text"
                    value={emailAddress}
                    placeholder="Ex. johncena@email.com" 
                    onChange={(e)=>setEmailAddress(e.target.value)}
                    required
                    className="p-2 placeholder-white/30 font-Montserrat border-0 rounded-lg bg-opacity-10 bg-white w-full text-base block focus:outline-none focus:ring-0 focus:text-white dark:text-white"
                  />
                </div>
                <div className="flex flex-row justify-between">
                  <div className="w-1/2 mr-2">
                    <InputLabel id="RegisterUsernameLabel" isFilled={isFilled?true:username!==''?true:false} classname={inputLabelClassName}>
                      <p className="font-Montserrat text-base">Username</p>
                    </InputLabel>
                    <input 
                      id="fname" 
                      name="fname"
                      type="text"
                      value={username}
                      placeholder="Ex. johncena" 
                      onChange={(e)=>setUsername(e.target.value)}
                      className="p-2 placeholder-white/30 font-Montserrat border-0 rounded-lg bg-opacity-10 bg-white w-full text-base block focus:outline-none focus:ring-0 focus:text-white dark:text-white"
                    />
                  </div>
                  <div className="w-1/2 ml-2">
                    <InputLabel id="RegisterPasswordLabel" isFilled={isFilled?true:password!==''?true:false} classname={inputLabelClassName}>
                      <p className="text-base font-montserrat">Password</p>
                    </InputLabel>
                    <input 
                      id="password" 
                      name="password"
                      type="password"
                      value={password}
                      placeholder="Enter your password" 
                      onChange={(e)=>setPassword(e.target.value)}
                      className="p-2 placeholder-white/30 font-Montserrat border-0 rounded-lg bg-opacity-10 bg-white w-full text-base block focus:outline-none focus:ring-0 focus:text-white dark:text-white"
                    />
                  </div>
                </div>
              </form>
              <div className="mt-3 mb-2">
                <button onClick={(e) => getUserDetails()} className="bg-[#A5D9D0] font-Montserrat font-extrabold text-black w-full text-base hover:bg-teal-400 py-2 rounded">
                  SIGNUP
                </button>
              </div>
              <div className="flex flex-row justify-center mt-2 text-sm font-Montserrat">
                <Link to="/">
                  Already have an account? <b>Sign in</b> here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
