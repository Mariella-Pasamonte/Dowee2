import React, {useState, useEffect} from 'react';
//import {Link} from "react-router-dom";
import defaultProfile from "../images/doifyLogoWhite.png"
import ProjectModal from "../components/projectModal";

const list = [
    {
        id: 0,
        name: 'Test Project',
        clientName: 'Random Client',
        clientemAdd: 'randomclient@rand.com',
        clientConNum: '+9999999999',
        desc: 'This is a description of the Test Project.',
    },
];


function Sidebar(){
    const [openModal, setOpenModal] = useState(false)
    const [projList, setProjList] = useState(list)
    var newProject = []
    var length = projList.length

    function addNewProject(newProject){
        setProjList(previous=>[
                ...previous,
                newProject
            ]
        )        
    }

    useEffect(()=>{
        console.log(projList);
        setProjList(projList);
    },[projList])
    return(
        <>
            <div className="h-full w-full">
                <div className=' h-full flex flex-col border-[1px] border-white/20 text-[#D5D8DF] p-3 bg-gradient-to-r from-[#6E797D]/50 via-[#556469]/50 to-[#3B4E54]/50 rounded-lg'>
                    <div>
                        <div className='h-fit flex flex-row justify-between'>
                            <div className='font-Inter text-xl my-1'>
                                My Projects
                            </div>
                            <div className='w-1/5 flex flex-col justify-center'>
                                <button 
                                    onClick={()=>setOpenModal(true)}
                                    className="w-3/4 h-fit p-1 bg-[#23353C] flex flex-row justify-center rounded text-center hover:bg-[#3A6576]"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875ZM12.75 12a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V18a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V12Z" clipRule="evenodd" />
                                        <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
                                    </svg>
                                </button>
                                <div className='w-1/4 flex flex-col justify-center'>
                                    {openModal && <ProjectModal closeModal={setOpenModal} projects={addNewProject} length={length}/>}
                                </div>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <hr className="w-full border-[#A4C9C5]"></hr>
                        </div>
                        <div className='flex flex-row my-3'>
                            <div className='w-full'>
                                <input 
                                    id="searchbar" 
                                    name="searchbar"
                                    type="text"
                                    placeholder='Search'
                                    className="p-2 font-Inter rounded-lg bg-inherit border-[#B2F6FF] border-[1px] text-[#9FADBC]/80 w-full text-sm focus:outline-none dark:text-white focus:text-white"
                                >
                                </input>
                            </div>
                        </div>
                        <div>
                            <ul className='flex flex-col'>
                                {projList.map((project)=> <li key={project.id}>{project.name}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;
/*
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
                        
*/