import React, {useState, useEffect} from "react";
//import {Link} from "react-router-dom";
import { ProjectModal } from "../components";
import Navbar from "../modules/navbar";
import Sidebar from "../modules/sidebar";
import Project from "../modules/project";
import axios from "axios";


const Home = () => {
    const [project, setProject] = useState(null);
    const [projList, setProjList] = useState(null);
    const [users, setUsers] = useState(null);
    const [openProjectModal, setOpenProjectModal] = useState(false);
    
    const getProject=(proj)=>{
        setProject(proj);
    };

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        setProject(project);
        axios.get('http://localhost:5000/home', {
          headers:{ 
            userId: userId,
          }
        })
        .then((response)=>{
            setProjList(response.data.projects);
            setUsers(response.data.users);
        })
        .catch((error) =>{
            console.log(error);
        });
    },[project])

    return(
        <div className='static flex flex-col h-dvh'>
            <div className='relative my-3 ml-3 flex flex-col h-full justify-center'>
                <div className='mb-3 mr-3'>
                    <Navbar/>
                </div>
                <div className="h-full flex flex-row">
                    <div className="h-full w-1/6 mr-2">
                        <Sidebar setProject={getProject} project={project} projList={projList} setProjList={setProjList} users={users}/>
                    </div>
                    <div className="relative h-full w-5/6 pl-2">
                    {project&&<ProjectModal isOpen={openProjectModal} closeModal={setOpenProjectModal} project={project} users={users}/>}
                        <div className="h-full border-y-[1px] border-l-[1px] border-white/20 bg-gradient-to-r from-[#6F6483]/60 to-[#4F2E5D]/60 rounded-l-3xl">
                            {project && <Project project={project} setOpenProjectModal={setOpenProjectModal} users={users}/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;