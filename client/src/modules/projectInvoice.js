import React, { useContext, useState } from "react";
import Invoice from "./invoice";
import AuthContext from "../utilities/AuthContext";
import { useNavigate } from "react-router-dom";

function ProjectInvoice(props) {
    const navigate = useNavigate();
    const [projectButtonsFocus, setProjectButtonsFocus] = useState(0);
    const [edit, setEdit] = useState(false);
    const { userID } = useContext(AuthContext);

    const onClickInvoice = () => {
        navigate(`/project/${props.project.name}/${props.project.userid}/1`);
    };
    const onClickViewTask = () => {
        navigate(`/project/${props.project.name}/${props.project.userid}/0`);
    };

  return (
    <>
      <div className="h-full w-full px-5 py-3">
        <div className="relative flex flex-col ">
          <div className="flex flex-row w-full justify-between">
            <div className="flex flex-col justify-between pt-2">
              <div className="flex flex-row">
                <div className="text-2xl mb-2 mr-2 w-fit text-white">
                  {props.project.name}
                </div>
                <div className="relative flex flex-row just">
                  <button
                    onClick={(e) => props.setOpenProjectModal((prev) => !prev)}
                    className="flex flex-col mx-2 text-[#B8B8E7] justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <hr className="w-full h-1 bg-[#8381BB] border-0 rounded dark:bg-gray-700" />
            </div>
            <div className="flex flex-row text-[#AEAEE3] justify-end font-thin w-64 mb-3 pr-2">
              <div className="relative ml-2 flex flex-col justify-center h-full">
                <button
                  key={1}
                  onClick={() => {
                    setEdit(false);
                    setProjectButtonsFocus(1);
                  }}
                  className={`p-1 pr-3 pl-8 rounded-md ${
                    projectButtonsFocus === 1
                      ? "bg-[#4A4999] text-[#D5D5FF]"
                      : "bg-[#292944]"
                  } `}>
                  <div className="absolute -inset-x-0 -inset-y-0 top-1/4 left-[10%] flex pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>
                  </div>
                  Star
                </button>
              </div>
              <div className="relative ml-2 flex flex-col justify-center h-full">
                <button
                  key={0}
                  onClick={() => {
                    setEdit(false);
                    setProjectButtonsFocus(0);
                  }}
                  className={`p-1 pr-3 pl-8 rounded-md ${
                    projectButtonsFocus === 0
                      ? "bg-[#4A4999] text-[#D5D5FF]"
                      : "bg-[#292944]"
                  } `}>
                  <div className="absolute -inset-x-0 -inset-y-0 top-1/4 left-[10%] flex pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  </div>
                  Finish
                </button>
              </div>
            </div>
          </div>
          <hr className="absolute w-full h-0.5 inset-y-[49px] bg-[#8381BB] border-0 rounded dark:bg-gray-700" />
          <div className="flex flex-row justify-between w-[210px] py-2">
            <div className="relative flex flex-col justify-center h-full text-white font-thin">
              <div className="absolute pl-2 flex pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </div>
              <button
                onClick={() => onClickViewTask()}
                className='p-1 pr-3 pl-8 rounded-md bg-[#7890A8]'>
                View Tasks
              </button>
            </div>
            <div className="relative flex flex-col justify-center h-full text-white font-thin">
              <div className="absolute pl-2 flex pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
              </div>

              <button
                onClick={() => onClickInvoice()}
                className='p-1 pr-3 pl-8 rounded-md bg-[#397AB9]'>
                Invoice
              </button>
            </div>
          </div>
          <div>
                <Invoice
                    invoices={props.invoices}
                    projects={props.projects}
                    tasks={props.tasks}
                    hourlog={props.hourlog}
                    users={props.users}
                    fetchData={props.fetchData}
                />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectInvoice;
