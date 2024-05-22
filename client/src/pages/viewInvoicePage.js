import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { InvoiceTemplate } from "../components";


const ViewInvoicePage = () => {
    const {id} = useParams("id");
    const navigate = useNavigate();
    const isLoggedIn= localStorage.getItem("isLoggedIn");

    useEffect(()=>{
        if(isLoggedIn===false){
            navigate("/");
        }
    },[])
    return isLoggedIn&&(
        <InvoiceTemplate id={id}/>      
    )
}

export default ViewInvoicePage;