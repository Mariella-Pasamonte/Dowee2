import React, {useState, useEffect} from 'react';

function Task( {tasks, projectId}){
    const [taskFocus, setTaskFocus] = useState(null);
    const [isTimerStart, setIsTimerStart] = useState(false);
    const [isTimer, setIsTimer] = useState(false);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let intervalId;

        if (isTimerStart) {
        intervalId = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1);
        }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isTimerStart]);

    const toggleTimer = () => {
        setIsTimerStart(prev => !prev);
        setIsTimer(true);
    };

    const resetTimer = () => {
        setSeconds(0);
        setIsTimerStart(false);
        setIsTimer(false);
    };

    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };
    return(
        <>
            <div>
                <div className='flex flex-row w-96 py-2'>
                    <div className="text-xl mb-2 mr-4 w-fit font-medium text-white">
                        Tasks
                    </div>
                    <div className="relative flex flex-col justify-center h-full mr-2 text-white font-thin">
                        <div className="absolute pl-2 flex pointer-events-none">
                            <svg width="800px" height="800px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#D5D8E3" className="w-4 h-4">
                                <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z"/>
                            </svg>          
                        </div>
                        <button className="font-Inter text-sm p-1 pr-3 pl-8 rounded-md bg-[#212628]/50">
                            Hour log
                        </button>
                    </div>
                    <div className="relative flex flex-col justify-center h-full ml-2 text-white font-thin">
                        <div className="absolute pl-2 flex pointer-events-none">
                            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='w-5 h-5'>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 20C15.866 20 19 16.866 19 13C19 11.0824 18.229 9.34498 16.98 8.08071L18.1872 6.87353L17.1265 5.81287L15.8116 7.12778C14.9125 6.54298 13.8708 6.15908 12.7499 6.0397V4.5H15V3H9V4.5H11.2499V6.03971C10.1292 6.1591 9.08749 6.54298 8.18844 7.12773L6.87352 5.81281L5.81286 6.87347L7.02004 8.08065C5.77106 9.34493 5 11.0824 5 13C5 16.866 8.13401 20 12 20ZM12 7.5C8.96243 7.5 6.5 9.96243 6.5 13C6.5 16.0376 8.96243 18.5 12 18.5C15.0376 18.5 17.5 16.0376 17.5 13C17.5 9.96243 15.0376 7.5 12 7.5Z" fill="#D5D8E3"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 12.5V8.99988H11V14H15V12.5H12.5Z" fill="#D5D8E3"/>
                            </svg>       
                        </div>
                        <button className="font-Inter text-sm p-1 pr-3 pl-8 rounded-md bg-[#212628]/50">
                            Customize timer
                        </button>
                    </div>
                </div>
                <div>
                    <table className='w-full'>
                        <thead>
                            <tr className='bg-[#4785C1]/60 font-Inter text-white text-sm'>
                                <th scope="col" className=' rounded-l-md py-2 font-light w-28'>
                                    Task Name
                                </th>
                                <th scope="col" className=' w-44 font-light py-2 px-5'>
                                    Task Description
                                </th>
                                <th scope="col" className=' w-24 font-light '>
                                    Payment
                                </th>
                                <th scope="col" className=' w-24 font-light py-2 px-1'>
                                    Completed
                                </th>
                                <th scope="col" className=' w-32 font-light py-2 px-5'>
                                    Assigned
                                </th>
                                <th scope="col" className=' w-32 font-light py-2 px-2'>
                                    Pending Amount
                                </th>
                                <th scope="col" className=' w-32 font-light py-2 px-5'>
                                    Status
                                </th>
                                <th scope="col" className=' rounded-r-md font-light py-2 w-40'>
                                    Timer
                                </th>
                            </tr>
                        </thead>
                        {tasks &&
                            <tbody>
                                {tasks.map((task)=>
                                    task.projId === projectId &&
                                    <tr key={task.id} className='bg-[#6C93B9]/40 font-Inter text-white text-sm'>
                                        <th scope="row" className='text-center rounded-l-md py-2 font-light w-28'>
                                            {task.name}
                                        </th>
                                        <td className='text-center w-44 font-light py-2 px-5'>
                                            {task.decription}
                                        </td>
                                        <td className='text-center w-24 font-light '>
                                            {task.PaymentMethod}
                                        </td>
                                        <td className='text-center w-24 font-light py-2 px-1'>

                                        </td>
                                        <td className='text-center w-32 font-light py-2 px-5'>

                                        </td>
                                        <td className='text-center w-32 font-light py-2 px-2'>

                                        </td>
                                        <td className='text-center w-32 font-light py-2 px-5'>
                                            On Status
                                        </td>
                                        <td className='flex flex-row justify-center rounded-r-md font-light py-2 w-40'>
                                            <div className='mr-1'>{formatTime(seconds)}</div>
                                            <button className='ml-1' onClick={()=>toggleTimer()}>
                                                {
                                                    isTimerStart ?
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                                            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM9 8.25a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75H9Zm5.25 0a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75h-.75Z" clip-rule="evenodd" />
                                                        </svg>
                                                    :
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                                            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clip-rule="evenodd" />
                                                        </svg>
                                                }
                                            </button>
                                            {isTimer === true &&
                                                <button onClick={()=>resetTimer()}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                                        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm6-2.438c0-.724.588-1.312 1.313-1.312h4.874c.725 0 1.313.588 1.313 1.313v4.874c0 .725-.588 1.313-1.313 1.313H9.564a1.312 1.312 0 0 1-1.313-1.313V9.564Z" clip-rule="evenodd" />
                                                    </svg>
                                                </button>
                                            }
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        }
                    </table>
                </div>
            </div>
        </>
    )
}

export default Task;











