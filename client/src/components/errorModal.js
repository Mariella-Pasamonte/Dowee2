import React, {useState, useEffect, useRef, useCallback} from "react";

function ErrorModal(props){
    return props.isOpen&&(
        <div data-modal-backdrop='static' className='z-10 absolute w-[99%] h-fit flex flex-row justify-center'>
            <div className='h-fit w-80 bg-[#5C6E75]/50 px-3 py-4 border-[1px] border-white/50 rounded-xl backdrop-blur-md'>
                <div className="flex flex-row justify-center text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </div>
                <div className="flex flex-row justify-center mt-3">
                    {props.children}
                </div>
                <div className='flex flex-row justify-center mt-5'>
                    <button
                        type="button" 
                        onClick={(e)=>{
                            props.closeModal(false);
                            props.delete()
                        }}
                        className='px-3 py-2 mr-4 text-sm rounded-3xl bg-red-500'
                    > 
                        Delete
                    </button>
                    <button
                        type="button" 
                        onClick={(e)=>{
                            props.closeModal(false);
                        }}
                        className='px-3 py-2 text-sm rounded-3xl border-[0.5px] border-white hover:bg-slate-400'
                    > 
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ErrorModal;