import React from 'react';

function Project({ closeModal }){
    return(
        <>
            <div data-modal-backdrop='static' className='absolute h-fit w-1/4 bg-[#5C6E75]/50 p-3 inset-y-1/5 inset-x-2/4 border-[1px] border-white/50 rounded-xl'>
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
                            defaultValue="Project 01" 
                            className="mt-1 rounded border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1"
                        />
                    </div>
                    <div className='flex flex-col mb-2'>
                        <label>Client name</label>
                        <input 
                            id="projTitle"
                            name="projTitle"
                            type="text"
                            className="mt-1 rounded border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1"
                        />
                    </div>
                    <div className='flex flex-col mb-2'>
                        <label>Email address</label>
                        <input 
                            id="projTitle"
                            name="projTitle"
                            type="text"
                            className="mt-1 rounded border-[1px] border-[#B2F6FF]/50 bg-inherit pt-1 pl-1"
                        />
                    </div>
                    <div className='flex flex-col mb-2'>
                        <label>Contact number</label>
                        <input 
                            id="projTitle"
                            name="projTitle"
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
                            id="projTitle"
                            name="projTitle"
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
                            onClick={()=>closeModal(false)}
                            className='bg-[#50C4F1]/50 px-4 py-2 rounded-3xl text-xs'
                        > 
                            Create project 
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Project;