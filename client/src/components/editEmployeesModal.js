import React, {useState, useEffect, useCallback} from 'react';
import {InputLabel} from '.';
import axios from "axios";

function EditEmployeesModal(props){
    const [employeeName, setEmployeeName] = useState('');
    const [openDropdown, setOpenDropdown] =useState(false);
    const [showAllList, setShowAllList] =useState(false);
    const [isFilled, setIsFilled] = useState(true);
    const [displayedEmployees, setDisplayedEmployees] = useState([]);
    const getFName = (userId) => {
        const user = props.users.find(user => user.id === userId);
        return user ? user.fname : 'Unknown';
    };
    const getLName = (userId) => {
        const user = props.users.find(user => user.id === userId);
        return user ? user.lname : 'Unknown';
    };
    
    const addEmployee=(user)=>{
        setOpenDropdown(false);
        setIsFilled(true);
        setEmployeeName(user.fname+' '+user.lname);
        props.getEmployees(user.id);
    }   

    const deleteEmployee=(empId)=>{
        setEmployeeName("");
        props.removeEmployee(empId);
    }

    //This is to show selected employees
    const renderEmployeeNames = useCallback(() => {
        return displayedEmployees&&displayedEmployees.map((employee, index) => {    
        if (showAllList?index===props.employees.length-1:index===3&&props.employees.length>4) {
            return <div key={index} className="flex flex-row">
                {getFName(employee)} {getLName(employee)},
                <button onClick={()=>deleteEmployee(employee)} className='flex flex-col px-1 ml-1 w-5 justify-center rounded-full hover:bg-white/20'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
                <br/>
            </div>;
        } else if (index === 0) {
            return <div key={index} className="flex flex-row"> 
                {getFName(employee)} {getLName(employee)}
                <button onClick={()=>deleteEmployee(employee)} className='flex flex-col px-1 ml-1 w-5 justify-center rounded-full hover:bg-white/20'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
                <br/>
            </div>;
        } else {
            return <div key={index} className="flex flex-row"> 
                {getFName(employee)} {getLName(employee)},
                <button onClick={()=>deleteEmployee(employee)} className='flex flex-col px-1 ml-1 w-5 justify-center rounded-full hover:bg-white/20'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
                <br/>
            </div>;
        }
        });
    }, [displayedEmployees, props.employees]);

    //function when pressing done button or XButton to close modal
    const closeModal = (e) =>{
        if(e.target.id === "XButton"){
            setIsFilled(true);
            setEmployeeName("");
            props.closeModal(false);
        }
        else if(e.target.id === "doneButton"){
            if(props.employees.length>0){
                setIsFilled(true);
                props.closeModal(false);
                setEmployeeName("");
            }
            else{
                setIsFilled(false);
            }
        }
    }

    //This is used to ensure every variable has a value
    useEffect(() => {
        setDisplayedEmployees(props.employees&&props.employees.slice(showAllList===true?0:props.employees&&props.employees.length<=4?0:props.employees&&props.employees.length-4, props.employees&&props.employees.length).reverse());
        setIsFilled(props.employees===null?true:props.employees.length>0?true:false);
        setShowAllList(showAllList);
        renderEmployeeNames();
    }, [props.employees,showAllList,setShowAllList]);

    var inputLabelClassName="flex flex-row";
    return props.isOpen && (
        <div data-modal-backdrop='static' className='z-20 absolute w-fit h-fit flex flex-row bottom-44 inset-x-1/4'>
            <div className='h-fit w-60 bg-[#5C6E75]/50 p-3 border-[1px] border-white/50 rounded-xl backdrop-blur-xl'>
                <div className='pb-3 flex flex-col font-Inter text-white text-sm w-full'>
                    <div className='flex flex-row justify-end'>
                        <button
                            type="button" 
                            className='rounded'
                            onClick={(e)=>closeModal(e)} 
                        > 
                            <svg id="XButton" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" onClick={(e)=>closeModal(e)} className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className='flex flex-col mb-2'>
                        <InputLabel 
                            id="addEmpLabel"
                            isFilled={isFilled}
                            classname={inputLabelClassName}
                        >
                            Add Employee
                        </InputLabel>
                        <div className='relative flex flex-col mb-1'>
                            <input
                                disabled 
                                id="addEmp"
                                name="addEmp"
                                type="text"
                                value={employeeName}
                                onClick={()=>setOpenDropdown((prev)=>!prev)}
                                className="mt-1 rounded border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1"
                            />
                            <button onClick={() => setOpenDropdown((prev)=>!prev)} className="absolute py-4 end-2 h-full">
                                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                </svg>
                            </button>
                            { openDropdown===true &&
                                <div className="absolute top-10 z-20 divide-y rounded-lg shadow w-full bg-gray-600">
                                    <ul className="py-2 text-sm text-white ">
                                        {props.users.map((user,index)=>
                                            <li key={index}>
                                                <button key={index} onClick={() => addEmployee(user)} className="block w-full px-4 py-2 hover:bg-gray-400">{user.fname} {user.lname}</button>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='mt-1'>
                        <label id="empListTitle" className=''> Employees:</label>
                    </div>
                    <div className={` ${props.employees&&props.employees.length>4?'h-fit':'h-20'}`}>
                        <div className='w-fit'>
                            {displayedEmployees&&renderEmployeeNames()}
                        </div>
                    </div>
                    <div className='flex flex-row justify-between mt-2'>
                        <div className=''>
                            {displayedEmployees&&props.employees&&props.employees.length>4&&
                            
                                <button onClick={()=>setShowAllList((prev)=>!prev)} className='h-fit w-12 rounded-2xl py-1 bg-[#50C4F1]/50'>
                                    {showAllList?'less':'more'}
                                </button>
                            }
                        </div>
                        <div>
                            <button
                                id="doneButton"
                                type="button" 
                                onClick={(e)=>closeModal(e)}
                                className='mr-1 h-fit w-12 rounded-2xl py-1 bg-[#50C4F1]/50'
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditEmployeesModal;