import React, {useState, useEffect, useRef} from 'react';
//import {Link} from "react-router-dom";
import Task from "./task";
import Invoice from "./invoice";
import {TaskModal} from "../components";

function Project(props){
    const [openTaskModal, setOpenTaskModal] = useState(false);
    const [projectButtonsFocus, setProjectButtonsFocus] = useState(0);
    const [taskOrInvoiceFocus, setTaskOrInvoiceFocus] = useState(0);
    const [tasks, setTasks] = useState([]);
    const [invoices, setInvoices] = useState(null);

    function addNewTask(newTask){
        (tasks !== null ? 
            (
                setTasks(previous=>[
                ...previous,
                newTask
                ])
            )
            :
            (
                setTasks([newTask])
            )   
        )
        addNewInvoice(newTask);
    }

    function addNewInvoice(newInvoice){
        (invoices !== null ?
            (
                setInvoices(previous=>[
                ...previous,
                newInvoice
                ])
            )
            :
            (
                setInvoices([newInvoice])
            )
        )
    }

    const onClickCreateTask = () =>{
        setTaskOrInvoiceFocus(0);
        setOpenTaskModal(true);
    }

    const onClickInvoice = () =>{
        setTaskOrInvoiceFocus(1);
    }

    console.log("Project page:", props.project);
    return(
        <>
            <div className="h-full w-full px-5 py-3" >
                <div className='relative flex flex-col '>
                    <div className='flex flex-row w-full justify-between'>
                        <div className='flex flex-col justify-between pt-2'>
                            <div className='flex flex-row'>
                                <div className='text-2xl mb-2 mr-2 w-fit text-white'>
                                    {props.project.name}
                                </div>
                                <div className='relative flex flex-row just'>
                                    <button
                                        onClick={(e)=>props.setOpenProjectModal((prev)=>!prev)}
                                        className='flex flex-col mx-2 text-[#B8B8E7] justify-center'
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <hr className="w-full h-1 bg-[#8381BB] border-0 rounded dark:bg-gray-700"/>
                        </div>
                        <div className='flex flex-row text-[#AEAEE3] font-thin w-64 mb-3 pr-2 justify-between'>
                            <div className="relative flex flex-col justify-center h-full">
                                <button key={2} onClick={() => setProjectButtonsFocus(2)} className={`p-1 pr-3 pl-8 rounded-md ${projectButtonsFocus === 2 ? 'bg-[#4A4999] text-[#D5D5FF]' : 'bg-[#292944]'} `}>
                                    <div className="absolute -inset-x-0 -inset-y-0 top-1/4 left-[12%] flex pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                    </div>
                                    Edit
                                </button>
                            </div>
                            <div className="relative flex flex-col justify-center h-full">
                                <button key={1} onClick={() => setProjectButtonsFocus(1)} className={`p-1 pr-3 pl-8 rounded-md ${projectButtonsFocus === 1 ? 'bg-[#4A4999] text-[#D5D5FF]' : 'bg-[#292944]'} `}>
                                    <div className="absolute -inset-x-0 -inset-y-0 top-1/4 left-[10%] flex pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg>
                                    </div>
                                    Star
                                </button>
                            </div>
                            <div className="relative flex flex-col justify-center h-full">
                                <button key={0} onClick={() => setProjectButtonsFocus(0)} className={`p-1 pr-3 pl-8 rounded-md ${projectButtonsFocus === 0 ? 'bg-[#4A4999] text-[#D5D5FF]' : 'bg-[#292944]'} `}>
                                    <div className="absolute -inset-x-0 -inset-y-0 top-1/4 left-[10%] flex pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>
                                    </div>
                                    Finish
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr className="absolute w-full h-0.5 inset-y-[49px] bg-[#8381BB] border-0 rounded dark:bg-gray-700"/>
                    <div className='flex flex-row justify-between w-56 py-2'>
                        <div className="relative flex flex-col justify-center h-full text-white font-thin">
                            <button key={0}  onClick={() => onClickCreateTask()} className={`p-1 pr-3 pl-8 rounded-md ${taskOrInvoiceFocus === 0 ? 'bg-[#397AB9]': 'bg-[#7890A8]'} `}>
                                <div className="absolute -inset-x-0 -inset-y-0 top-[20%] left-[6%] flex pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </div>
                                Create task
                            </button>
                        </div>
                        <div className="relative flex flex-col justify-center h-full text-white font-thin">
                            <div className="absolute pl-2 flex pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                </svg>
                            </div>
                            <button key={1} onClick={() => onClickInvoice()} className={`p-1 pr-3 pl-8 rounded-md ${taskOrInvoiceFocus === 1 ? 'bg-[#397AB9]': 'bg-[#7890A8]'} `}>
                                Invoice
                            </button>
                        </div>
                    </div>
                    <div className='w-1/3'>
                        <TaskModal isOpen={openTaskModal} closeModal={setOpenTaskModal} addNewTasks={addNewTask} tasks={tasks} projectId={props.project.id}/>
                    </div>
                    <div>
                        {taskOrInvoiceFocus === 0 ? <Task tasks={tasks} projectId={props.project.id} />:<Invoice invoices={invoices} projectId={props.project.id} />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Project;