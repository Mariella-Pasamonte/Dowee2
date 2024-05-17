import React from "react";
import axios from "axios";
import { useState } from "react";

function InvoiceSmallTemplate(props){
    const [invoice, setInvoice] = useState({});
    return(
        <div name="mainbox" className="p-5 lg:w-[470px] w-full bg-[#4F8FA8]/50 rounded-md text-white drop-shadow-md font-sans flex flex-col ">
            <div name="headerInvoiceTitle" className="mx-3 text-[30px] font-medium uppercase border-white" >
                {invoice.number}TEST
            </div>
            <div name="invoiceClientName" className="text-[15px] mx-3 font-small uppercase">
                {invoice.clientname}CLIENTNAME
            </div>
            <div name="invoiceStatus"className="text-[15px] mx-3 uppercase">
                    {invoice.status}STATUSTEST
            </div> 
            <div className="m-3 text-[18px] pt-6 pb-6 bg-[#284955] rounded-lg text-center drop-shadow-xl font-mono">
                    Total Invoice Amount: {invoice.total}69420
                </div>
            <div className="w-full flex justify-center">
                <a href={`/invoice/${props.id}`} className="rounded-full bg-white text-black text-center py-3 px-7 w-fit m-3 mb-7 hover:bg-gray-200">
                    View Invoice    
                </a>
            </div>
        </div>
    )
}

export default InvoiceSmallTemplate;