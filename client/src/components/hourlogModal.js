import React, {useState, useEffect, useRef, useCallback} from "react";
import { Calendar } from "@natscale/react-calendar";
import {
    ErrorToast,
    InputLabel,
} from "../components";
import {convertToDate, convertToTextDate, onChangeDate} from '../utilities/date';
import axios from 'axios';

function HourlogModal(props){
    const [taskTitle, setTaskTitle] = useState('');
    const [task, setTask] = useState(null)
    const [hourlogDate, setHourlogDate] = useState('');
    let time = {
        employeeassigned:props.userId,
        date:'',
        seconds:0,
        minutes:0,
        hours:0
    }
    const [timeStart, setTimeStart] = useState({hour:0, minute:0, AMPM:'AM'});
    const [timeFinished, setTimeFinished] = useState({hour:0, minute:0, AMPM:'AM'});
    const hours = Array.from({length: 12},(_, i) => (i + 1));
    const minutes = Array.from({length: 60},(_, i) => (i))

    const [isFilled, setIsFilled] = useState(true);
    const [openTaskDropdown, setOpenTaskDropdown] = useState(false);
    const [openTimeStartDropdown, setOpenTimeStartDropdown] = useState(false);
    const [openTimeFinishedDropdown, setOpenTimeFinishedDropdown] = useState(false);

    //calendar variables
    const [hourlogCalendar, setHourlogCalendar] = useState(null)
    const [showHourlogCalendar, setShowHourlogCalendar] = useState(false);
    const inputHourlogDateDivRef = useRef(null)
    const hourlogCalendarDivRef = useRef(null);

    const [hourlogExistError, setHourlogExistError] = useState(false);

    function setHour(time,setTime,hr){
        setTime({...time, hour:hr});
    }

    function setMinute(time,setTime,min){
        setTime({...time, minute:min});
    }

    function setAMPM(time,setTime,APM){
        setTime({...time, AMPM:APM});
    }
    
    const isDisabled = useCallback((date) => {
        return date < convertToDate(props.issuedDate) ;
    }, [props]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if(props.isOpen===true){
                const hourlogCalendarDivRect = hourlogCalendarDivRef.current.getBoundingClientRect();
                if (inputHourlogDateDivRef.current && (!inputHourlogDateDivRef.current.contains(e.target)
                &&(e.clientX < hourlogCalendarDivRect.left ||
                e.clientX > hourlogCalendarDivRect.right ||
                e.clientY < hourlogCalendarDivRect.top ||
                e.clientY > hourlogCalendarDivRect.bottom)
                )) {
                setShowHourlogCalendar(false);
                }
            }
        };

        document.addEventListener('click', handleClickOutside);

        if (!props.isOpen) {
            setTaskTitle('');
            setTask(null);
            setHourlogDate('');
            setOpenTaskDropdown(false);
            setTimeStart({hour:0, minute:0, AMPM:'AM'});
            setTimeFinished({hour:0, minute:0, AMPM:'AM'});
            setIsFilled(true);
            setOpenTaskDropdown(false);
            setOpenTimeStartDropdown(false);
            setOpenTimeFinishedDropdown(false);
            setHourlogCalendar(null);
            setShowHourlogCalendar(false);
            setHourlogExistError(false);
        }
        
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [props]);

    function getPendingAmount(seconds,minutes,hours,amount){
        let totalSeconds = seconds+(minutes*60)+(hours*3600);
        let pendingAmount = (amount*totalSeconds)/3600;
        
        return pendingAmount.toFixed(2);
    }

    function addNewHourlog(task,hourlog,time){
        let newHourlog = null;

        hourlog.map((hl)=>{
            hl.employee===props.userId&&(
                newHourlog={
                    taskId: task.id,
                    employeeassigned: hl.employee,
                    date: time.date,
                    seconds:time.seconds,
                    minutes:time.minutes,
                    hours:time.hours,
                    starttimer: false,
                    amount: hl.amount,
                    pendingamount:getPendingAmount(time.seconds,time.minutes,time.hours,hl.amount)
                }
            )
        })
        axios.post("http://localhost:5000/home", {
            headers:{
                function: 'addNewHourlog'
            },newHourlog
        })
        .then((res) => {
            console.log(newHourlog)
        })
        .catch((error) => {
            console.log("Error: ", error);
        }); 
        props.fetchData(props.userId)
    }

    function pairItems(task) {
        const pairedObjects = [];
      
        if(task.amount.length>1){
            for (let i = 0; i < Math.min(task.amount.length, task.employeelist.length); i++) {
                pairedObjects.push({
                  amount: task.amount[i],
                  employee: task.employeelist[i],
                });
              }
        }else{
            for(let i = 0; i < task.employeelist.length;i++){
                pairedObjects.push({
                    amount: task.amount[0],
                    employee: task.employeelist[i],
                })
            }
        }
      
        return pairedObjects;
    }

    function getDuration(){
        let hour = (timeStart.AMPM==='AM'&&timeFinished.AMPM==='AM')||(timeStart.AMPM==='PM'&&timeFinished==='PM')?timeFinished.hour-timeStart.hour:(timeFinished.hour+12)-timeStart.hour;
        let minute = timeStart.minute>timeFinished.minute?(timeFinished.minute+60)-timeStart.minute:timeFinished.minute-timeStart.minute;
        
        if(timeStart.minute>timeFinished.minute){
            hour=hour-1;
        }

        time.hours=hour;
        time.minutes=minute;
    }   

    function addHourlog(){
        let hourlogExist=props.hourlog.some((hl)=>hl.taskid===task.id&&hl.employeeassigned===props.userId&&hl.date===hourlogDate);
        if(hourlogExist===false&&taskTitle!==''&&hourlogDate!==''&&timeStart.hour>0&&timeFinished.hour>0){
            time.date=hourlogDate;
            getDuration();
            addNewHourlog(task,pairItems(task),time);
        }else{
            setIsFilled(false);
            setHourlogExistError(true);
        }
    }

    var inputLabelClassName="flex flex-row text-base";
    
    return props.isOpen&&(
        <>
            <div className='z-10 absolute w-full h-[90%] flex flex-row justify-center -top-20'>
                <ErrorToast
                    id='HourlogTitleExistError'
                    isError={hourlogExistError}
                    setIsError={setHourlogExistError}
                >
                    <div class="ms-3 text-sm font-normal">
                        Hourlog already exists
                    </div>
                </ErrorToast>
                <div className='static text-white h-fit w-96 bg-[#5C6E75]/50 border-[1px] border-white/50 rounded-xl backdrop-blur-3xl'>
                    <div className="flex flex-row justify-end mt-1 px-2">
                        <button 
                            type="button" 
                            onClick={()=>{
                                props.closeModal(false);
                            }}
                            className='rounded-full p-1 hover:bg-white/20'
                        > 
                            <svg id="XButton" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" onClick={(e)=>{props.closeModal(false)}} className="w-4     h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <label className={`${inputLabelClassName} px-3`}>
                        Hour Log
                    </label>
                    <div className='flex flex-col mb-2 px-3'>
                        <InputLabel 
                            id="hourlogTaskTitle"
                            isFilled={isFilled?true:taskTitle!==''?true:false}
                            classname={inputLabelClassName}
                        >
                            Task
                        </InputLabel>
                        <div className='relative flex flex-col mb-1'>
                            <input
                                disabled 
                                id="chooseTaskTitle"
                                name="chooseTaskTitle"
                                type="text"
                                value={taskTitle}
                                onClick={()=>setOpenTaskDropdown((prev)=>!prev)}
                                placeholder="Select Task"
                                className="mt-1 text-base rounded border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-3 placeholder-white"
                            />
                            <button onClick={() => setOpenTaskDropdown((prev)=>!prev)} className="flex flex-row justify-end absolute py-4 pr-4 h-full w-full">
                                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                </svg>
                            </button>
                            { openTaskDropdown===true &&
                                <div className="absolute top-10 z-20 divide-y rounded-lg shadow w-full bg-gray-600">
                                    <ul className="py-2 text-sm text-white ">
                                        {props.tasks.map((task)=>
                                            task.projectid===props.projectId&&
                                            <li>
                                                <button 
                                                    onClick={() =>{
                                                        setTaskTitle(task.name);
                                                        setTask(task);
                                                        setOpenTaskDropdown(false);
                                                    }} 
                                                    className="block w-full px-4 py-2 hover:bg-gray-400"
                                                >
                                                    {task.name}
                                                </button>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='flex flex-col mb-2 px-3'>
                        <InputLabel 
                            id="hourlogDate"
                            isFilled={isFilled?true:hourlogDate!==''?true:false}
                            classname={inputLabelClassName}
                        >
                            Date
                        </InputLabel>
                        <div ref={inputHourlogDateDivRef} className="relative">
                            <div className="relative flex flex-row">
                                <input
                                    disabled
                                    id="hourlogDate"
                                    name="hourlogDate"
                                    type="text"
                                    value={convertToTextDate(hourlogDate)}
                                    placeholder="Select Date" 
                                    className="h-7 text-sm rounded w-full border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-3 placeholder-white"
                                />
                                <button onClick={(e)=>{setShowHourlogCalendar((prev)=>!prev)}} className="absolute z-10 h-7 w-full">
                                </button>
                                <div className={`z-20 flex-row justify-end text-sm ${showHourlogCalendar?'flex':'hidden'}`}>
                                    <button onClick={(e)=>{setShowHourlogCalendar(false)}} className="bg-white/20 absolute h-7 w-fit px-2 rounded-r-md">
                                        Done
                                    </button>
                                </div>
                            </div>
                            <div ref={hourlogCalendarDivRef} className={`flex flex-row w-full justify-center z-30 h-fit absolute ${showHourlogCalendar?'inline':'hidden'}`}>
                                <Calendar
                                    useDarkMode
                                    value={hourlogCalendar} 
                                    onChange={(e)=>onChangeDate(e,setHourlogCalendar,setHourlogDate,setShowHourlogCalendar)} 
                                    className="border-[1px] bg-[#1B333A]"
                                    isDisabled={isDisabled}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row px-3 w-full">
                        <div className='flex flex-col mb-2 w-1/2 mr-1'>
                            <InputLabel 
                                id="labelHourlogStartTime"
                                isFilled={isFilled?true:timeStart.hour>0?true:false}
                                classname={inputLabelClassName}
                            >
                                Time Started
                            </InputLabel>
                            <div className="relative flex flex-row">
                                <input
                                    disabled
                                    id="inputHourlogStartTime"
                                    name="inputHourlogStartTime"
                                    type="text"
                                    value={`${timeStart.hour!==0?timeStart.hour+':'+String(timeStart.minute).padStart(2,'0')+' '+timeStart.AMPM:''}`}
                                    placeholder='Enter Time' 
                                    className="h-7 text-sm rounded w-full border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-2 placeholder-white"
                                />
                                <button onClick={(e)=>{setOpenTimeStartDropdown(true)}} className="z-10 absolute h-7 w-full">
                                </button>
                                <div className={`z-20 flex-row justify-end text-sm ${openTimeStartDropdown?'flex':'hidden'}`}>
                                    <button onClick={(e)=>{setOpenTimeStartDropdown(false)}} className="bg-white/20 absolute h-7 w-fit px-2 rounded-r-md">
                                        Done
                                    </button>
                                </div>
                                { openTimeStartDropdown===true &&
                                    <div className="flex flex-row absolute top-7 z-20 divide-y rounded-lg shadow w-full bg-gray-600">
                                        <div className="overflow-y-auto max-h-48">
                                            <ul className="text-sm text-white ">
                                                {hours.map((hour)=>
                                                    <li>
                                                        <button 
                                                            onClick={() =>{
                                                                setHour(timeStart,setTimeStart,hour);
                                                                setHour(timeFinished,setTimeFinished,0);
                                                            }} 
                                                            className={`block w-full px-4 py-1 ${timeStart.hour===hour&&'bg-gray-400'} hover:bg-gray-400 focus:bg-gray-400`}
                                                        >
                                                            {hour}
                                                        </button>
                                                    </li>
                                                )}
                                            </ul>
                                        </div> 
                                        <div className="overflow-y-auto max-h-48">
                                            <ul className="text-sm text-white ">
                                                {minutes.map((minute)=>
                                                    <li>
                                                        <button 
                                                            onClick={() =>{
                                                                setMinute(timeStart,setTimeStart,minute);
                                                                setHour(timeFinished,setTimeFinished,0);
                                                            }} 
                                                            className={`block w-full px-4 py-1 ${timeStart.minute===minute&&'bg-gray-400'} hover:bg-gray-400 focus:bg-gray-400`}
                                                        >
                                                            {String(minute).padStart(2,'0')}
                                                        </button>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <ul className="text-sm text-white ">
                                                <li>
                                                    <button 
                                                        onClick={() =>{
                                                            setAMPM(timeStart, setTimeStart,'AM');
                                                        }} 
                                                        className={`block w-full px-4 py-1 ${timeStart.AMPM==='AM'&&'bg-gray-400'} hover:bg-gray-400 focus:bg-gray-400`}
                                                    >
                                                        AM
                                                    </button>
                                                </li>
                                                <li>
                                                    <button 
                                                        onClick={() =>{
                                                            setAMPM(timeStart, setTimeStart,'PM');
                                                        }} 
                                                        className={`block w-full px-4 py-1 ${timeStart.AMPM==='PM'&&'bg-gray-400'} hover:bg-gray-400 focus:bg-gray-400`}
                                                    >
                                                        PM
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='flex flex-col mb-2 w-1/2 ml-1'>
                            <InputLabel 
                                id="labelHourlogFinishedTime"
                                isFilled={isFilled?true:timeFinished.hour>0?true:false}
                                classname={inputLabelClassName}
                            >
                                Time Finished
                            </InputLabel>
                            <div className="relative flex flex-row">
                                <input
                                    disabled
                                    id="inputHourlogFinishedTime"
                                    name="inputHourlogFinishedTime"
                                    type="text"
                                    value={`${timeFinished.hour!==0?String(timeFinished.hour).padStart(2,'0')+':'+String(timeFinished.minute).padStart(2,'0')+' '+timeFinished.AMPM:''}`}
                                    placeholder='Enter Time' 
                                    className="h-7 text-sm rounded w-full border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-2 placeholder-white"
                                />
                                <button onClick={(e)=>{setOpenTimeFinishedDropdown(true)}} className="z-10 absolute h-7 w-full">
                                </button>
                                <div className={`z-20 flex-row justify-end text-sm ${openTimeFinishedDropdown?'flex':'hidden'}`}>
                                    <button onClick={(e)=>{setOpenTimeFinishedDropdown(false)}} className="bg-white/20 absolute h-7 w-fit px-2 rounded-r-md">
                                        Done
                                    </button>
                                </div>
                                { openTimeFinishedDropdown===true &&
                                    <div className="flex flex-row absolute top-7 z-20 divide-y rounded-lg shadow w-full bg-gray-600">
                                        <div className="overflow-y-auto max-h-48">
                                            <ul className="text-sm text-white ">
                                                {hours.map((hour)=>
                                                    <li>
                                                        <button 
                                                            disabled={((timeStart.AMPM==='AM'&&timeFinished.AMPM==='AM')||(timeStart.AMPM==='PM'&&timeFinished.AMPM==='PM'))&&timeStart.hour>hour?true:false}
                                                            onClick={() =>{
                                                                setHour(timeFinished, setTimeFinished,hour);
                                                            }} 
                                                            className={`block w-full px-4 py-1 ${timeFinished.hour===hour&&'bg-gray-400'} hover:bg-gray-400 focus:bg-gray-400`}
                                                        >
                                                            {hour}
                                                        </button>
                                                    </li>
                                                )}
                                            </ul>
                                        </div> 
                                        <div className="overflow-y-auto max-h-48">
                                            <ul className="text-sm text-white ">
                                                {minutes.map((minute)=>
                                                    <li>
                                                        <button 
                                                            disabled={((timeStart.AMPM==='AM'&&timeFinished.AMPM==='AM')||(timeStart.AMPM==='PM'&&timeFinished.AMPM==='PM'))&&timeStart.hour===timeFinished.hour&&timeStart.minute>=minute?true:false}
                                                            onClick={() =>{
                                                                setMinute(timeFinished, setTimeFinished,minute);
                                                            }} 
                                                            className={`block w-full px-4 py-1 ${timeFinished.minute===minute&&'bg-gray-400'} hover:bg-gray-400 focus:bg-gray-400`}
                                                        >
                                                            {String(minute).padStart(2,'0')}
                                                        </button>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <ul className="text-sm text-white ">
                                                <li>
                                                    <button 
                                                        onClick={() =>{
                                                            setAMPM(timeFinished, setTimeFinished,'AM');
                                                        }} 
                                                        className={`block w-full px-4 py-1 ${timeFinished.AMPM==='AM'&&'bg-gray-400'} hover:bg-gray-400 focus:bg-gray-400`}
                                                    >
                                                        AM
                                                    </button>
                                                </li>
                                                <li>
                                                    <button 
                                                        onClick={() =>{
                                                            setAMPM(timeFinished, setTimeFinished,'PM');
                                                        }} 
                                                        className={`block w-full px-4 py-1 ${timeFinished.AMPM==='PM'&&'bg-gray-400'} hover:bg-gray-400 focus:bg-gray-400`}
                                                    >
                                                        PM
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-center w-full pb-3 px-3">
                        <button 
                            type="button" 
                            onClick={()=>addHourlog()}
                            className='bg-[#50C4F1]/50 px-4 py-2 ml-1 rounded-3xl text-sm'
                        > 
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HourlogModal;