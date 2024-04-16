import React, {useState, useEffect, useRef} from "react";
import InputMask from 'react-input-mask';

function ProjectModal(props){
    const [projTitle, setProjTitle] = useState(props.project.name);
    const [clientName, setClientName]= useState(props.project.clientname);
    const [emailAddress, setEmailAddress] = useState(props.project.clientemadd);
    const [contactNum, setContactNum] = useState(props.project.clientconnum);
    const [projDescription, setProjDescription] = useState(props.project.description);
    const [issuedDate, setIssuedDate] = useState(props.project.issueddate);
    const [dueDate, setDueDate] = useState(props.project.duedate);
    const [employees, setEmployees] = useState(props.project.employees);
    const getUsername = (userId) => {
        const user = props.users&&props.users.find(user => user.id === userId);
        return user ? user.username : 'Unknown';
    };
    const empUsernames = employees.map(employee => getUsername(employee));
    const joinEmpUsernames = employees?empUsernames.join(', '):'';
    const truncatedText =()=>{ return showMore ? joinEmpUsernames : joinEmpUsernames.length > 30 ? joinEmpUsernames.slice(0,30) + '...' : joinEmpUsernames}
    const [showMore, setShowMore] = useState(false);
    
    var inputLabelClassName="flex flex-row text-sm";

    useEffect(()=>{
        if (props.isOpen) {
            setProjTitle(props.project.name);
            setClientName(props.project.clientname);
            setEmailAddress(props.project.clientemadd);
            setContactNum(props.project.clientconnum);
            setProjDescription(props.project.description);
            setIssuedDate(props.project.issueddate);
            setDueDate(props.project.duedate);
            setEmployees(props.project.employees);
        }
    },[props])

    return props.isOpen&&(
        <>
            <div data-modal-backdrop='static' className={`z-10 inline-block absolute w-fit h-fit ${showMore?'-top-12':'-top-10'} left-48`}>
                <div className='h-fit w-72 bg-[#5C6E75]/50 px-3 py-4 border-[1px] border-white/50 rounded-xl backdrop-blur-2xl'>
                    <div className='flex flex-col font-Inter text-white text-sm w-full'>
                        <div className='flex flex-col mb-2'>
                            <label>Project title</label>
                            <input 
                                id="projTitle"
                                name="projTitle"
                                type="text"
                                value={projTitle}
                                className="h-7 text-sm rounded border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1"
                                disabled
                            />
                        </div>
                        <div className='flex flex-col mb-2'>
                            <label>Client name</label>
                            <input 
                                id="clientName"
                                name="clientName"
                                value={clientName}
                                type="text"
                                className="h-7 text-sm rounded border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1"
                                disabled
                            />
                        </div>
                        <div className='flex flex-col mb-2'>
                            <label>Email address</label>
                            <input 
                                id="emailAddress"
                                name="emailAddress"
                                value={emailAddress}
                                type="text"
                                className="h-7 text-sm rounded border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1"
                                disabled
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
                                value={contactNum} 
                                className="h-7 text-sm rounded w-full border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1"
                                disabled
                            />
                        </div>
                        <div className='flex flex-row mb-2 w-full'>
                            <div className='flex flex-col w-1/2 pr-1'>
                                <label>Issued on</label>
                                <div className="relative">
                                    <InputMask
                                        id="issuedDate"
                                        name="issuedDate"
                                        type="text"
                                        mask="99/99/9999"
                                        value={issuedDate}
                                        placeholder="mm/dd/yyyy" 
                                        className="h-7 text-sm rounded w-full border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1"
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col w-1/2 pl-1'>
                                <label>Due date</label>
                                <div className="relative">
                                    <InputMask
                                        id="dueDate"
                                        name="dueDate"
                                        value={dueDate}
                                        placeholder="mm/dd/yyyy" 
                                        type="text"
                                        className="h-7 text-sm rounded w-full border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1"
                                        disabled
                                    />
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
                                type="text"
                                placeholder="Add Description..."
                                className="resize-none block text-sm rounded border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1 h-20"
                                disabled
                            />
                        </div>
                        <div className={`flex flex-row ${props.project.employees&&props.project.employees.length > 0 &&'justify-between'} mx-1 my-2`}>
                            <div className={`flex ${showMore?'flex-col':'flex-row'} mr-1`}>
                                <label
                                    id="projEmployeesTitle"
                                    className={inputLabelClassName+" mr-1"}
                                >
                                    Employees:
                                </label>
                                <div>
                                    {truncatedText()}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                {joinEmpUsernames.length>30&&
                                    <div>
                                        {showMore?
                                            <button
                                                onClick={()=>setShowMore(false)}
                                                className={`bg-[#8AAEBC]/50 px-2 ${joinEmpUsernames.length>23?'h-fit py-1':'h-fit'} rounded-lg text-[10px] ml-1`}
                                            >
                                                Less
                                            </button>:
                                            <button
                                                onClick={()=>setShowMore(true)}
                                                className={`bg-[#8AAEBC]/50 px-2 ${joinEmpUsernames.length>23?'h-fit py-1':'h-fit'} rounded-lg text-[10px] ml-1`}
                                            >
                                                More
                                            </button>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='flex flex-row justify-end'>
                            <button 
                                type="button" 
                                onClick={()=>props.closeModal(false)}
                                className='bg-[#50C4F1]/50 px-4 py-2 rounded-3xl text-xs'
                            > 
                                Done 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectModal;