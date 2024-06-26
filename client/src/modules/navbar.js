import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthContext from "../utilities/AuthContext";
import { Tooltips } from '../components';

function Navbar(props){
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const { logout } = useContext(AuthContext);

    const toggleTooltipEnter = () => {
        setIsTooltipOpen(true);
    }
    
    const toggleTooltipLeave = () => {
        setIsTooltipOpen(false);
    }

    const loggingOut = () =>{
        logout();
    }
   
    

    return(
        <>
            <div className="flex flex-row justify-start">
                <div className='flex flex-row justify-between w-full bg-[#2E4A55] font-Iceland text-5xl pl-5 pr-8 py-2 rounded-lg'>
                    <Link to="/home" className='flex flex-row w-fit'>
                        <div className='text-[#A5D9D0]'>DO</div>
                        <div className='text-white'>IFY</div>
                    </Link>
                    <div className='flex flex-row h-full'>
                        <div className='flex flex-col justify-center h-full text-white font-Montserrat text-[20px]'>
                            Welcome to doify {props.user}
                        </div>
                        <button 
                            onMouseEnter={(e)=>toggleTooltipEnter}
                            onMouseLeave={(e)=>toggleTooltipLeave}
                            onClick={(e)=>loggingOut()}
                            className='text-white hover:bg-white/20 p-2 rounded-full'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path fill-rule="evenodd" d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z" clip-rule="evenodd" />
                            </svg>
                        </button>
                        <Tooltips id="logoutTooltip" isOpen={isTooltipOpen} tooltipArrowClassName="tooltip-arrow -top-1 pl-2">
                            <div className='w-full px-3 py-1 text-sm text-center'>
                                Logout
                            </div>
                        </Tooltips>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;