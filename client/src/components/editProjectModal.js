import React, {useState, useEffect, useRef, useCallback} from "react";
import { Calendar } from "@natscale/react-calendar";
import InputMask from 'react-input-mask';
import { convertToDate, onChangeDate} from '../utilities/date';
import {InputLabel} from '../components';

function EditProjectModal(props){
    //details
    const [projTitle, setProjTitle] = useState(props.project.name);
    const [clientName, setClientName]= useState(props.project.clientname);
    const [emailAddress, setEmailAddress] = useState(props.project.clientemadd);
    const [contactNum, setContactNum] = useState(props.project.clientconnum);
    const [projDescription, setProjDescription] = useState(props.project.description);
    //calendar details
    const [showIssueCalendar, setShowIssueCalendar] = useState(false);
    const [issuedDate, setIssuedDate] = useState(props.project.issueddate);
    const [issuedDateCalendar, setIssuedDateCalendar] = useState(convertToDate(props.project.issueddate));
    const [showDueCalendar, setShowDueCalendar] = useState(false);
    const [dueDate, setDueDate] = useState(props.project.duedate);
    const [dueDateCalendar, setDueDateCalendar] = useState(convertToDate(props.project.duedate)); 
    const [isFilled, setIsFilled] = useState(true);
    const issueCalendarDivRef = useRef(null);
    const dueCalendarDivRef = useRef(null);
    //employee details
    const emps = props.employees&&props.employees;
    const getUsername = (userId) => {
        const user = props.users&&props.users.find(user => user.id === userId);
        return user ? user.username : 'Unknown';
    };
    const empUsernames = emps.map((emp)=>getUsername(emp));
    const joinEmpUsernames = emps?empUsernames.join(', '):' ';
    const truncatedText =()=>{ return joinEmpUsernames.length > 30 ? joinEmpUsernames.slice(0,30) + '...' : joinEmpUsernames}
    
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
            setProjTitle(props.project.name);
            setClientName(props.project.clientname);
            setEmailAddress(props.project.clientemadd);
            setContactNum(props.project.clientconnum);
            setProjDescription(props.project.description);
            setIssuedDate(props.project.issueddate);
            setIssuedDateCalendar(convertToDate(props.project.issueddate));
            setDueDate(props.project.duedate);
            setDueDateCalendar(convertToDate(props.project.duedate));
            setIsFilled(true);
        }

        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
    }, [props]);

    const disableDueDate = useCallback((date) => {
        return date < issuedDateCalendar;
    }, [issuedDateCalendar]);
    
    const getIssuedDate = (e) =>{
        setIssuedDate(e.target.value);
        convertToDate(e.target.value);
    }

    const getDueDate = (e) =>{
        setDueDate(e.target.value);
        convertToDate(e.target.value);
    }

    function newEditProject(){
        if(projTitle !== '' && clientName !== '' && emailAddress !== '' && contactNum !== '' && props.employees.length !== 0){
            setIsFilled(true);
            props.closeModal(false);
            props.setEmployees(null);
            props.setProject(null);
            props.editedProject(
                {
                    id: props.project.id,
                    userid: props.project.userid,
                    name: projTitle,
                    clientname: clientName,
                    clientemadd: emailAddress,
                    clientconnum: contactNum,
                    issueddate: issuedDate,
                    issuedcalendar: issuedDateCalendar,
                    duedate: dueDate,
                    duecalendar: dueDateCalendar,   
                    description: projDescription,
                    employees: props.employees,
                }
            )
        } else {
            setIsFilled(false);
        }
    };
    console.log(props.employees);
    var inputLabelClassName="flex flex-row text-sm";
    return props.isOpen&&(
        <>
            <div data-modal-backdrop='static' className='z-10 absolute w-fit h-fit flex flex-row top-11 inset-x-[17%]'>
                <div className='h-fit w-72 bg-[#5C6E75]/50 px-3 py-4 border-[1px] border-white/50 rounded-xl backdrop-blur-2xl'>
                    <div className='flex flex-col font-Inter text-white text-sm w-full'>
                        <div className='flex flex-col mb-2'>
                            <InputLabel 
                                id="projTitleLabel"
                                isFilled={isFilled?true:projTitle!==''?true:false}
                                classname={inputLabelClassName}
                            >
                                Project title
                            </InputLabel>
                            <input 
                                id="projTitle"
                                name="projTitle"
                                type="text"
                                value={projTitle}
                                onChange={(e)=>setProjTitle(e.target.value)}
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
                                onChange={(e)=>setClientName(e.target.value)}
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
                                onChange={(e)=>setEmailAddress(e.target.value)}
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
                                value={contactNum} 
                                onChange={(e)=>setContactNum(e.target.value)}
                                className="h-7 text-sm rounded w-full border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1"
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
                                        onClick={(e)=>{setShowIssueCalendar(true)}}
                                        onChange={(e)=>getIssuedDate(e)}
                                        placeholder="mm/dd/yyyy" 
                                        className="h-7 text-sm rounded w-full border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1"
                                    />
                                    { showIssueCalendar===true &&
                                        <div className="absolute">
                                            <Calendar
                                                useDarkMode
                                                value={issuedDateCalendar} 
                                                onChange={(e)=>onChangeDate(e,setIssuedDateCalendar,setIssuedDate,setShowIssueCalendar)} 
                                                onClick={(e)=>setShowIssueCalendar(false)}
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
                                        value={issuedDateCalendar<dueDateCalendar?dueDate:''}
                                        onClick={(e)=>setShowDueCalendar(true)}
                                        placeholder="mm/dd/yyyy" 
                                        onChange={e=>getDueDate(e)}
                                        type="text"
                                        className="h-7 text-sm rounded w-full border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1"
                                        disabled={!issuedDate}
                                    />
                                    { showDueCalendar===true &&
                                        <div className="absolute">
                                            <Calendar
                                                useDarkMode
                                                value={issuedDateCalendar<dueDateCalendar?dueDateCalendar:null} 
                                                onChange={e=>onChangeDate(e,setDueDateCalendar,setDueDate,setShowDueCalendar)} 
                                                onClick={(e)=>{setShowDueCalendar(false)}}
                                                className="border-[1px] bg-[#1B333A]"
                                                isDisabled={disableDueDate}
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
                                onChange={(e)=>{
                                    setProjDescription(e.target.value);
                                    console.log(projDescription);
                                }}
                                type="text"
                                placeholder="Add Description..."
                                className="resize-none block text-sm rounded border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1 h-20"
                            />
                        </div>
                        <div className={`flex flex-row ${props.employees&&props.employees.length > 0 &&'justify-between'} mx-1 my-2`}>
                            <div className='flex flex-row mr-1'>
                                <InputLabel 
                                    id="projEmployeesTitle"
                                    isFilled={isFilled?true:props.employees.length===0?false:true}
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
                                    onClick={(e)=>{
                                        props.setOpenEmpModal(true);
                                        props.setEmployees(emps)
                                    }}
                                    className={`bg-[#8AAEBC]/50 px-2 ${joinEmpUsernames.length>23?'h-fit py-1':'h-fit'} rounded-lg text-[10px] ml-1`}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                        <div className='flex flex-row justify-end'>
                            <button
                                type="button" 
                                onClick={(e)=>{
                                    props.setEmployees(null);
                                    props.closeModal(false);
                                    props.setProject(null);
                                }}
                                className='px-3 mr-4 text-xs rounded-3xl bg-slate-400'
                            > 
                                Cancel
                            </button>
                            <button 
                                type="button" 
                                onClick={(e)=>newEditProject()}
                                className='bg-[#50C4F1]/50 px-4 py-2 rounded-3xl text-xs'
                            > 
                                Save 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProjectModal;