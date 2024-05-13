import React, {useState, useEffect, useCallback} from "react";
//import {Link} from "react-router-dom";
import { ProjectModal } from "../components";
import Navbar from "../modules/navbar";
import Sidebar from "../modules/sidebar";
import Project from "../modules/project";
import axios from "axios";


const Home = () => {
    const [projList, setProjList] = useState(null);
    const [project, setProject] = useState(null);
    const [users, setUsers] = useState(null);
    const [tasks, setTasks] = useState(null);
    const [hourlog, setHourlog] = useState(null);
    const [openProjectModal, setOpenProjectModal] = useState(false);
    const userId = parseInt(localStorage.getItem('userId'));
    const projectId = parseInt(localStorage.getItem('projectId'));

    const getProject=(proj)=>{
        setProject(proj);
    };

    const memoizedFetchData = useCallback((userId) => {
        axios
        .get('https://dowee2-server2.vercel.app/home', {
          headers:{ 
            userId: userId
          }
        })
        .then((response)=>{
            setProjList(response.data.projects);
            setProject(response.data.projects.find((proj)=>proj.id===projectId));
            setUsers(response.data.users);
            setTasks(response.data.tasks);
            setHourlog(response.data.hourlog);
            console.log('users:', response.data.users);
        })
        .catch((error) =>{
            console.log(error);
        });
    },[projectId, setProjList, setProject, setUsers, setTasks, setHourlog]);

    useEffect(() => {
        memoizedFetchData(userId);
    },[userId, memoizedFetchData])

    return(
        <div className='static flex flex-col h-dvh'>
            <div className='relative my-3 ml-3 flex flex-col h-full justify-center'>
                <div className='mb-3 mr-3'>
                    <Navbar/>
                </div>
                <div className="h-full flex flex-row">
                    <div className="h-full w-1/6 mr-2">
                        <Sidebar setProject={getProject} project={project} projList={projList} setProjList={setProjList} users={users} hourlog={hourlog} fetchData={memoizedFetchData}/>
                    </div>
                    <div className="relative h-full w-5/6 pl-2">
                    {project&&<ProjectModal isOpen={openProjectModal} closeModal={setOpenProjectModal} project={project} users={users}/>}
                        <div className="h-full border-y-[1px] border-l-[1px] border-white/20 bg-gradient-to-r from-[#6F6483]/60 to-[#4F2E5D]/60 rounded-l-3xl">
                            {project && <Project project={project} setOpenProjectModal={setOpenProjectModal} users={users} tasks={tasks} hourlog={hourlog} fetchData={memoizedFetchData}/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;