import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function InvoiceSmallTemplate(props){
    const [invoice, setInvoice] = useState({});
    const navigate = useNavigate();
    return(
        <div name="mainbox" className="p-5 xl:pt-1 xl:pb-1 2xl:p-5 lg:w-[470px] xl:w-[480px] 2xl:w-[470px] bg-[#4F8FA8]/50 rounded-md text-white drop-shadow-md font-sans flex flex-col">
            <div name="headerInvoiceTitle" className="mx-3 text-[30px] xl:text-[22px] 2xl:text-[30px] font-medium uppercase border-white" >
                {invoice.number}TEST
            </div>
            <div name="invoiceClientName" className="text-[15px] xl:text-[14px] 2xl:text-[15px] mx-3 font-small uppercase">
                {invoice.clientname}CLIENTNAME
            </div>
            <div name="invoiceStatus"className="text-[15px] xl:text-[14px] 2xl:text-[15px] mx-3 uppercase">
                    {invoice.status}STATUSTEST
            </div> 
            <div className="mx-3 my-1 self-center text-[18px] xl:text-[16px] 2xl:text-[18px] w-fit px-6 py-6 xl:py-2 2xl:py-6 bg-[#284955] rounded-lg text-center drop-shadow-xl font-mono">
                Total Invoice Amount: {invoice.total}69420
            </div>
            <div className="w-full flex justify-center">
                <button onClick={()=>navigate(`/invoice/${props.id}`)} className="rounded-full bg-white text-black text-center text-base xl:text-sm 2xl:text-base py-1 2xl:py-3 px-7 xl:px-4 2xl:px-7 w-fit m-3 xl:m-1 2xl:m-3  hover:bg-gray-200">
                    View Invoice    
                </button>
            </div>
        </div>
    )
}

export default InvoiceSmallTemplate;