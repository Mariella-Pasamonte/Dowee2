import React, {useState, useEffect} from "react";

function TaskModal(props){
    const [taskTitle, setTaskTitle] = useState(props.task.name);
    const [paymentType, setPaymentType] = useState(props.task.paymenttype)
    const [taskDescription, setTaskDescription] = useState(props.task.description);
    const [amount, setAmount] = useState(props.task.amount);
    const [status, setStatus] = useState(props.task.status);
    const emps = props.task.employeelist;

    const getUsername = (userId) => {
        const user = props.users&&props.users.find(user => user.id === userId);
        return user ? user.username : 'Unknown';
    };

    useEffect(() => {
        if (!props.isOpen) {
            setTaskTitle(props.task.name);
            setPaymentType(props.task.paymenttype);
            setTaskDescription(props.task.description);
            setAmount(props.task.amount);
            setStatus(props.setStatus);
        }

    }, [props]);

    var inputLabelClassName="flex flex-row text-sm";

    return props.isOpen&&(
        <>
            <div className='z-10 absolute w-full h-[90%] flex flex-row justify-center -top-7'>
                <div className='static h-fit w-80 bg-[#5C6E75]/50 p-3 border-[1px] border-white/50 rounded-xl backdrop-blur-3xl'>
                    <div className='flex flex-col font-Inter py-2 text-white text-sm w-full'>
                        <div className="flex flex-row justify-end"> 
                            <button 
                                type="button" 
                                onClick={()=>{
                                    props.closeModal(false);
                                    props.setTask({});
                                }}
                                className='rounded-full p-1 hover:bg-white/20'
                            > 
                                <svg id="XButton" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" onClick={(e)=>{props.closeModal(false); props.setTask({});}} className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className='flex flex-col text-sm mb-2'>
                            <label
                                id="taskTitleLabel"
                                classname={inputLabelClassName}
                            >
                                Task name
                            </label>
                            <input 
                                id="taskTitle"
                                name="taskTitle"
                                type="text"
                                value={taskTitle}
                                className="mt-1 text-sm rounded border-[1px] border-[#B2F6FF]/50 bg-inherit py-1 pl-2"
                                disabled
                            />
                        </div>
                        <div className='flex flex-col mb-2'>
                            <label className="text-sm mb-2">Payment</label>
                            <label className="inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    value={paymentType} 
                                    className="sr-only peer"
                                    disabled
                                />
                                <div className="relative w-11 h-6 bg-transparent border-[0.5px] p-3 border-blue-400 peer-focus:outline-none peer-focus:ring-none dark:peer-focus:ring-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 peer-checked:border-blue-600 peer-checked:pr-8"></div>
                                <span className="ms-3 text-sm font-medium text-white dark:text-gray-300">{paymentType?'Hourly Based':'Task Based'}</span>
                            </label>
                        </div>
                        <div className='flex flex-col'>
                            <div className="flex flex-row w-full">
                                <div className='flex flex-row w-1/2 mr-2'>
                                    <label
                                        id='taskEmployeeAssignedLabel'
                                        classname={inputLabelClassName}
                                    >
                                        Assigned: 
                                    </label>
                                </div>
                                <div className="flex flex-row w-1/2">
                                    <label
                                        id="taskAmountLabel"
                                        classname={`${inputLabelClassName} mb-[5.5px]`}
                                    >
                                        Amount:
                                    </label>
                                </div>
                            </div>
                            {
                                paymentType?
                                <div className="flex flex-col overflow-x-auto max-h-24 w-full mb-2">
                                    {emps.map((emp, index)=>
                                        <div className="flex flex-row w-full">
                                            <div className={`flex flex-row w-1/2 ${paymentType?'py-1 my-[1.5px] justify-end pr-3':null} `}>
                                                {getUsername(emp)}
                                            </div> 
                                            <div className="w-1/2">
                                                <input 
                                                    type="text"
                                                    value={`${amount[index]}/hr`}
                                                    className="w-full text-sm rounded border-[1px] border-[#B2F6FF]/50 bg-inherit py-[2.5px] pl-2 mt-1" 
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                :
                                <div className="flex flex-row w-full mb-2">
                                    <div className={`flex flex-col w-1/2 overflow-x-auto max-h-24 ${paymentType?'py-1 my-[1.5px] justify-end pr-3':null} `}>
                                        {emps.map((emp)=>
                                            <div>
                                                {getUsername(emp)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="w-1/2">
                                        <input 
                                            type="number"
                                            value={amount[0]}
                                            className="w-full text-sm rounded border-[1px] border-[#B2F6FF]/50 bg-inherit py-[2.5px] pl-2 mt-1" 
                                            disabled
                                        />
                                    </div>
                                </div>
                            }
                        </div>
                        <div className='flex flex-col mt-1 mb-2'>
                            <label
                                id="taskDescriptionLabel"
                                classname={inputLabelClassName}
                            >
                                Task description
                            </label>
                            <textarea
                                id="taskDescription"
                                name="taskDescription"
                                rows="3"
                                value={taskDescription}
                                type="text"
                                placeholder="Add Description..."
                                className="resize-none block mt-1 rounded border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1 h-20"
                                disabled
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaskModal;