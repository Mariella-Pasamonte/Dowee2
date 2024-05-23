import React, {useState, useEffect, useCallback, useContext} from "react";
//import {Link} from "react-router-dom";
import Navbar from "../modules/navbar";
import Sidebar from "../modules/sidebar";
import axios from "axios";
import AuthContext from "../utilities/AuthContext";
import "../components/css/style.css"

const Home = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [projList, setProjList] = useState(null);
    const [project, setProject] = useState(null);
    const [projectFocus, setProjectFocus] = useState(null);
    const [users, setUsers] = useState(null);
    const {userID} = useContext(AuthContext);

    const memoizedFetchData = useCallback((userId) => {
        setIsLoading(true);
        axios
        .get('https://dowee2-server2.vercel.app/home', {
        // .get('http://localhost:3000/home', {
          headers:{ 
            userId: userId
          }
        })
        .then((response)=>{
            setProjList(response.data.projects);
            setUsers(response.data.users);
        })
        .catch((error) =>{
            console.log(error);
        })
        .finally((res)=>{
            setIsLoading(false);
        });
    },[setProjList, setUsers]);

    useEffect(() => {
        memoizedFetchData(userID);
    },[ userID, memoizedFetchData])

    let username = users && users.find(user => user.id === userID).username;

    return( 
        <div className='static flex flex-col h-dvh'>
            {isLoading&&<div id="loading-animation"></div>}
            <div className='relative my-3 ml-3 flex flex-col h-full justify-center'>
                <div className='mb-3 mr-3'>
                    <Navbar user={username} userid={userID}/>
                </div>
                <div className="h-full flex flex-row">
                    <div className="h-full w-1/6 mr-2">
                        <Sidebar projectFocus={projectFocus} projList={projList} users={users} fetchData={memoizedFetchData}/>
                    </div>
                    <div className="relative h-full w-5/6 pl-2">
                        <div className="h-full border-y-[1px] border-l-[1px] border-white/20 bg-gradient-to-r from-[#6F6483]/60 to-[#4F2E5D]/60 rounded-l-3xl">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;