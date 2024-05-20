import React, { useState, useEffect, useContext } from "react";
import { InvoiceSmallTemplate, AddInvoiceModal } from "../components";
import AuthContext from "../utilities/AuthContext";
import axios from "axios";


function InvoiceModule(props) {
  const [openAddInvoiceModal, isOpenAddInvoiceModal] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [invoiceFocus, setInvoiceFocus] = useState(null);
  const {userID} = useContext(AuthContext);

  const validProjects = props.projects && props.projects.length > 0 ? props.projects : [];
  const validInvoices = props.invoices && props.invoices.length > 0 ? props.invoices : [];
  const validTasks = props.tasks && props.tasks.length > 0 ? props.tasks : [];
  const validUsers = props.users && props.users.length > 0 ? props.users : [];

  const projectInvoices = validProjects.map((project)=>validInvoices.filter(invoice => invoice.invoice_project === project.id));
  const tasks = validTasks.filter(tasks => tasks.status === "Finished");
  const user = validUsers.filter((user)=>user.id===userID);
  const hourlog = props.hourlog;
  
  function addNewInvoice(projectid){
    const taskids = validTasks.filter((task)=>task.projectid===projectid&&task.status==="Finished"&&task.id)
    console.log(taskids);
    // const hourlogs = props.hourlog.map((hl)=>
    //     hl.taskid===taskId&&hl.employeeassigned===userID&&hl.id
    // )
    // const filteredHourlogs = props.hourlog.filter(
    //     (item) =>
    //         item.employeeassigned === userID && item.taskid === taskId
    // );
    // let total = filteredHourlogs.reduce((acc, hl) => acc+parseFloat(hl.pendingamount),0).toFixed(2);
    // const newInvoice = {
    //   invoice_number: props.invoices?props.invoices.length+1:1,
    //   invoice_to_clientName: props.project.clientname,
    //   invoice_to_clientEmAdd: props.project.clientemadd,
    //   invoice_from_userId: userID,
    //   notes: "Thank you for your service",
    //   invoice_project:props.project.id,
    //   invoice_tasks: taskids,
    //   invoice_hourlogs: hourlogs,
    //   invoice_total: parseFloat(total)
    // }
    // axios
    // // .post("https://dowee2-server2.vercel.app/generateInvoice")
    // .post("http://localhost:3000/generateInvoice", newInvoice)
    // .then((res))
    // .catch((error) => {
    //     console.log(error);
    // });
        // if (res.data.status===true){
        //     const invoice = res.data.invoice;
        //     axios
        //     // .post(`{https://dowee2-server2.vercel.app/updateInvoice/${userID}}`, invoice)
        //     .post(`{http://localhost:3000/updateInvoice/${userID}}`, invoice)
        //     .then((res))
        //     .catch((error) => {
        //         console.log(error);
        //     }); ; 
  }

  return (
    <>
      <div>
        <AddInvoiceModal isOpen={openAddInvoiceModal} closeModal={isOpenAddInvoiceModal} projects={validProjects} tasks={tasks} hourlog={props.hourlog}/>
        <div className="flex flex-row w-96 h-full">
          <div className="text-xl mb-2 mr-4 w-fit font-medium text-white">
            Project Invoice
          </div>
          <div className="relative flex flex-col justify-center h-full ml-2 text-white font-thin">
            <button onClick={()=>isOpenAddInvoiceModal(true)} className="font-Inter text-sm py-1 px-3 rounded-md bg-[#212628]/50">
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
          <div className="w-full h-full border-[#AEAEE3] border-[1px]  rounded-lg  flex flex-row gap-5 xl:gap-x-5 xl:gap-y-3 2xl:gap-5 px-3 justify-center flex-wrap">
            {validInvoices.map(
              (invoice) =>
                <InvoiceSmallTemplate invoice={invoice} projects={validProjects} tasks={tasks} user={user} hourlog={hourlog}/>
            )}
          </div>
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

export default InvoiceModule;