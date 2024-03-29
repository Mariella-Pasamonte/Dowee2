import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import loginImg from "../images/Login.png";
import loginImg2 from "../images/Login2.png";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) =>{
        setPassword(e.target.value);
    }
    const checkCredentials=(e)=>{
        setUsername(username);
        setPassword(password);
        navigate("/home");
    }
    return(
        <>
            <div classname=''>
                <div className="flex flex-col justify-center md:flex-row">
                    <div className="collapse rounded-md h-0 w-0 flex flex-col justify-center lg:h-dvh lg:w-full lg:visible">
                        <div className="flex flex-col justify-center bg-contain bg-no-repeat h-dvh bg-center xl:bg-cover xl:h-full" style={{ backgroundImage: `url(${loginImg})` }}>
                            <div className="flex flex-row justify-end">
                                <div className="flex flex-col justify-center h-full w-4/12 mr-28 xl:w-5/12 xl:mr-12 bg-gradient-to-r from-[#c9c9c9]/25 to-[#C4C4C4]/5 rounded-2xl">
                                    <div className="text-white flex flex-col pt-4 pb-8 px-8">
                                        <div className="text-4xl xl:text-5xl font-Iceland">
                                            Login
                                        </div>
                                        <hr className="mt-2 mb-2 w-28 xl:w-32"></hr>
                                        <div className="mb-2 xl:mb-5" >
                                            <p className="font-Montserrat font-light text-xl xl:text-2xl">Welcome to Doify</p>
                                        </div>
                                        <form>
                                            <div className="mt-3 xl:mt-5" >
                                                <p className="font-Montserrat text-base">Username</p>
                                            </div>
                                            <input 
                                                id="username" 
                                                name="username"
                                                type="text"
                                                placeholder="Enter your username" 
                                                onChange={handleUsernameChange}
                                                required
                                                className="p-2 font-Montserrat rounded-lg bg-opacity-10 bg-white text-white/25 w-full text-sm block focus:outline-[0.5px] focus:outline-white/10 focus:text-white dark:text-white xl:text-base xl:p-3"
                                            />
                                            <div className="mt-4 xl:mt-7" >
                                                <p className="text-base font-montserrat">Password</p>
                                            </div>
                                            <input 
                                                id="password" 
                                                name="password"
                                                type="password"
                                                placeholder="Enter your password" 
                                                onChange={handlePasswordChange}
                                                className="p-2 font-Montserrat rounded-lg bg-opacity-10 bg-white text-white/25 w-full text-sm focus:outline-[0.5px] focus:outline-white/10 focus:text-white dark:text-white xl:text-base xl:p-3"
                                            />
                                        </form>
                                        <div className="w-full flex flex-row justify-end text-sm mt-2 mb-3 font-Montserrat">
                                            <Link to="/test" className="hover:underline">Forgot Password?</Link>
                                        </div>
                                        <div className="mt-2 mb-2">
                                            <button onClick={() => checkCredentials()} className="bg-[#A5D9D0] font-Montserrat font-extrabold text-black w-full text-base hover:bg-teal-400 py-2 rounded">
                                                LOGIN
                                            </button>
                                        </div>
                                        <div className="flex flex-row justify-center mt-2 text-sm font-Montserrat">
                                            <Link to="/test">New to Doify? <b>Sign up</b> now</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>   
                        </div> 
                    </div>
                    <div className="visible rounded-md flex flex-col justify-center h-dvh w-full lg:h-0 lg:hidden lg:w-0"> 
                        <img src={loginImg2} alt="Login Page" className="h-auto rounded-md"/>
                        <div className="flex flex-row justify-center">
                            <div className="bg-gradient-to-r from-[#c9c9c9]/30 to-[#C4C4C4]/10 rounded-2xl text-white w-full flex flex-col pt-4 pb-8 px-8 md:w-3/4">
                                <div className="font-Iceland text-4xl xl:text-5xl">
                                    Login
                                </div>
                                <hr className="mt-2 mb-2 w-28 xl:w-32"></hr>
                                <div className="mb-2 xl:mb-5" >
                                    <p className="font-Montserrat font-light text-xl xl:text-2xl">Welcome to Doify</p>
                                </div>
                                <form>
                                    <div className="mt-3 xl:mt-5" >
                                        <p className="font-Montserrat text-base">Username</p>
                                    </div>
                                    <input 
                                        id="username" 
                                        name="username"
                                        type="text"
                                        placeholder="Enter your username" 
                                        onChange={handleUsernameChange}
                                        required
                                        className="p-2 font-Montserrat rounded-lg bg-opacity-10 bg-white text-white/25 w-full text-sm block focus:outline-[0.5px] focus:outline-white/10 focus:text-white dark:text-white xl:text-base xl:p-3"
                                    />
                                    <div className="mt-4 xl:mt-7" >
                                        <p className="text-base font-montserrat">Password</p>
                                    </div>
                                    <input 
                                        id="password" 
                                        name="password"
                                        type="password"
                                        placeholder="Enter your password" 
                                        onChange={handlePasswordChange}
                                        className="p-2 font-Montserrat rounded-lg bg-opacity-10 bg-white text-white/25 w-full text-sm focus:outline-[0.5px] focus:outline-white/10 focus:text-white dark:text-white xl:text-base xl:p-3"
                                    />
                                </form>
                                <div className="w-full flex flex-row justify-end text-sm mt-2 mb-3 font-Montserrat">
                                    <Link to="/test" className="hover:underline">Forgot Password?</Link>
                                </div>
                                <div className="mt-2 mb-2">
                                    <button onClick={() => checkCredentials()} className="bg-[#A5D9D0] font-Montserrat font-extrabold text-black w-full text-base hover:bg-teal-400 py-2 rounded">
                                        LOGIN
                                    </button>
                                </div>
                                <div className="flex flex-row justify-center mt-2 text-sm font-Montserrat">
                                    <Link to="/test">New to Doify? <b>Sign up</b> now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;