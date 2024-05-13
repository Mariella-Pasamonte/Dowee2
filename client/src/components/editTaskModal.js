import React, {useState, useEffect} from "react";
import {
    InputLabel,
    ErrorToast
} from "../components";

function EditTaskModal(props){
    //Task Details
    const [taskTitle, setTaskTitle] = useState(props.task.name);
    const [paymentType, setPaymentType] = useState(props.task.paymenttype)
    const [priority, setPriority] = useState(props.task.priority);
    const [taskDescription, setTaskDescription] = useState(props.task.description);
    const [amount, setAmount] = useState(props.task.amount);
    const [status, setStatus] = useState(props.task.status);
    const emps = props.employees;
    
    //checks
    const [isFilled, setIsFilled] = useState(true);
    const [nameExist, setNameExist] = useState(false);
    const [nameExistError, setNameExistError]= useState(false);
    const getUsername = (userId) => {
        const user = props.users&&props.users.find(user => user.id === userId);
        return user ? user.username : 'Unknown';
    };
    const amountCheck = checkEmptyAmount(amount);

    useEffect(() => {
        if (!props.isOpen) {
            setTaskTitle(props.task.name);
            setPaymentType(props.task.paymenttype);
            setPriority(props.task.priority);
            setAmount(props.task.amount);
            setTaskDescription(props.task.description);
            setStatus(props.setStatus);
            setIsFilled(true);
            setNameExist(false);
            setNameExistError(false);
        }

    }, [props]);

    function getAmount(e, index){
        const updatedAmount = [...amount];
        updatedAmount[index] = e.target.value; 
        setAmount(updatedAmount);
    }

    function clearAmount( ){
        const clearedAmount = [...amount];
        if(amount.length>1){
            for(let i=0; i<amount.length; i++){
                clearedAmount[i] = '';
                setAmount(clearedAmount);
            }  
        }
    }

    function adjustArrayLength(targetArray, employeeArray) {
        const desiredLength = employeeArray.length;
        
        targetArray.length = desiredLength;
    }
    
    function checkEmptyAmount(array) {
        if(paymentType === 1){
            if(array.length>emps.length){
                adjustArrayLength(array,emps);
            }
    
            if (!array || array.length === 0 || array.length<emps.length) {
              return true;
            }
            return array.every(element => element === "");
        }
    }

    function editTask(){
        const taskExist = props.tasks?props.tasks.some((task)=>task.name===taskTitle&&task.projectid===props.projectId):false;

        if(taskExist===false && taskTitle !== ''&& emps.length!==0 && !amountCheck && taskDescription!==''){
            props.editTask(
                {
                    id:props.task.id,
                    projectid: props.projectId,
                    name: taskTitle,
                    paymenttype: paymentType,
                    priority: priority,
                    amount: amount, 
                    employeelist: emps,
                    desc: taskDescription,
                    status: status
                }
            )
            props.closeModal(false);
            props.setEmployees([]);
            props.setTask(null);
        }else{
            if(taskExist===true){
                setNameExist(true);
                setNameExistError(true);
            }
            setIsFilled(false);
        }
    };

    var inputLabelClassName="flex flex-row text-sm";

    return props.isOpen&&(
        <>
            <div className='z-10 absolute w-full h-[90%] flex flex-row justify-center -top-7'>
                <ErrorToast
                    id='TaskTitleExistError'
                    isError={nameExistError}
                    setIsError={setNameExistError}
                >
                    <div class="ms-3 text-sm font-normal">
                        Task name already exists
                    </div>
                </ErrorToast>
                <div className='static h-fit w-80 bg-[#5C6E75]/50 p-3 border-[1px] border-white/50 rounded-xl backdrop-blur-3xl'>
                    <div className='flex flex-col font-Inter py-2 text-white text-sm w-full'>
                        <div className='flex flex-col text-sm mb-2'>
                            <InputLabel
                                id="taskTitleLabel"
                                isFilled={isFilled?true:taskTitle!==''?true:false}
                                classname={inputLabelClassName}
                            >
                                Task name
                            </InputLabel>
                            <input 
                                id="taskTitle"
                                name="taskTitle"
                                type="text"
                                value={taskTitle}
                                onChange={e=>setTaskTitle(e.target.value)}
                                className="mt-1 text-sm rounded border-[1px] border-[#B2F6FF]/50 bg-inherit py-1 pl-2"
                            />
                        </div>
                        <div className="flex flex-col mb-2">
                            <label className={`${inputLabelClassName} mb-2`}>
                                Priority
                            </label>
                            <div className="flex flex-row justify-between w-3/4">
                                <div className="flex items-center mr-2">
                                    <input
                                        id="lowPriorityRadio"
                                        name="priority"
                                        type="radio"
                                        value={1}
                                        checked={priority===1}
                                        onChange={(e)=>setPriority(parseInt(e.target.value))}
                                        className='w-4 h-4 mr-1 text-[#397AB9] focus:ring-0 focus:ring-offset-0'
                                    />
                                    <label className='text-sm font-medium text-white dark:text-gray-300'>Low</label>
                                </div>
                                <div className="flex items-center mr-2">
                                    <input
                                        id="mediumPriorityRadio"
                                        name="priority"
                                        type="radio"
                                        value={2}
                                        checked={priority===2}
                                        onChange={(e)=>setPriority(parseInt(e.target.value))}
                                        className='w-4 h-4 mr-1 text-[#397AB9] focus:ring-0 focus:ring-offset-0'
                                    />
                                    <label className='text-sm font-medium text-white dark:text-gray-300'>Medium</label>
                                </div>
                                <div className="flex items-center mr-2">
                                    <input
                                        id="highPriorityRadio"
                                        name="priority"
                                        type="radio"
                                        value={3}
                                        checked={priority===3}
                                        onChange={(e)=>setPriority(parseInt(e.target.value))}
                                        className='w-4 h-4 mr-1 text-[#397AB9] focus:ring-0 focus:ring-offset-0'
                                    />
                                    <label className='text-sm font-medium text-white dark:text-gray-300'>High</label>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col mb-2'>
                            <label className="text-sm mb-2">Payment</label>
                            <label className="inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    value={paymentType} 
                                    onChange={()=>{
                                        setPaymentType((prev) => !prev);
                                        setAmount([]);
                                    }}
                                    className="sr-only peer"
                                />
                                <div className="relative w-11 h-6 bg-transparent border-[0.5px] p-3 border-blue-400 peer-focus:outline-none peer-focus:ring-none dark:peer-focus:ring-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 peer-checked:border-blue-600 peer-checked:pr-8"></div>
                                <span className="ms-3 text-sm font-medium text-white dark:text-gray-300">{paymentType?'Hourly Based':'Task Based'}</span>
                            </label>
                        </div>
                        <div className='flex flex-col'>
                            <div className="flex flex-row w-full">
                                <div className={`flex flex-row w-1/2 ${isFilled?'mr-0':'mr-2'}`}>
                                    <InputLabel
                                        id='taskEmployeeAssignedLabel'
                                        isFilled={isFilled?true:emps.length!==0?true:false}
                                        classname={inputLabelClassName}
                                    >
                                        Assigned: 
                                    </InputLabel>
                                    <button
                                        onClick={()=>{
                                            props.openEmployeesModal(true);
                                            props.setEmployees(emps);
                                            clearAmount();
                                        }}
                                        className={`bg-[#8AAEBC]/50 px-2 h-fit rounded-lg text-[10px] ml-1`}
                                    >
                                        {emps.length>0?'Edit':'Add'}
                                    </button>
                                </div>
                                <div className="flex flex-row w-1/2">
                                    <InputLabel
                                        id="taskAmountLabel"
                                        isFilled={isFilled?true:!amountCheck?true:false}
                                        classname={`${inputLabelClassName} mb-[5.5px]`}
                                    >
                                        Amount:
                                    </InputLabel>
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
                                                    type="number"
                                                    value={amount[index]===0?1:amount[index]}
                                                    onChange={(e)=>
                                                        getAmount(e,index)
                                                    }
                                                    onClick={(e)=>
                                                        getAmount(e,index)
                                                    }
                                                    className="w-full text-sm rounded border-[1px] border-[#B2F6FF]/50 bg-inherit py-[2.5px] pl-2 mt-1" 
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
                                            onChange={(e)=>
                                                getAmount(e,0)
                                            }
                                            onClick={(e)=>
                                                getAmount(e,0)
                                            }
                                            className="w-full text-sm rounded border-[1px] border-[#B2F6FF]/50 bg-inherit py-[2.5px] pl-2 mt-1" 
                                        />
                                    </div>
                                </div>
                            }
                        </div>
                        <div className='flex flex-col mt-1 mb-2'>
                            <InputLabel
                                id="taskDescriptionLabel"
                                isFilled={isFilled?true:taskDescription!==''?true:false}
                                classname={inputLabelClassName}
                            >
                                Task description
                            </InputLabel>
                            <textarea
                                id="taskDescription"
                                name="taskDescription"
                                rows="3"
                                value={taskDescription}
                                onChange={e=>setTaskDescription(e.target.value)}
                                type="text"
                                placeholder="Add Description..."
                                className="text-sm resize-none block mt-1 rounded border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1 h-20"
                            />
                        </div>
                        <div className='flex flex-row justify-end'>
                            <button
                                type="button" 
                                onClick={(e)=>{
                                    props.closeModal(false);
                                    props.setEmployees([]);
                                    props.setTask(null);
                                }}
                                className='bg-[#D4F3FF]/50 px-4 py-2 mr-1 rounded-3xl text-xs'
                            > 
                                Cancel
                            </button>

                            <button 
                                type="button" 
                                onClick={()=>{
                                    editTask();
                                }}
                                className='bg-[#50C4F1]/50 px-4 py-2 ml-1 rounded-3xl text-xs'
                            > 
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditTaskModal;