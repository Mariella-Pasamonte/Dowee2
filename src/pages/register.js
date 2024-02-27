import React, {useState} from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Link, useNavigate} from "react-router-dom";
import loginImg from "../images/Login.png";
import loginImg2 from "../images/Login2.png";

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [contactNum, setContactNum] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userDetails, setUserDetails] = ([]);
    const navigate = useNavigate();

    
    console.log('gender:'+gender);
    
    function getUserDetails(){
        setUserDetails(previous=>[
            ...previous,
            {
                fname: firstName,
                lname: lastName,
                emAdd: emailAddress,
                gender: gender,
                contactNum: contactNum,
                username: username,
                password: password
            },
        ]);
        navigate("/home");
    }
    return(
        <>
            <div className='h-full w-full'>
                <div className="flex flex-col justify-center h-dvh bg-white/20">
                    <div className="flex flex-row justify-center">
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
                                        <div className="mt-3 xl:mt-3" >
                                            <p className="font-Montserrat text-base">First Name</p>
                                        </div>
                                        <input 
                                            id="fname" 
                                            name="fname"
                                            type="text"
                                            placeholder="Ex. John" 
                                            onChange={e=>setFirstName(e.target.value)}
                                            className="p-2 font-Montserrat rounded-lg bg-opacity-10 bg-white w-full text-base block focus:outline-[0.5px] focus:outline-white/10 focus:text-white dark:text-white"
                                        />
                                    </div>
                                    <div className="w-1/3 ml-1 mr-1">
                                        <div className="mt-3 xl:mt-3" >
                                            <p className="font-Montserrat text-base">Last Name</p>
                                        </div>
                                        <input 
                                            id="lname" 
                                            name="lname"
                                            type="text"
                                            placeholder="Ex. Cena" 
                                            onChange={e=>setLastName(e.target.value)}
                                            className="p-2 font-Montserrat rounded-lg bg-opacity-10 bg-white text-white/25 w-full text-base block focus:outline-[0.5px] focus:outline-white/10 focus:text-white dark:text-white"
                                        />
                                    </div>
                                    <div className="w-1/3 ml-1">
                                        <div className="mt-3 xl:mt-3" >
                                            <p className="font-Montserrat text-base">Gender</p>
                                        </div>
                                        <ul className="items-center w-full text-sm font-medium bg-white bg-opacity-10 rounded-lg sm:flex">
                                            <li className="w-1/2 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                                <div className="flex items-center pl-2 py-2">
                                                    <input 
                                                        id="horizontal-list-radio-license" 
                                                        type="radio" 
                                                        value="female"
                                                        checked={gender === 'female'}
                                                        onChange={e=>setGender(e.target.value)} 
                                                        name="list-radio" 
                                                        className=" text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-none"
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
                                                        className=" text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-none"
                                                    />
                                                    <label className="w-full ml-2 text-base font-light font-mono text-gray-200">Male</label>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <div className="w-1/2 ml-2">
                                        <div className="mt-3 xl:mt-3" >
                                            <p className="font-Montserrat text-base">Birthday</p>
                                        </div>
                                        <DatePicker
                                            value={birthday}
                                            onChange={(e) => setBirthday(e.target.value)}
                                            className="p-1"
                                        />
                                    </div>
                                    <div className="w-1/2 ml-2">
                                        <div className="mt-3 xl:mt-3" >
                                            <p className="font-Montserrat text-base">Contact Number</p>
                                        </div>
                                        <input 
                                            id="contactNum" 
                                            name="contactNum"
                                            type="text"
                                            placeholder="Ex. +9123456789" 
                                            onChange={e=>setContactNum(e.target.value)}
                                            className="p-2 font-Montserrat rounded-lg bg-opacity-10 bg-white w-full text-base block focus:outline-[0.5px] focus:outline-white/10 focus:text-white dark:text-white"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="mt-3 xl:mt-3" >
                                        <p className="font-Montserrat text-base">Email Address</p>
                                    </div>
                                    <input 
                                        id="emailAddress" 
                                        name="emailAddress"
                                        type="text"
                                        placeholder="Ex. @johncena@email.com" 
                                        onChange={e=>setEmailAddress(e.target.value)}
                                        required
                                        className="p-2 font-Montserrat rounded-lg bg-opacity-10 bg-white text-white/25 w-full text-base block focus:outline-[0.5px] focus:outline-white/10 focus:text-white dark:text-white"
                                    />
                                </div>
                                <div className="flex flex-row justify-between">
                                    <div className="w-1/2 mr-2">
                                        <div className="mt-3 xl:mt-3" >
                                            <p className="font-Montserrat text-base">Username</p>
                                        </div>
                                        <input 
                                            id="fname" 
                                            name="fname"
                                            type="text"
                                            placeholder="Ex. johncena" 
                                            onChange={e=>setUsername(e.target.value)}
                                            className="p-2 font-Montserrat rounded-lg bg-opacity-10 bg-white w-full text-base block focus:outline-[0.5px] focus:outline-white/10 focus:text-white dark:text-white"
                                        />
                                    </div>
                                    <div className="w-1/2 ml-2">
                                            <div className="mt-4 xl:mt-3" >
                                                <p className="text-base font-montserrat">Password</p>
                                            </div>
                                            <input 
                                                id="password" 
                                                name="password"
                                                type="password"
                                                placeholder="Enter your password" 
                                                onChange={e=>setPassword(e.target.value)}
                                                className="p-2 font-Montserrat rounded-lg bg-opacity-10 bg-white w-full text-base block focus:outline-[0.5px] focus:outline-white/10 focus:text-white dark:text-white"
                                            />
                                    </div>
                                </div>
                            </form>
                            <div className="mt-3 mb-2">
                                <button onClick={() => getUserDetails()} className="bg-[#A5D9D0] font-Montserrat font-extrabold text-black w-full text-base hover:bg-teal-400 py-2 rounded">
                                    SIGNUP
                                </button>
                            </div>
                            <div className="flex flex-row justify-center mt-2 text-sm font-Montserrat">
                                <Link to="/">Already have an account? <b>Sign in</b> here</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;