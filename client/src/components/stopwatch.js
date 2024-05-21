import React, {useState, useEffect, useContext} from 'react';
import { getClickedDate } from '../utilities/date';
import axios from 'axios';
import AuthContext from '../utilities/AuthContext';

function Stopwatch(props) {
    const [isRunning,setIsRunning]= useState(false);
    const today = getClickedDate(new Date());
    let newHours=0;
    let newMinutes=0;
    let newSeconds=0;
    const {userID} = useContext(AuthContext);
    const [time, setTime] = useState(settingTime());

    function settingTime(){
        if(props.hourlog===null){
            return {
                starttimer:false,
                employeeassigned: userID,
                date:today,
                seconds:0,
                minutes:0,
                hours:0
            }
        }else{
            let hl=props.hourlog.some((hl)=>hl.taskid===props.task.id&&hl.employeeassigned===userID&&hl.date===today);
            if(hl===true){
                hl=props.hourlog.find((hl)=>hl.taskid===props.task.id&&hl.employeeassigned===userID&&hl.date===today);
                return {
                    employeeassigned:hl.employeeassigned,
                    date:hl.date,
                    seconds:hl.seconds,
                    minutes:hl.minutes,
                    hours:hl.hours,
                    starttimer:hl.starttimer
                }
            }
            else{
                return {
                    starttimer:false,
                    employeeassigned:userID,
                    date:today,
                    seconds:0,
                    minutes:0,
                    hours:0
                };
            }
        }
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

    useEffect(() => {
        let interval;
        
        if(time!==null){  
            if (isRunning===true) {
                interval = setInterval(() => {
                    setTime(prevTime => {
                        newSeconds = prevTime.seconds + 1;
    
                        if (newSeconds === 60) {
                            newMinutes = prevTime.minutes + 1;
                            newSeconds=0;
    
                            if (newMinutes === 60) {
                                newHours = prevTime.hours + 1;
                                newMinutes=0;
    
                                return { ...prevTime, hours: newHours, minutes: 0, seconds: 0 };
                            }
    
                            return { ...prevTime, minutes: newMinutes, seconds: 0 };
                        }
    
                        return { ...prevTime, seconds: newSeconds };
                    });  
                }, 1000);
            }
        }
  
        return () => clearInterval(interval);
    }, [isRunning, time, setTime]);
    
    function getPendingAmount(seconds,minutes,hours,amount){
        let totalSeconds = seconds+(minutes*60)+(hours*3600);
        let pendingAmount = (amount*totalSeconds)/3600;
        
        return pendingAmount.toFixed(2);
    }

    function addNewHourlog(task,hourlog,time){
        let newHourlog = null;

        hourlog.map((hl)=>{
            hl.employee===userID&&(
                newHourlog={
                    taskId: task.id,
                    employeeassigned: hl.employee,
                    date: today,
                    seconds:time.seconds,
                    minutes:time.minutes,
                    hours:time.hours,
                    starttimer: false,
                    amount: hl.amount,
                    pendingamount:getPendingAmount(time.seconds,time.minutes,time.hours,500)
                }
            )
        })
        axios
        .post("https://dowee2-server2.vercel.app/addHourlog",newHourlog)
        // .post("http://localhost:3000/addHourlog",newHourlog)
        .then((res) => {
            console.log(newHourlog)
        })
        .catch((error) => {
            console.log("Error: ", error);
        }); 
        props.fetchData(userID)
    }

    function setTimer(time){
        axios
        .post("https://dowee2-server2.vercel.app/runTimer",time)
        // .post("http://localhost:3000/runTimer",time)
        .then((res) => {
            console.log(time);
        })
        .catch((error) => {
            console.log("Error: ", error);
        }); 
        props.fetchData(userID);
    }

    function toggleTimer(time) {
        if(!isRunning===false){
            if(props.hourlog===null){
                addNewHourlog(props.task,pairItems(props.task),time);
            }else{
                let hl=props.hourlog.some((hl)=>hl.taskid===props.task.id&&hl.employeeassigned===userID&&hl.date===today);
                if(hl===true){
                    hl=props.hourlog.find((hl)=>hl.taskid===props.task.id&&hl.employeeassigned===userID&&hl.date===today);
                    hl.starttimer=time.starttimer;
                    hl.employeeassigned=time.employeeassigned;
                    hl.seconds=time.seconds;
                    hl.minutes=time.minutes;
                    hl.hours=time.hours;
                    hl.pendingamount=getPendingAmount(time.seconds,time.minutes,time.hours,hl.amount);
                    setTimer(hl);
                }
                else{
                    addNewHourlog(props.task,pairItems(props.task),time);
                }
            }
        }

        setIsRunning((prev)=>!prev);
    };

    const resetTimer = () => {
        time.starttimer=false;
        setTime({ ...time, hours: 0, minutes: 0, seconds: 0 });
        props.hourlog.hours = 0;
        props.hourlog.minutes = 0;
        props.hourlog.seconds = 0;
        setIsRunning(false);
    };
    
    return props.isOpen&&(
        <div className='flex flex-row w-full justify-center'>
            <div key={props.task.id} className='flex flex-row justify-center'>
                <div className='flex flex-row px-2 py-1'>
                    <span className='flex flex-col justify-center'>{parseInt(time.hours).toString().padStart(2, '0')}:</span>
                    <span className='flex flex-col justify-center'>{parseInt(time.minutes).toString().padStart(2, '0')}:</span>
                    <span className='flex flex-col justify-center'>{parseInt(time.seconds).toString().padStart(2, '0')}</span>
                </div>
            </div>
            <button onClick={()=>toggleTimer(time)}>
                {isRunning ?
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM9 8.25a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75H9Zm5.25 0a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75h-.75Z" clipRule="evenodd" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clipRule="evenodd" />
                    </svg> 
                } 
            </button>
            {time&&time.starttimer === true &&
                <button onClick={resetTimer}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm6-2.438c0-.724.588-1.312 1.313-1.312h4.874c.725 0 1.313.588 1.313 1.313v4.874c0 .725-.588 1.313-1.313 1.313H9.564a1.312 1.312 0 0 1-1.313-1.313V9.564Z" clipRule="evenodd" />
                    </svg>
                </button>
            }
        </div>
    );
}

export default Stopwatch;