import React, {useState, useCallback, useMemo, useContext, useEffect} from 'react';
import {
    Stopwatch,
    HourlogModal
} from "../components";
import AuthContext from '../utilities/AuthContext';
import axios from 'axios';

function Task(props){
    const {userID} = useContext(AuthContext);
    const [taskFocus, setTaskFocus] = useState(null);
    const [isOpenHourlog, setIsOpenHourlog] = useState(false);
    const [users, setUsers] = useState([]);
    const getUsername = (userId) => {
        const user = users.find(user => user.id === userId);
        return user ? user.username : 'Unknown';
    };
    const tasks = useMemo(()=> {
        return props.tasks?props.tasks.filter((task)=>task.projectid === props.projectId):[];
    },[props]);

    const memoizedFetchUsers = useCallback(() => {
        axios
        .get('https://dowee2-server2.vercel.app/getUsers', {})
        // .get('http://localhost:3000/getUsers', {})
        .then((response)=>{
            setUsers(response.data.users);
        })
        .catch((error) =>{
            console.log(error);
        });
    },[setUsers]);

    function getAmount(amntArr){
        let most = 0;
        let least = 0;
        let temp = 0;
        if(amntArr.length>1){
            amntArr.map((amnt,index)=>{
                if(most<=amnt){
                    temp = most;
                    most = amnt;
                    if(index-1>=0){
                        if(least===0){
                            least=amntArr[index-1];
                        }else if(least>=temp){
                            least=amntArr[index-1];
                        }
                    }
                }else{                    
                    if(least===0){
                        least=amnt;
                    }else if(least>=amnt){
                        least=amnt;
                    }
                }
            })
            if(most===least){
                return most;
            }else{ 
                return least+"-"+most;
            }
        }
        return amntArr[0];
    }

    function truncatedEmpNames(emp){
        let empUsernames = emp.map(employee =>getUsername(employee));
        let joinEmpUsernames = empUsernames.join(', ');
        
        return joinEmpUsernames.length > 15 ? joinEmpUsernames.slice(0,15) + '...' : joinEmpUsernames;
    }

    const truncatedDescription =(desc)=>{
        if(desc.length === 0) return 'N/A';
        else return desc.length > 15 ? desc.slice(0, 15) + '...' : desc;
    }

    const memoizedTaskRows = useCallback(() => {
        return tasks.map((task)=>
            task.projectid === props.projectId &&
            <tr onClick={(e)=>{taskFocus===task.id?setTaskFocus(null):setTaskFocus(task.id)} } className={`ml-2 font-Inter h-14 w-fit text-white text-sm ${taskFocus===task.id?'bg-[#6C93B9]/60':'bg-[#6C93B9]/40'}`}>
                <td className={`rounded-l-md font-light w-24  h-14 ${props.edit?'w-24':'w-10'}`}>
                    <div className=' my-2 flex flex-row justify-center h-full'>
                        <button
                            onClick={()=>{
                                props.setTask(task);
                                props.setOpenTaskModal(true);
                            }} 
                            className='text-white'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width='22' height="22" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className='ml-1 mr-1'>
                                <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                        </button>
                        {props.edit&&
                            <div className='flex flex-row'>
                                <button
                                    onClick={(e)=>{
                                        props.setOpenEditTaskModal(true);
                                        props.setEmployees(task.employeelist);
                                        props.setEditedTask(task);
                                    }} 
                                    className='text-white'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" viewBox="0 0 256 256" className='mr-1'>
                                        <path d="M225.9,74.78,181.21,30.09a14,14,0,0,0-19.8,0L38.1,153.41a13.94,13.94,0,0,0-4.1,9.9V208a14,14,0,0,0,14,14H92.69a13.94,13.94,0,0,0,9.9-4.1L225.9,94.58a14,14,0,0,0,0-19.8ZM94.1,209.41a2,2,0,0,1-1.41.59H48a2,2,0,0,1-2-2V163.31a2,2,0,0,1,.59-1.41L136,72.48,183.51,120ZM217.41,86.1,192,111.51,144.49,64,169.9,38.58a2,2,0,0,1,2.83,0l44.68,44.69a2,2,0,0,1,0,2.83Z"></path>
                                    </svg>
                                </button>
                                <button 
                                    onClick={(e)=>{
                                        props.setOpenDeleteWarningModal(true);
                                        props.setDeletedTask(task);
                                    }}
                                    className='text-[#F02E1B]'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width='22' height="22" viewBox="0 0 24 24" fill="currentColor" className="">
                                        <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                                    </svg>
                                </button> 
                            </div>
                        }
                    </div>
                </td>
                <td className='text-center pl-2 py-2 font-light w-24 '>
                    {task.name}
                </td>
                <td className=' text-center w-44 font-light py-2 px-5'>
                    {truncatedDescription(task.description)}
                </td>
                <td className=' text-center w-24 font-light '>
                    {getAmount(task.amount)}
                </td>
                <td className=' text-center w-40 font-light py-2 px-5'>
                    {truncatedEmpNames(task.employeelist)}
                </td>
                <td className=' text-center w-32 font-light py-2 px-5'>
                    {task.status}
                </td>
                <td className='rounded-r-md border-1 border-black font-light py-3 w-40'>
                    {task.employeelist.map((emp)=>
                        emp === userID&&
                        <Stopwatch isOpen={task.paymenttype} task={task} hourlog={props.hourlog} fetchData={props.fetchData}/>
                    )}
                </td>
            </tr>
        )
    },[tasks, props, taskFocus, truncatedEmpNames, userID]);

    useEffect(() => {
        memoizedFetchUsers();
    })
    return(
        <>
            <div className='relative'>
                <HourlogModal isOpen={isOpenHourlog} closeModal={setIsOpenHourlog} projectId={props.projectId} hourlog={props.hourlog} tasks={props.tasks} issuedDate={props.issuedDate} dueDate={props.dueDate} userId={userID} fetchData={props.fetchData}/>
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
                        <button
                            onClick={()=>setIsOpenHourlog(true)}
                            className="font-Inter text-sm p-1 pr-3 pl-8 rounded-md bg-[#212628]/50"
                        >
                            Hour log
                        </button>
                    </div>
                </div>
                <div className='overflow-hidden max-h-80 w-fit rounded-b-md'>
                    <table className='flex flex-col w-full'>
                        <thead className='sticky top-0'>
                            <tr className='bg-[#4785C1] font-Inter text-white text-sm'>
                                <th scope="col" className='rounded-l-md font-light h-8 w-24'>
                                </th>
                                <th scope="col" className=' pl-2 py-2 font-light w-24 h-4'>
                                    Task Name
                                </th>
                                <th scope="col" className='  w-44 font-light py-2 px-5 h-4'>
                                    Task Description
                                </th>
                                <th scope="col" className=' w-24 font-light h-4'>
                                    Payment
                                </th>
                                <th scope="col" className=' w-40 font-light py-2 px-5 h-4'>
                                    Assigned
                                </th>
                                <th scope="col" className=' w-32 font-light py-2 px-5 h-4'>
                                    Status
                                </th>
                                <th scope="col" className=' rounded-r-md font-light py-2 w-40 h-4'>
                                    Timer
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.tasks &&
                                memoizedTaskRows()
                            }
                            {tasks.length===0&&
                                <div className="flex flex-col justify-center h-48 ">
                                    <div className="flex flex-row justify-center text-white/70">
                                        Press "Create Task" button to add new Task
                                    </div>
                                </div>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Task;











