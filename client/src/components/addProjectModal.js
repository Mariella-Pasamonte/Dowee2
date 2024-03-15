import React, {useState, useEffect, useRef} from "react";
import { Calendar } from "@natscale/react-calendar";
import InputMask from 'react-input-mask';
import { convertToDate, onChangeDate} from '../utilities/date';

function AddProjectModal({ closeModal, projects, length}){
    const [projTitle, setProjTitle] = useState('Project '+String(length).padStart(2,'0'));
    const [clientName, setClientName]= useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [contactNum, setContactNum] = useState('');
    const [projDescription, setProjDescription] = useState(false);
    const [showIssueCalendar, setShowIssueCalendar] = useState("");
    const [issuedDate, setIssuedDate] = useState("");
    const [issuedDateCalendar, setIssuedDateCalendar] = useState(new Date());
    const [showDueCalendar, setShowDueCalendar] = useState(false);
    const [dueDate, setDueDate] = useState("");
    const [dueDateCalendar, setDueDateCalendar] = useState(new Date());
    var idnum = length;
    const issueCalendarDivRef = useRef(null);
    const dueCalendarDivRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
          if (issueCalendarDivRef.current && !issueCalendarDivRef.current.contains(e.target)) {
            setShowIssueCalendar(false);
          }
          
          if (dueCalendarDivRef.current && !dueCalendarDivRef.current.contains(e.target)){
            setShowDueCalendar(false);
          }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    
    const getIssuedDate = (e) =>{
        setIssuedDate(e.target.value);
        convertToDate(e.target.value);
    }

    const getDueDate = (e) =>{
        setDueDate(e.target.value);
        convertToDate(e.target.value);
    }

    function addProject(){
        closeModal(false);
        projects(
            {
                id: idnum,
                name: projTitle,
                clientName: clientName,
                clientemAdd: emailAddress,
                clientConNum: contactNum,
                desc: projDescription,
            }
        ) 
    };

    return(
        <>
            <div className='absolute w-full h-[90%] flex flex-row justify-center inset-x-0 top-0'>
                <div data-modal-backdrop='static' className='h-fit w-1/4 bg-[#5C6E75]/50 p-3 border-[1px] border-white/50 rounded-xl backdrop-blur-sm'>
                    <div className='flex flex-col font-Inter text-white text-sm w-full'>
                        <div className='flex flex-row justify-end'>
                            <button
                                type="button" 
                                onClick={()=>closeModal(false)}
                                className='px-2 pb-1 rounded'
                            > 
                                x 
                            </button>
                        </div>
                        <div className='flex flex-col mb-2'>
                            <label>Project title</label>
                            <input 
                                id="projTitle"
                                name="projTitle"
                                type="text"
                                value={projTitle}
                                onChange={e=>setProjTitle(e.target.value)}
                                className="mt-1 rounded border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1"
                            />
                        </div>
                        <div className='flex flex-col mb-2'>
                            <label>Client name</label>
                            <input 
                                id="clientName"
                                name="clientName"
                                onChange={e=>setClientName(e.target.value)}
                                type="text"
                                className="mt-1 rounded border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1"
                            />
                        </div>
                        <div className='flex flex-col mb-2'>
                            <label>Email address</label>
                            <input 
                                id="emailAddress"
                                name="emailAddress"
                                onChange={e=>setEmailAddress(e.target.value)}
                                type="text"
                                className="mt-1 rounded border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1"
                            />
                        </div>
                        <div className='flex flex-col mb-2'>
                            <label>Contact number</label>
                            <InputMask 
                                id="contactNum"
                                mask="+9999999999"
                                name="contactNum"
                                type="text"
                                placeholder="Ex. +9123456789" 
                                onChange={e=>setContactNum(e.target.value)}
                                className="mt-1 rounded w-full border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1"
                            />
                        </div>
                        <div className='flex flex-row mb-2 w-full'>
                            <div className='flex flex-col w-1/2 pr-1'>
                                <label>Issued on</label>
                                <div ref={issueCalendarDivRef} className="relative">
                                    <InputMask
                                        id="issuedDate"
                                        name="issuedDate"
                                        type="text"
                                        mask="99/99/9999"
                                        value={issuedDate}
                                        onClick={()=>setShowIssueCalendar(true)}
                                        onChange={e=>getIssuedDate(e)}
                                        placeholder="mm/dd/yyyy" 
                                        className="mt-1 rounded w-full border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1"
                                    />
                                    { showIssueCalendar===true &&
                                        <div className="absolute">
                                            <Calendar
                                                useDarkMode
                                                value={issuedDateCalendar} 
                                                onChange={e=>onChangeDate(e,setIssuedDateCalendar,setIssuedDate,setShowIssueCalendar)} 
                                                onClick={()=>setShowIssueCalendar(false)}
                                                className="border-[1px] bg-[#1B333A]"
                                            />
                                        </div>
                                    } 
                                </div>
                            </div>
                            <div className='flex flex-col w-1/2 pl-1'>
                                <label>Due date</label>
                                <div ref={dueCalendarDivRef} className="relative">
                                    <InputMask
                                        id="dueDate"
                                        name="dueDate"
                                        value={dueDate}
                                        onClick={()=>setShowDueCalendar(true)}
                                        placeholder="mm/dd/yyyy" 
                                        onChange={e=>getDueDate(e)}
                                        type="text"
                                        className="mt-1 rounded w-full border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1"
                                    />
                                    { showDueCalendar===true &&
                                        <div className="absolute">
                                            <Calendar
                                                useDarkMode
                                                value={dueDateCalendar} 
                                                onChange={e=>onChangeDate(e,setDueDateCalendar,setDueDate,setShowDueCalendar)} 
                                                onClick={()=>setShowDueCalendar(false)}
                                                className="border-[1px] bg-[#1B333A]"
                                            />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col mb-2'>
                            <label>Project description</label>
                            <textarea
                                id="projDescription"
                                name="projDescription"
                                rows="3"
                                onChange={e=>setProjDescription(e.target.value)}
                                type="text"
                                placeholder="Add Description..."
                                className="resize-none block mt-1 rounded border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1 h-20"
                            />
                        </div>
                        <div className='flex flex-row mt-2'>
                            <div className='mr-1'>
                                <label>Employees</label>
                            </div>
                            <button className='bg-[#8AAEBC]/50 px-2 rounded-lg text-[10px] ml-1'>
                                Add
                            </button>
                        </div>
                        <div className='flex flex-row justify-end'>
                            <button 
                                type="button" 
                                onClick={()=>addProject()}
                                className='bg-[#50C4F1]/50 px-4 py-2 rounded-3xl text-xs'
                            > 
                                Create project 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProjectModal;