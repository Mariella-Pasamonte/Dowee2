import React from 'react';
import {Link} from 'react-router-dom';

function Navbar(){
    return(
        <>
            <div classname="flex flex-row justify-start h-dvh w-full">
                <div className='bg-[#2E4A55] font-Iceland text-5xl pl-5 py-2 rounded-lg'>
                    <Link to="/home" className='flex flex-row w-fit'>
                        <div className='text-[#A5D9D0]'>DO</div>
                        <div className='text-white'>IFY</div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Navbar;