import React, { useState, useEffect, useContext, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InvoiceTemplate, InvoiceSmallTemplate } from "../components";
import axios from "axios";
import AuthContext from "../utilities/AuthContext";


function Invoice(props) {

  const [openInvoiceTemplateModal, setOpenInvoiceTemplateModal] = useState(false);
  const [openAddInvoiceModal, isOpenAddInvoiceModal] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [invoiceFocus, setInvoiceFocus] = useState(null);
  const {userID} = useContext(AuthContext);

  const validProject = Array.isArray(props.projects) && props.projects.length > 0 ? props.projects : [];
  const validInvoices = Array.isArray(props.invoices) && props.invoices.length > 0 ? props.invoices : [];
  const validTasks = Array.isArray(props.tasks) && props.tasks.length > 0 ? props.tasks : [];

  // const filterProjectInvoices = invoices&&invoices.filter(invoice => invoice.invoice_project === props.projects.id);
  const projectInvoices = validInvoices.map((invoice) => props.projects.some((project)=>project.id===invoice.invoice_project)&&invoice);
  const tasks = validTasks.filter((tasks) => tasks.status === "Finished"&&tasks);
  const user = props.users.filter((user)=> user.id === userID);
  const projects = props.projects.filter(project=>tasks.some(task=>task.projectid===project.id));
  const hourlog = props.hourlog;

  function generateInvoice(project){
    let filterTasks = tasks.filter(task=>task.projectid===project.id);
    let taskids = filterTasks.map(task=>task.id);
    let filteredHourlogs = props.hourlog.filter(
        (item) =>
            item.employeeassigned === userID && taskids.some(taskId=>item.taskid === taskId)
    );
    let total = filteredHourlogs.reduce((acc, hl) => acc+parseFloat(hl.pendingamount),0).toFixed(2);
    let hourlogids = filteredHourlogs.map(hl=>hl.id);
    
    const invoice = {
      invoice_number: props.invoices?props.invoices.length+1:1,
      invoice_to_clientName: project.clientname,
      invoice_to_clientEmAdd: project.clientemadd,
      invoice_from_userId: userID,
      notes: "Thank you for your service",
      invoice_project: project.id,
      invoice_tasks: taskids,
      invoice_hourlogs: hourlogids,
      invoice_total: parseFloat(total)
    }

    if(projectInvoices.some(pi=>pi.invoice_project===project.id)){
      const existingInvoice = projectInvoices.find(pi=>pi.invoice_project===project.id)
      axios
      // .post(`{https://dowee2-server2.vercel.app/updateInvoice/${userID}}`, invoice)
      .post(`{http://localhost:3000/updateInvoice/${existingInvoice.id}}`, invoice)
      .then()
      .catch((error) => {
          console.log(error);
      });
      props.fetchData(userID);
    }else{
      axios
      // .post("https://dowee2-server2.vercel.app/generateInvoice")
      .post("http://localhost:3000/generateInvoice", invoice)
      .then()
      .catch((error) => {
          console.log(error);
      });
      props.fetchData(userID);
    }       
  }

  

  return (
    <>
      <div>
        <div className="flex flex-row w-96 h-full">
          <div className="text-xl mb-2 mr-4 w-fit font-medium text-white">
            Project Invoice
          </div>
          <div className="relative flex flex-col justify-center h-full ml-2 text-white font-thin">
            <button onClick={()=>{projects.map((project)=>generateInvoice(project))}} className="font-Inter text-sm py-1 px-3 rounded-md bg-[#212628]/50">
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
          {projectInvoices && projects && tasks && user && hourlog &&(
            <div className="w-full h-full border-[#AEAEE3] border-[1px]  rounded-lg  flex flex-row gap-5 xl:gap-x-5 xl:gap-y-3 2xl:gap-5 px-3 justify-center flex-wrap">
              {projectInvoices.map(
                (invoice) =>
                  <InvoiceSmallTemplate invoice={invoice} projects={projects} tasks={tasks} user={user} hourlog={hourlog}/>
              )}
            </div>
          )}
          {/* <InvoiceTemplate /> */}
          {/* <div className="w-full h-full border-[#AEAEE3] border-[1px]  rounded-lg  flex flex-row gap-5 xl:gap-x-5 xl:gap-y-3 2xl:gap-5 px-3 justify-center flex-wrap">
              <InvoiceSmallTemplate />
              <InvoiceSmallTemplate/>
              <InvoiceSmallTemplate/>
              <InvoiceSmallTemplate />
              <InvoiceSmallTemplate/>
              <InvoiceSmallTemplate/>
           </div> */}
        </div>
      </div>
    </>
  );
}

export default Invoice;