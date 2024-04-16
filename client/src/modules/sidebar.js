import React, {useState, useEffect, useRef} from 'react';
import { 
    AddEmployeesModal,
    AddProjectModal, 
    EditEmployeesModal,
    EditProjectModal,
    Tooltips
} from '../components';
import axios from 'axios';

function Sidebar(props){
    const [openAddProjectModal, setOpenAddProjectModal] = useState(false);
    const [openEditProjectModal, setOpenEditProjectModal] = useState(false);
    const [editProject, setEditProject] = useState(null);
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const [projectFocus, setProjectFocus] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [dropdownId, setDropdownId] = useState(null);
    const [employees, setEmployees] = useState(null);
    const [openAddEmployeesModal, setOpenAddEmployeesModal] = useState(false);
    const [openEditEmployeesModal, setOpenEditEmployeesModal] = useState(false);
    var projLength = (props.projList ? props.projList.length : 0)

    const toggleTooltipEnter = () => {
        setIsTooltipOpen(true);
    }
    const toggleTooltipLeave = () => {
        setIsTooltipOpen(false);
    }

    const getEmployees = (newEmployee) =>{
        const isEmp = employees!==null&&employees.find((emp) => !emp.id?emp===newEmployee:emp.id === newEmployee.id);
        (employees !== null ? 
            (
                !isEmp &&
                setEmployees(previous=>[
                ...previous,
                newEmployee
                ])
            )
            :   
            (
                setEmployees([newEmployee])
            )
        )
    }

    const removeEmployee = (employeeId) => {
        const editedEmployees = employees.filter(employee => employee.id !== employeeId);
        setEmployees(editedEmployees);
    }

    function addNewProject(newProject){
        axios
        .post("http://localhost:5000/home", {
            headers:{
                function: 'addNewProject'
            },newProject
        })
        .then((res) => {
            console.log(newProject);
        })
        .catch((error) => {
            console.log("Error: ", error);
        }); 
        props.setProject(newProject) 
        setProjectFocus(newProject.id)
    }

    function editedProject(editedProject){
        console.log("the finalize edited project:",editedProject);
        axios
        .post("http://localhost:5000/home", {
            headers:{
                function: 'editProject'
            },editedProject
        })
        .then((res) => {
            console.log(editedProject);
        })
        .catch((error) => {
            console.log("Error: ", error);
        }); 
        props.setProject(editedProject) 
        setProjectFocus(editedProject.id)
    }

    const handleButtonClick = (projectId) => {
        setProjectFocus(projectId);
        const proj = props.projList.find((proj) => proj.id === projectId);
        props.setProject(proj);
    };

    const handleOpenDropdown = (projectId) => {
        setDropdownId(projectId);
        setOpenDropdown((prev)=>!prev);
    };

    function clickEdit(project){
        setOpenDropdown(false);
        setOpenEditProjectModal(true);
        setEditProject(project)
    }
    
    useEffect(() => {
        setEditProject(editProject);
    },[])
    return(
        <>
            <div className="h-full w-full">
                <div className='h-full flex flex-col border-[1px] border-white/20 text-[#D5D8DF] p-3 bg-gradient-to-r from-[#6E797D]/50 via-[#556469]/50 to-[#3B4E54]/50 rounded-lg'>
                    <div>
                        <div className='h-fit flex flex-row justify-between'>
                            <div className='font-Inter text-xl my-1'>
                                My Projects
                            </div>
                            <div className='relative w-1/5 flex flex-col justify-center'>
                                <div className='w-fit'>
                                    <button 
                                        onMouseEnter={toggleTooltipEnter}
                                        onMouseLeave={toggleTooltipLeave}
                                        data-tooltip-target="addProjectTooltip"
                                        data-tooltip-placement="bottom"
                                        type="button"
                                        onClick={()=>{
                                            setOpenAddProjectModal(true);
                                        }}  
                                        className="p-1 bg-[#23353C] rounded hover:bg-[#3A6576]"
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            viewBox="0 0 24 24" 
                                            fill="currentColor" 
                                            className="w-5 h-5"
                                        >
                                            <path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875ZM12.75 12a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V18a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V12Z" clipRule="evenodd" />
                                            <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
                                        </svg>
                                    </button>
                                    <Tooltips id="addProjectTooltip" isOpen={isTooltipOpen} tooltipArrowClassName="tooltip-arrow -top-1 pl-2">
                                        <div
                                            className='w-full px-4 py-2 text-sm text-center hover:bg-slate-500'
                                        >
                                            Add Project
                                        </div>
                                    </Tooltips>
                                </div>
                            </div>
                        </div>
                        <AddProjectModal isOpen={openAddProjectModal} closeModal={setOpenAddProjectModal} setOpenEmpModal={setOpenAddEmployeesModal} addNewProject={addNewProject} projLength={projLength} employees={employees} setEmployees={setEmployees}/>                        
                        <AddEmployeesModal isOpen={openAddEmployeesModal} closeModal={setOpenAddEmployeesModal} employees={employees} getEmployees={getEmployees} removeEmployee={removeEmployee} users={props.users}/>
                        {editProject&&<EditProjectModal isOpen={openEditProjectModal} closeModal={setOpenEditProjectModal} setOpenEmpModal={setOpenEditEmployeesModal} editedProject={editedProject} project={editProject} employees={employees} setEmployees={setEmployees} users={props.users}/>}
                        {employees&&<EditEmployeesModal isOpen={openEditEmployeesModal} closeModal={setOpenEditEmployeesModal} employees={employees} getEmployees={getEmployees} removeEmployee={removeEmployee} users={props.users}/>}                   
                        
                        <div className='mt-2'>
                            <hr className="w-full border-[#A4C9C5]"></hr>
                        </div>
                        <div className='flex flex-row my-3'>
                            <div className='w-full relative'>
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                </div>
                                <input 
                                    id="searchbar" 
                                    name="searchbar"
                                    type="text"
                                    placeholder='Search'
                                    className="p-2 pl-8 font-Inter rounded-lg bg-inherit border-[#B2F6FF] border-[1px] placeholder-[#9FADBC]/80 text-white w-full text-sm focus:outline-none dark:text-white focus:text-white"
                                >
                                </input>
                            </div>
                        </div>
                        <div>
                            { props.projList && 
                                <div className="h-fit">
                                    {props.projList.map((project)=>
                                        <button 
                                            key={project.id}
                                            onClick={(e) => handleButtonClick(project.id)}
                                            className={`flex flex-row w-full justify-between pt-1 px-1 rounded-md ${ projectFocus === project.id ?'bg-white/20':null}`}
                                        >
                                            <div className='flex flex-row'>
                                                <div className='flex flex-col font-bold'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mb-[-3px]">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                    </svg>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mt-[-3px]">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                                    </svg>
                                                </div>
                                                <div className='ml-2 text-md font-Inter'> {project.name} </div>
                                            </div> 
                                            <div className='relative'>
                                                <div 
                                                    data-tooltip-target={project.id} 
                                                    data-tooltip-placement="bottom"
                                                    onClick={()=>handleOpenDropdown(project.id)} 
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                                    </svg>
                                                </div>
                                                <Tooltips id={project.id} isOpen={dropdownId===project.id ? openDropdown : false} tooltipArrowClassName='tooltip-arrow -top-1'>
                                                    <div 
                                                        onClick={()=>clickEdit(project)} 
                                                        className="z-20 w-full px-4 mt-1 py-2 text-sm hover:bg-slate-500"
                                                    >
                                                        Edit Project
                                                    </div> 
                                                </Tooltips> 
                                            </div>
                                        </button>
                                    )}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;