import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { InvoiceTemplate } from "../components";


const ViewInvoicePage = () => {
    const {id} = useParams("id");

    return(
        <InvoiceTemplate id={id}/>      
    )
}

export default ViewInvoicePage;