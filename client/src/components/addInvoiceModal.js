import React, {useState, useEffect, useContext, useCallback} from "react";
import InputLabel from "./inputLabel";
import AuthContext from "../utilities/AuthContext";

function AddInvoiceModal(props){
    const [isFilled, setIsFilled] = useState(true);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [project, setProject] = useState(null);
    const {userID} = useContext(AuthContext)
    
    function closeMainModal(){
        props.closeModal(false);
    };

    // const showPreviewInvoice = useCallback(() => {
    //     return 
    //     })
    // },[props, project]);

    var inputLabelClassName="flex flex-row text-sm";
    return props.isOpen &&(
        <>
            <div data-modal-backdrop='static' className='z-10 absolute w-fit h-fit flex flex-row top-11 inset-x-[17%]'>
                <div className='h-fit w-72 bg-[#5C6E75]/50 p-3 border-[1px] border-white/50 rounded-xl backdrop-blur-2xl'>  
                    <div className='flex flex-col font-Inter text-white text-sm w-full'>
                        <div className='flex flex-row justify-end'>
                            <button
                                type="button" 
                                onClick={(e)=>closeMainModal(e)}
                                className='px-1 pb-1 rounded'
                            > 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg> 
                            </button>
                        </div>
                        <div>
                            <InputLabel
                                id="choosProjectLabel"
                                isFilled={isFilled?true:project?true:false}
                                classname={inputLabelClassName}
                            >
                                Choose Project
                            </InputLabel>
                        </div>
                        <div className='relative flex flex-col mb-1'>
                            <input
                                disabled 
                                id="selectProject"
                                name="selectProject"
                                type="text"
                                value={project?project.name:''}
                                placeholder='Select Project'
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
                                        {props.projects.map((project)=>
                                            <li>
                                                <button onClick={() => {setProject(project.id,project.name); setOpenDropdown(false);}} className="block w-full px-4 py-2 hover:bg-gray-400">{project.name}</button>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            }
                        </div>
                        <div className={inputLabelClassName}>
                            Finished Tasks:
                        </div>
                        {project&&
                            <div className="flex flex-col w-full rounded-t-md border-[1px]">
                                <div className="flex flex-row w-full font-bold">
                                    <div className="w-1/2 border-r-[1px] text-center">
                                        Task Name
                                    </div>
                                    <div className="w-1/2 text-center">
                                        Pending Amount
                                    </div>
                                </div>
                                {/* {showPreviewInvoice()} */}
                                <div className="w-full h-20">
                                    {props.tasks.map((task)=>{
                                        <div className="bg-black h-5 w-full border-[1px] border-white">
                                            {task.id}{task.name}
                                        </div>
                                    })}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddInvoiceModal;