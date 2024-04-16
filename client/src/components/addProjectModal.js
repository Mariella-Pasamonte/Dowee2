import React, {useState, useEffect, useRef} from "react";
import { Calendar } from "@natscale/react-calendar";
import InputMask from 'react-input-mask';
import { convertToDate, onChangeDate} from '../utilities/date';
import {InputLabel} from '../components';

function AddProjectModal(props){
    const [projTitle, setProjTitle] = useState('Project '+String(props.projLength).padStart(2,'0'));
    const [clientName, setClientName]= useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [contactNum, setContactNum] = useState('');
    const [projDescription, setProjDescription] = useState('');
    const [showIssueCalendar, setShowIssueCalendar] = useState(false);
    const [issuedDate, setIssuedDate] = useState('');
    const [issuedDateCalendar, setIssuedDateCalendar] = useState(new Date());
    const [showDueCalendar, setShowDueCalendar] = useState(false);
    const [dueDate, setDueDate] = useState('');
    const [dueDateCalendar, setDueDateCalendar] = useState(new Date());
    const [isFilled, setIsFilled] = useState(true);
    const issueCalendarDivRef = useRef(null);
    const dueCalendarDivRef = useRef(null);
    const employeesId = props.employees&&props.employees.map(employee=>employee.id);
    const emps = props.employees;
    const empUsernames = props.employees&&props.employees.map(employee => employee.username);
    const joinEmpUsernames = props.employees!==null?empUsernames.join(', '):'';
    const truncatedText =()=>{
        if (joinEmpUsernames.length === 0) return '';
        else return joinEmpUsernames.length > 30 ? joinEmpUsernames.slice(0,30) + '...' : joinEmpUsernames;
    }

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

        if (!props.isOpen) {
            setProjTitle('Project ' + String(props.projLength).padStart(2, '0'));
            setClientName('');
            setEmailAddress('');
            setContactNum('');
            setProjDescription('');
            setIssuedDate('');
            setIssuedDateCalendar(new Date());
            setDueDate('');
            setDueDateCalendar(new Date());
            setIsFilled(true);
        }

        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
    }, [props.isOpen, props.projLength, issueCalendarDivRef, dueCalendarDivRef, setShowIssueCalendar, setShowDueCalendar]);
    
    const getIssuedDate = (e) =>{
        setIssuedDate(e.target.value);
        convertToDate(e.target.value);
    }

    const getDueDate = (e) =>{
        setDueDate(e.target.value);
        convertToDate(e.target.value);
    }

    function closeMainModal(){
        props.closeModal(false);
        props.setOpenEmpModal(false);
        props.setEmployees(null);
    }

    function addProject(){
        if(projTitle !== '' && clientName !== '' && emailAddress !== '' && contactNum !== ''){
            setIsFilled(true);
            props.closeModal(false);
            props.setOpenEmpModal(false);
            props.setEmployees(null);
            props.addNewProject(
                {
                    userId: localStorage.getItem('userId'),
                    name: projTitle,
                    clientname: clientName,
                    clientemadd: emailAddress,
                    clientconnum: contactNum,
                    issueddate: issuedDate,
                    duedate: dueDate,
                    description: projDescription,
                    employees: employeesId,
                }
            )
        } else{
            setIsFilled(false);
        }
    };

    var inputLabelClassName="flex flex-row text-sm";
    return props.isOpen &&(
        <>
            <div data-modal-backdrop='static' className='z-10 absolute w-fit h-fit flex flex-row top-11 inset-x-[17%]'>
                <div className='h-fit w-72 bg-[#5C6E75]/50 p-3 border-[1px] border-white/50 rounded-xl backdrop-blur-2xl'>  
                    <div className='flex flex-col font-Inter text-white text-sm w-full'>
                        <div className='flex flex-row justify-end'>
                            <button
                                type="button" 
                                onClick={(e)=>closeMainModal(e)}
                                className='px-1 pb-1 rounded'
                            > 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg> 
                            </button>
                        </div>
                        <div className='flex flex-col mb-2'>
                            <InputLabel 
                                id="projTitleLabel"
                                isFilled={isFilled?true:projTitle!==''?true:false}
                                classname={inputLabelClassName}
                            >
                                Project Title
                            </InputLabel>
                            <input 
                                id="projTitle"
                                name="projTitle"
                                type="text"
                                value={projTitle}
                                onChange={e=>setProjTitle(e.target.value)}
                                className="h-7 text-sm rounded border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1"
                            />
                        </div>
                        <div className='flex flex-col mb-2'>
                            <InputLabel
                                id="projClientName"
                                isFilled={isFilled?true:clientName!==''?true:false}
                                classname={inputLabelClassName}
                            >
                                Client Name
                            </InputLabel>
                            <input 
                                id="clientName"
                                name="clientName"
                                value={clientName}
                                onChange={e=>setClientName(e.target.value)}
                                type="text"
                                className="h-7 text-sm rounded border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1"
                            />
                        </div>
                        <div className='flex flex-col mb-2'>
                            <InputLabel 
                                id="projClientEmailAddress"
                                isFilled={isFilled?true:emailAddress!==''?true:false}
                                classname={inputLabelClassName}
                            >
                                Email address
                            </InputLabel>
                            <input 
                                id="emailAddress"
                                name="emailAddress"
                                value={emailAddress}
                                onChange={e=>setEmailAddress(e.target.value)}
                                type="text"
                                className="h-7 text-sm rounded border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1"
                            />
                        </div>
                        <div className='flex flex-col mb-2'>
                            <InputLabel 
                                id="projClientContactNum"
                                isFilled={isFilled?true:contactNum!==''?true:false}
                                classname={inputLabelClassName}
                            >
                                Contact number
                            </InputLabel>
                            <InputMask 
                                id="contactNum"
                                mask="+9999999999"
                                name="contactNum"
                                type="text"
                                placeholder="Ex. +9123456789" 
                                onChange={e=>setContactNum(e.target.value)}
                                className="h-7 text-sm rounded border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1"
                            />
                        </div>
                        <div className='flex flex-row mb-2 w-full'>
                            <div className='flex flex-col w-1/2 pr-1'>
                                <InputLabel 
                                    id="projIssuedDate"
                                    isFilled={isFilled?true:issuedDate!==''?true:false}
                                    classname={inputLabelClassName}
                                >
                                    Issued on
                                </InputLabel>
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
                                        className="h-7 text-sm rounded w-full border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1"
                                    />
                                    { showIssueCalendar===true &&
                                        <div className="z-20 absolute inline -top-5">
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
                                <InputLabel
                                    id="projDueDate"
                                    isFilled={isFilled?true:dueDate!==''?true:false}
                                    classname={inputLabelClassName}
                                >
                                    Due date
                                </InputLabel>
                                <div ref={dueCalendarDivRef} className="relative">
                                    <InputMask
                                        id="dueDate"
                                        name="dueDate"
                                        value={dueDate}
                                        onClick={()=>setShowDueCalendar(true)}
                                        placeholder="mm/dd/yyyy" 
                                        onChange={e=>getDueDate(e)}
                                        type="text"
                                        className="h-7 text-sm rounded w-full border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1"
                                    />
                                    { showDueCalendar===true &&
                                        <div className="z-20 absolute inline -top-5">
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
                                value={projDescription}
                                onChange={e=>setProjDescription(e.target.value)}
                                type="text"
                                placeholder="Add Description..."
                                className="resize-none block text-sm rounded border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1 h-20"
                            />
                        </div>
                        <div className={`flex flex-row ${props.employees&&props.employees.length > 0 &&'justify-between'} mx-1 my-2`}>
                            <div className='flex flex-row mr-1'>
                                <InputLabel 
                                    id="projEmployeesTitle"
                                    isFilled={isFilled?true:props.employees!==null?true:false}
                                    classname={inputLabelClassName+" mr-1"}
                                >
                                    Employees:
                                </InputLabel>
                                <div>
                                    {truncatedText()}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                <button
                                    onClick={()=>{
                                        props.setOpenEmpModal(true);
                                        props.setEmployees(emps);
                                    }}
                                    className={`bg-[#8AAEBC]/50 px-2 ${joinEmpUsernames.length>23?'h-fit py-1':'h-fit'} rounded-lg text-[10px] ml-1`}
                                >
                                    Add
                                </button>
                            </div>
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