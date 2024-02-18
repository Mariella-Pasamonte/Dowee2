import React from "react";
//import {Link} from "react-router-dom";
import Navbar from "../modules/navbar";
import Sidebar from "../modules/sidebar";

const Home = () => {
    return(
        <>
            <div className='static flex flex-col h-dvh'>
                <div className='my-3 ml-3 flex flex-col h-full'>
                    <div className='mb-3 mr-3'>
                        <Navbar/>
                    </div>
                    <div className="h-full flex flex-row">
                        <div className="h-full w-1/4 mr-2">
                            <Sidebar/>
                        </div>
                        <div className="h-full w-3/4 pl-2">
                            <div className="h-full border-y-[1px] border-l-[1px] border-white/20 bg-gradient-to-r from-[#6F6483]/50 to-[#4F2E5D]/50 rounded-l-3xl">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;