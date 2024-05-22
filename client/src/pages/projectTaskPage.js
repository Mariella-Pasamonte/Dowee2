import React, {useState, useEffect, useCallback, useContext} from "react";
//import {Link} from "react-router-dom";
import { ProjectModal } from "../components";
import Navbar from "../modules/navbar";
import Sidebar from "../modules/sidebar";
import ProjectTask from "../modules/projectTask";
import axios from "axios";
import AuthContext from "../utilities/AuthContext";
import { useParams } from "react-router-dom";

const ProjectTaskPage = (props) => {
    const {name, userid} = useParams();
    console.log("projectname:", name);
    console.log("projectuserid:", userid)
    const [projList, setProjList] = useState(null);
    const [project, setProject] = useState(null);
    const [projectFocus, setProjectFocus] = useState(null);
    const [tasks, setTasks] = useState(null);
    const [users, setUsers] = useState(null);
    const [hourlog, setHourlog] = useState(null);
    const [openProjectModal, setOpenProjectModal] = useState(false);
    const {userID} = useContext(AuthContext);

    const memoizedFetchData = useCallback((userId) => {
        axios
        .get('https://dowee2-server2.vercel.app/home', {
        // .get('http://localhost:3000/home', {
          headers:{ 
            userId: userId
          }
        })
        .then((response)=>{
            setProjList(response.data.projects);
            setTasks(response.data.tasks);
            setUsers(response.data.users);
            setHourlog(response.data.hourlog);
            setProject(response.data.projects.find((proj)=>proj.userid==userid&&proj.name==name));
            setProjectFocus(response.data.projects.find((proj)=>proj.userid===userid&&proj.name===name&&proj.id));
        })
        .catch((error) =>{
            console.log(error);
        });
    },[name, userid, setProjList, setTasks, setHourlog]);

    useEffect(() => {
        memoizedFetchData(userID);
    },[ userID, memoizedFetchData])

    let username = users && users.find(user => user.id === userID).username;

    return( 
        <div className='static flex flex-col h-dvh'>
            <div className='relative my-3 ml-3 flex flex-col h-full justify-center'>
                <div className='mb-3 mr-3'>
                    <Navbar user={username} userid={userID}/>
                </div>
                <div className="h-full flex flex-row">
                    <div className="h-full w-1/6 mr-2">
                        <Sidebar projectFocus={projectFocus} projList={projList} users={users}/>
                    </div>
                    <div className="relative h-full w-5/6 pl-2">
                        {project&&<ProjectModal isOpen={openProjectModal} closeModal={setOpenProjectModal} project={project} users={users}/>}
                        <div className="h-full border-y-[1px] border-l-[1px] border-white/20 bg-gradient-to-r from-[#6F6483]/60 to-[#4F2E5D]/60 rounded-l-3xl">
                            {project && 
                                <ProjectTask 
                                    project={project} 
                                    setOpenProjectModal={setOpenProjectModal} 
                                    projects={projList}  
                                    tasks={tasks} 
                                    users={users} 
                                    hourlog={hourlog} 
                                    fetchData={memoizedFetchData}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectTaskPage;