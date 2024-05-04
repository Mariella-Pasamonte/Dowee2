import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Stopwatch(props) {
    const [time, setTime]= useState({id:props.hourlog.id, starttimer:props.hourlog.starttimer, hours: props.hourlog.hours, minutes: props.hourlog.minutes, seconds: props.hourlog.seconds});
    const [isRunning, setIsRunning] = useState(props.hourlog.isrunning);
    let newHours=0;
    let newMinutes=0;
    let newSeconds=0;
    let emp = props.hourlog.employeeassigned
    let userId = localStorage.getItem('userId');

    useEffect(() => {
        let interval;

        if (isRunning===true) {
            interval = setInterval(() => {
                setTime(prevTime => {
                    newSeconds = prevTime.seconds + 1;

                    if (newSeconds === 60) {
                        newMinutes = prevTime.minutes + 1;
                        props.hourlog.minutes=newMinutes;
                        props.hourlog.seconds=0;

                        if (newMinutes === 60) {
                            newHours = prevTime.hours + 1;
                            props.hourlog.hours=newHours;
                            props.hourlog.minutes=0;

                            return { hours: newHours, minutes: 0, seconds: 0 };
                        }

                        return { ...prevTime, minutes: newMinutes, seconds: 0 };
                    }

                    return { ...prevTime, seconds: newSeconds };
                });  
            }, 1000);
        }
  
        return () => clearInterval(interval);
    }, [isRunning, userId, props.hourlog, time, setTime]);
  
    const toggleTimer = () => {
        time.starttimer=true;
        setIsRunning((prev)=>!prev);
        setAxios();
    };

    const resetTimer = () => {
        time.starttimer=false;
        setTime({ hours: 0, minutes: 0, seconds: 0 });
        props.hourlog.hours = 0;
        props.hourlog.minutes = 0;
        props.hourlog.seconds = 0;
        setIsRunning(false);
    };

    function setAxios(){
        console.log("isRunning:",isRunning);
        if(isRunning===true){
            if(props.hourlog.employeeassigned == userId){
                axios
                .post("http://localhost:5000/home", {
                    headers:{
                        function: 'runTimer'
                    },time
                })
                .then((res) => {
                    console.log(time);
                })
                .catch((error) => {
                    console.log("Error: ", error);
                }); 
            }
        }
    }
    
    return props.isOpen&&(
        <div>
            <div key={props.taskId} className='flex flex-row justify-center'>
                <div className='flex flex-row px-2 py-1'>
                    <span className='flex flex-col justify-center'>{time.hours.toString().padStart(2, '0')}:</span>
                    <span className='flex flex-col justify-center'>{time.minutes.toString().padStart(2, '0')}:</span>
                    <span className='flex flex-col justify-center'>{time.seconds.toString().padStart(2, '0')}</span>
                </div>
                {userId == props.hourlog.employeeassigned&&
                    <div>
                        <button onClick={toggleTimer}>
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
                        {time.starttimer === true &&
                            <button onClick={resetTimer}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm6-2.438c0-.724.588-1.312 1.313-1.312h4.874c.725 0 1.313.588 1.313 1.313v4.874c0 .725-.588 1.313-1.313 1.313H9.564a1.312 1.312 0 0 1-1.313-1.313V9.564Z" clipRule="evenodd" />
                                </svg>
                            </button>
                        }
                    </div>
                }
            </div>
        </div>
    );
}

export default Stopwatch;