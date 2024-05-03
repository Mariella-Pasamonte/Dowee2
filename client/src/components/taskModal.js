import React, {useState, useEffect} from "react";

function TaskModal(props){
    const [taskTitle, setTaskTitle] = useState('Task '+String(props.tasks.length).padStart(2,'0'));
    const [paymentType, setPaymentType]= useState(1)
    const [amount, setAmount] = useState(0.00);
    const [employeeList, setEmployeeList] = useState([]);
    const [taskDescription, setTaskDescription] = useState("");
    const [openDropdown, setOpenDropdown] = useState(false);
    var idnum = props.tasks===null?0:props.tasks.length;

    useEffect(() => {

        if (!props.isOpen) {
            setTaskTitle('Task ' + String(props.tasks&&props.tasks.length).padStart(2, '0'));
            setPaymentType(1);
            setEmployeeList('');
            setTaskDescription('');
        }

    }, [props.isOpen]);

    function addTask(){
        props.closeModal(false);
        props.addNewTasks(
            {
                id: idnum,
                projectid: props.projectId,
                name: taskTitle,
                paymenttype: paymentType,
                amount: amount, 
                employeeassigned: employeeList,
                desc: taskDescription,
                status: 'Not started', 
                seconds: 0,
                minutes: 0, 
                hours: 0,
                istimerstart: false,
                pendingamount: 0.00,
            }
        )
    };

    return props.isOpen&&(
        <>
            <div className='z-10 absolute w-full h-[90%] flex flex-row justify-center top-0'>
                <div className=' static h-fit w-1/4 bg-[#5C6E75]/50 p-3 border-[1px] border-white/50 rounded-xl backdrop-blur-3xl'>
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
                            <label className="inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    value={paymentType} 
                                    onChange={()=>setPaymentType((prev) => !prev)} 
                                    className="sr-only peer"
                                />
                                <div className="relative w-11 h-6 bg-transparent border-[0.5px] p-3 border-blue-400 peer-focus:outline-none peer-focus:ring-none dark:peer-focus:ring-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 peer-checked:border-blue-600 peer-checked:pr-8"></div>
                                <span className="ms-3 text-sm font-medium text-white dark:text-gray-300">{paymentType?'Task Based':'Hourly Based'}</span>
                            </label>
                        </div>
                        <div className='relative flex flex-col mb-2'>
                            <input 
                                type="number"
                                value={amount}
                                onChange={(e)=>{setAmount(e.target.value)}}s
                                className="mt-1 rounded border-[1px] border-[#B2F6FF]/50 bg-inherit py-1 pl-2" 
                            />
                        </div>
                        <div className='flex flex-col mb-2'>
                            <label>Task description</label>
                            <textarea
                                id="projDescription"
                                name="projDescription"
                                rows="3"
                                value={taskDescription}
                                onChange={e=>setTaskDescription(e.target.value)}
                                type="text"
                                placeholder="Add Description..."
                                className="resize-none block mt-1 rounded border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1 h-20"
                            />
                        </div>
                        <div className='flex flex-row justify-end'>
                            <button
                                type="button" 
                                onClick={()=>props.closeModal(false)}
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