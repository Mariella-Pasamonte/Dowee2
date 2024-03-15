import React, {useState, useEffect} from "react";
//import {Link} from "react-router-dom";
import Navbar from "../modules/navbar";
import Sidebar from "../modules/sidebar";
import Project from "../modules/project";


const Home = () => {
    const [project, setProject] = useState(null);
    
    const getProject = (clickedProject) => {
        setProject(clickedProject);
    }

    return(
        <>
            <div className='static flex flex-col h-dvh'>
                <div className='relative my-3 ml-3 flex flex-col h-full'>
                    <div className='mb-3 mr-3'>
                        <Navbar/>
                    </div>
                    <div className="h-full flex flex-row">
                        <div className="h-full w-1/6 mr-2">
                            <Sidebar selectedProject={getProject}/>
                        </div>
                        <div className="h-full w-5/6 pl-2">
                            <div className="h-full border-y-[1px] border-l-[1px] border-white/20 bg-gradient-to-r from-[#6F6483]/60 to-[#4F2E5D]/60 rounded-l-3xl">
                                {project && <Project project={project} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;