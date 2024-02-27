import React, {useState} from 'react';

function ProjectModal({ closeModal, projects, length}){
    const [projTitle, setProjTitle] = useState('Project '+String(length).padStart(2,'0'));
    const [clientName, setClientName]= useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [contactNum, setContactNum] = useState('');
    const [projDescription, setProjDescription] = useState("");
    var idnum = length;
    
    function addProject(){
        closeModal(false);
        projects(
            {
                id: idnum,
                name: projTitle,
                clientName: clientName,
                clientemAdd: emailAddress,
                clientConNum: contactNum,
                desc: projDescription,
            }
        ) 
    };

    return(
        <>
            <div className='absolute w-full h-full flex flex-row justify-center inset-x-0 inset-y-0'>
                <div data-modal-backdrop='static' className='h-fit w-1/4 bg-[#5C6E75]/50 p-3 border-[1px] border-white/50 rounded-xl backdrop-blur-sm'>
                    <div className='flex flex-col font-Inter text-white text-sm w-full'>
                        <div className='flex flex-row justify-end'>
                            <button
                                type="button" 
                                onClick={()=>closeModal(false)}
                                className='px-2 pb-1 rounded'
                            > 
                                x 
                            </button>
                        </div>
                        <div className='flex flex-col mb-2'>
                            <label>Project title</label>
                            <input 
                                id="projTitle"
                                name="projTitle"
                                type="text"
                                value={projTitle}
                                onChange={e=>setProjTitle(e.target.value)}
                                defaultValue="Project 01" 
                                className="mt-1 rounded border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1"
                            />
                        </div>
                        <div className='flex flex-col mb-2'>
                            <label>Client name</label>
                            <input 
                                id="clientName"
                                name="clientName"
                                onChange={e=>setClientName(e.target.value)}
                                type="text"
                                className="mt-1 rounded border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1"
                            />
                        </div>
                        <div className='flex flex-col mb-2'>
                            <label>Email address</label>
                            <input 
                                id="emailAddress"
                                name="emailAddress"
                                onChange={e=>setEmailAddress(e.target.value)}
                                type="text"
                                className="mt-1 rounded border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1"
                            />
                        </div>
                        <div className='flex flex-col mb-2'>
                            <label>Contact number</label>
                            <input 
                                id="contactNum"
                                name="contactNum"
                                onChange={e=>setContactNum(e.target.value)}
                                type="text"
                                className="mt-1 rounded border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1"
                            />
                        </div>
                        <div className='flex flex-row mb-2 w-full'>
                            <div className='flex flex-col w-1/2 pr-1'>
                                <label>Issued on</label>
                                <input 
                                    id="projTitle"
                                    name="projTitle"
                                    type="text"
                                    className="mt-1 rounded border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1"
                                />
                            </div>
                            <div className='flex flex-col w-1/2 pl-1'>
                                <label>Due date</label>
                                <input 
                                    id="projTitle"
                                    name="projTitle"
                                    type="text"
                                    className="mt-1 rounded border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1"
                                />
                            </div>
                        </div>
                        <div className='flex flex-col mb-2'>
                            <label>Project description</label>
                            <input 
                                id="projDescription"
                                name="projDescription"
                                onChange={e=>setProjDescription(e.target.value)}
                                type="text"
                                className="mt-1 rounded border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1 h-20"
                            />
                        </div>
                        <div className='flex flex-row mt-2'>
                            <div className='mr-1'>
                                <label>Employees</label>
                            </div>
                            <button className='bg-[#8AAEBC]/50 px-2 rounded-lg text-[10px] ml-1'>
                                Add
                            </button>
                        </div>
                        <div className='flex flex-row justify-end'>
                            <button 
                                type="button" 
                                onClick={()=>addProject()}
                                className='bg-[#50C4F1]/50 px-4 py-2 rounded-3xl text-xs'
                            > 
                                Create project 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectModal;