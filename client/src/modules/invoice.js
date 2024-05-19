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
        <div className="flex flex-row w-96 h-full">
          <div className="text-xl mb-2 mr-4 w-fit font-medium text-white">
            Project Invoice
          </div>
          <div className="relative flex flex-col justify-center h-full ml-2 text-white font-thin">
            <button className="font-Inter text-sm py-1 px-3 rounded-md bg-[#212628]/50">
              Generate Invoice
            </button>
          </div>
          <nav aria-label="Page navigation" className="absolute right-0">
            <ul className="flex items-center h-6 text-sm ">
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span className="sr-only">Previous</span>
                  <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white ">1</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
              </li>
              <li>
                <a href="#" aria-current="page" className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">3</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span className="sr-only">Next</span>
                  <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex h-[30rem] xl:h-full">
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
          <div className="w-full h-full border-[#AEAEE3] border-[1px]  rounded-lg  flex flex-row gap-5 xl:gap-x-5 xl:gap-y-3 2xl:gap-5 px-3 justify-center flex-wrap">
              <InvoiceSmallTemplate />
              <InvoiceSmallTemplate />
              <InvoiceSmallTemplate/>
              <InvoiceSmallTemplate/>
              {/* <InvoiceSmallTemplate/>
              <InvoiceSmallTemplate/> */}
           </div>
        </div>
      </div>
    </>
  );
}

export default Invoice;
