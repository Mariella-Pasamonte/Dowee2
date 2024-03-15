import React, {useState} from "react";
import InputMask from 'react-input-mask';

function TaskModal({ closeModal, tasks, length, projectId}){
    const [taskTitle, setTaskTitle] = useState('Task '+String(length).padStart(2,'0'));
    const [paymentType, setPaymentType]= useState(1)
    const [paymentMethod, setPaymentMethod] = useState('');
    const [employeeList, setEmployeeList] = useState('');
    const [taskDescription, setTaskDescription] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(false);
    var idnum = length;

    const getPaymentMethod = (payment) =>{
        payment?setPaymentMethod('Online Payment'):setPaymentMethod('Credit Card');
        setOpenDropdown(false);
    }

    function addTask(){
        closeModal(false);
        tasks(
            {
                projId: projectId,
                id: idnum,
                name: taskTitle,
                paymentType: paymentType,
                paymentMethod: paymentMethod,
                employeeList: employeeList,
                desc: taskDescription,
            }
        ) 
    };

    return(
        <>
            <div className='z-10 absolute w-full h-[90%] flex flex-row justify-center inset-x-0 top-0'>
                <div className=' static h-fit w-1/4 bg-[#5C6E75]/50 p-3 border-[1px] border-white/50 rounded-xl backdrop-blur-sm'>
                    <div className='flex flex-col font-Inter py-2 text-white text-sm w-full'>
                        <div className='flex flex-col mb-2'>
                            <label>Task name</label>
                            <input 
                                id="taskTitle"
                                name="taskTitle"
                                type="text"
                                value={taskTitle}
                                onChange={e=>setTaskTitle(e.target.value)}
                                className="mt-1 rounded border-[1px] border-[#B2F6FF]/50 bg-inherit py-1 pl-2"
                            />
                        </div>
                        <div className='flex flex-col mb-2'>
                            <label className="mb-2">Payment</label>
                            <label class="inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    value={paymentType} 
                                    onChange={()=>setPaymentType((prev) => !prev)} 
                                    className="sr-only peer"
                                />
                                <div className="relative w-11 h-6 bg-blue-400 peer-focus:outline-none peer-focus:ring-none dark:peer-focus:ring-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className="ms-3 text-sm font-medium text-white dark:text-gray-300">{paymentType?'Project Based':'Hourly Based'}</span>
                            </label>
                        </div>
                        <div className='relative flex flex-col mb-2'>
                            <input 
                                type="text"
                                value={paymentMethod}
                                onClick={() => setOpenDropdown((prev)=>!prev)}
                                className="mt-1 rounded border-[1px] border-[#B2F6FF]/50 bg-inherit py-1 pl-2" 
                            />
                            <div className="absolute py-4 end-2 h-full">
                                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                                </svg>
                            </div>
                            { openDropdown===true &&
                                <div className="absolute top-10 z-20 divide-y rounded-lg shadow w-full bg-gray-600">
                                    <ul className="py-2 text-sm text-white ">
                                        <li>
                                            <button onClick={() => getPaymentMethod(0)} className="block w-full px-4 py-2 hover:bg-gray-400">Credit Card</button>
                                        </li>
                                        <li>
                                            <button onClick={() => getPaymentMethod(1)} className="block w-full px-4 py-2 hover:bg-gray-400">Online Payment</button>
                                        </li>
                                    </ul>
                                </div>
                            }
                        </div>
                        <div className='flex flex-col mb-2'>
                            <label>Project description</label>
                            <textarea
                                id="projDescription"
                                name="projDescription"
                                rows="3"
                                onChange={e=>setTaskDescription(e.target.value)}
                                type="text"
                                placeholder="Add Description..."
                                className="resize-none block mt-1 rounded border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1 h-20"
                            />
                        </div>
                        <div className='flex flex-row justify-end'>
                            <button
                                type="button" 
                                onClick={()=>closeModal(false)}
                                className='bg-[#D4F3FF]/50 px-4 py-2 mr-1 rounded-3xl text-xs'
                            > 
                                Cancel
                            </button>

                            <button 
                                type="button" 
                                onClick={()=>addTask()}
                                className='bg-[#50C4F1]/50 px-4 py-2 ml-1 rounded-3xl text-xs'
                            > 
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaskModal;