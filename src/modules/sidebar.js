import React, {useState} from 'react';
//import {Link} from "react-router-dom";
import defaultProfile from "../images/doifyLogoWhite.png"
import ProjectModal from "../components/projectModal";

function Sidebar(){
    const [openModal, setOpenModal] = useState(false)
    return(
        <>
            <div className="h-full w-full">
                <div className='h-full flex flex-col border-[1px] border-white/20 text-[#D5D8DF] p-3 bg-gradient-to-r from-[#6E797D]/50 via-[#556469]/50 to-[#3B4E54]/50 rounded-lg'>
                    <div className='flex flex-row mb-2'>
                        <div className='w-1/3 mr-3'>
                            <img className="w-full rounded-full" src={defaultProfile} alt="Rounded avatar"/>
                        </div>
                        <div className='w-2/3 ml-3 py-1 flex flex-col justify-between pr-3'>
                            <div>
                                <div className='font-Inter text-base font-thin'>
                                    Christian Barte
                                </div>
                                <div className='font-Inter text-xs font-thin'>
                                    Profile
                                </div>
                            </div>
                            <button className='bg-[#23353C] text-xs rounded py-1 hover:bg-[#3A6576]'>
                                Edit Profile
                            </button>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <hr className="w-full border-[#A4C9C5]"></hr>
                    </div>
                    <div>
                        <div className='font-Inter text-xl my-4'>
                            My projects
                        </div>
                        <div className='flex flex-row my-3'>
                            <div className='w-3/4 mr-2'>
                                <input 
                                    id="searchbar" 
                                    name="searchbar"
                                    type="text"
                                    defaultValue="Search" 
                                    className="p-2 font-Inter rounded-lg bg-inherit border-[#B2F6FF] border-[1px] text-[#9FADBC]/80 w-full text-sm focus:text-white3"
                                >
                                </input>
                            </div>
                            <div className='w-1/4 flex flex-col justify-center'>
                                <button 
                                    onClick={()=>{setOpenModal(true)}}
                                    className="w-full bg-[#23353C] text-sm rounded py-2 text-center pr-2 hover:bg-[#3A6576] font-Inter"
                                >
                                    + New
                                </button>
                                {openModal && <ProjectModal closeModal={setOpenModal}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;