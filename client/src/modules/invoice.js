import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InvoiceTemplate, InvoiceSmallTemplate } from "../components";
import axios from "axios";


function Invoice({ invoices, projectId }) {
  const [openInvoiceTemplateModal, setOpenInvoiceTemplateModal] =
    useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [invoiceFocus, setInvoiceFocus] = useState(null);
  let userId = parseInt(localStorage.getItem("userId"));

  function handleInvoiceTemplateModal() {
    setOpenInvoiceTemplateModal(true);
  }

  return (
    <>
      <div>
        <div className="flex flex-row w-96 py-2">
          <div className="text-xl mb-2 mr-4 w-fit font-medium text-white">
            Project Invoice
          </div>
          <div className="relative flex flex-col justify-center h-full mr-2 text-white font-thin">
          </div>
          <div className="relative flex flex-col justify-center h-full ml-2 text-white font-thin">
            <button className="font-Inter text-sm py-1 px-3 rounded-md bg-[#212628]/50">
              Generate Invoice
            </button>
          </div>
        </div>
        <div>
          {invoices && (
            <div className="flex flex-row">
              {invoices.map(
                (invoice) =>
                  invoice.projId === projectId && (
                    <div
                      key={invoice.id}
                      className="rounded-md bg-[#4F8FA8]/50 h-28 w-48 p-3">
                      <div className="font-Inter text-white text-lg">
                        {invoice.name}
                      </div>
                    </div>
                  )
              )}
            </div>
          )}
          {/* <InvoiceTemplate /> */}
          <div className="w-100 h-100 border-[#AEAEE3] border-[1px] rounded-lg flex flex-row gap-3 py-3 px-3 justify-center flex-wrap">
              <InvoiceSmallTemplate id={1}/>
              <InvoiceSmallTemplate id={2}/>
              <InvoiceSmallTemplate/>
              <InvoiceSmallTemplate/>
              <InvoiceSmallTemplate/>
              <InvoiceSmallTemplate/>
           </div>
        </div>
      </div>
    </>
  );
}

export default Invoice;
