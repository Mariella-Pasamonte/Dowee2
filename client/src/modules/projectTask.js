import React, { useContext, useState } from "react";
//import {Link} from "react-router-dom";
import Task from "./task";
import Invoice from "./invoice";
import {
  AddTaskModal,
  EditTaskModal,
  TaskModal,
  EditEmployeesModal,
  WarningModal,
} from "../components";
import axios from "axios";
import AuthContext from "../utilities/AuthContext";
import { useNavigate } from "react-router-dom";

function ProjectTask(props) {
  const navigate = useNavigate();
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
  const [openEditTaskModal, setOpenEditTaskModal] = useState(false);
  const [openDeleteWarningModal, setOpenDeleteWarningModal] = useState(false);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [projectButtonsFocus, setProjectButtonsFocus] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);
  const [openEmployeesModal, setOpenEmployeesModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editedTask, setEditedTask] = useState(null);

  const [deletedTask, setDeletedTask] = useState(null);
  const [task, setTask] = useState(null);
  const users = props.project.employees.map((emp) =>
    props.users.find((user) => user.id === emp)
  );
  const { userID } = useContext(AuthContext);

  const getEmployees = (newEmployee) => {
    if (employeeList.length > 0) {
      const isEmp = employeeList.find((emp) => emp === newEmployee);
      !isEmp && setEmployeeList((previous) => [...previous, newEmployee]);
    } else {
      setEmployeeList([newEmployee]);
    }
  };

  const removeEmployee = (employeeId) => {
    const editedEmployees = employeeList.filter(
      (employee) => employee !== employeeId
    );
    setEmployeeList(editedEmployees);
  };

  function addNewTask(newTask) {
    axios
      .post("https://dowee2-server2.vercel.app/addTask",newTask)
      // .post("http://localhost:3000/addTask", newTask)
      .then((res) => {
        console.log(newTask);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
    props.fetchData(userID);
  }

  function editTask(editedTask) {
    axios
      .post("https://dowee2-server2.vercel.app/editTask",editedTask)
      // .post("http://localhost:3000/editTask", editedTask)
      .then((res) => {
        console.log(editedTask);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
    props.fetchData(userID);
  }

  function deleteTask(deleteTask) {
    axios
      .post("https://dowee2-server2.vercel.app/deleteTask",deleteTask)
      // .post("http://localhost:3000/deleteTask", deleteTask)
      .then((res) => {
        console.log(deleteTask);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
    props.fetchData(userID);
  }

  const onClickCreateTask = () => {
    setOpenAddTaskModal(true);
    setEdit(false);
  };

  const onClickInvoice = () => {
    navigate(`/project/${props.project.name}/${props.project.userid}/1`);
  };
  const onClickViewTask = () => {
    navigate(`/project/${props.project.name}/${props.project.userid}/0`);
  };

  console.log("project userID:", props.project.userid===userID);
  return (
    <>
      <div className="h-full w-full px-5 py-3">
        <EditEmployeesModal
          isOpen={openEmployeesModal}
          closeModal={setOpenEmployeesModal}
          employees={employeeList}
          getEmployees={getEmployees}
          removeEmployee={removeEmployee}
          users={users}
        />
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
                  <div className="relative flex flex-row just text-white">
                    <div className="relative flex flex-col justify-center h-full text-white font-thin">
                      <button
                        key={0}
                        onClick={() => onClickCreateTask()}
                        className={`p-1 pr-3 pl-8 rounded-md bg-[#292944] hover:bg-[#4b4b79]`}>
                        <div className="absolute -inset-x-0 -inset-y-0 top-[20%] left-[6%] flex pointer-events-none">
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
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                        </div>
                        Create task
                      </button>
                    </div>
                  </div>
              </div>
              <hr className="w-full h-1 bg-[#8381BB] border-0 rounded dark:bg-gray-700" />
            </div>
            <div className="flex flex-row text-[#AEAEE3] justify-end font-thin w-64 mb-3 pr-2">
              {props.project.userid === userID && (
                <div className="relative flex flex-col justify-center h-full">
                  {edit ? (
                    <button
                      key={2}
                      onClick={() => {
                        setEdit(false);
                        setProjectButtonsFocus(2);
                      }}
                      className={`p-1 px-3 rounded-md ${
                        projectButtonsFocus === 2
                          ? "bg-[#4A4999] text-[#D5D5FF]"
                          : "bg-[#292944]"
                      } `}>
                      Cancel
                    </button>
                  ) : (
                    <button
                      key={2}
                      onClick={() => {
                        setEdit(true);
                        setProjectButtonsFocus(2);
                      }}
                      className={`p-1 pr-3 pl-8 rounded-md ${
                        projectButtonsFocus === 2
                          ? "bg-[#4A4999] text-[#D5D5FF]"
                          : "bg-[#292944]"
                      } `}>
                      <div className="absolute -inset-x-0 -inset-y-0 top-1/4 left-[12%] flex pointer-events-none">
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
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </div>
                      Edit
                    </button>
                  )}
                </div>
              )}
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
                key={0}
                onClick={() => onClickViewTask()}
                className='p-1 pr-3 pl-8 rounded-md bg-[#397AB9]'>
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
                key={1}
                onClick={() => onClickInvoice()}
                className='p-1 pr-3 pl-8 rounded-md bg-[#7890A8]'>
                Invoice
              </button>
            </div>
          </div>
          <div className="w-72">
            <AddTaskModal
              isOpen={openAddTaskModal}
              openEmployeesModal={setOpenEmployeesModal}
              closeModal={setOpenAddTaskModal}
              addNewTasks={addNewTask}
              tasks={props.tasks}
              project={props.project}
              employees={employeeList}
              setEmployees={setEmployeeList}
            />
            {editedTask && (
              <EditTaskModal
                isOpen={openEditTaskModal}
                openEmployeesModal={setOpenEmployeesModal}
                closeModal={setOpenEditTaskModal}
                editTask={editTask}
                task={editedTask}
                setTask={setEditedTask}
                project={props.project}
                employees={employeeList}
                setEmployees={setEmployeeList}
                hourlog={props.hourlog}
              />
            )}
            {task && (
              <TaskModal
                isOpen={openTaskModal}
                closeModal={setOpenTaskModal}
                task={task}
                setTask={setTask}
                users={users}
              />
            )}
            <WarningModal
              isOpen={openDeleteWarningModal}
              closeModal={setOpenDeleteWarningModal}
              delete={deleteTask}
              deleteObject={deletedTask}>
              <div className="text-center">
                <div className="text-xl font-bold">Are you sure?</div>
                <div className="text-sm">
                  You will not be able to recover this task.
                </div>
              </div>
            </WarningModal>
          </div>
          <div>
            <Task
              tasks={props.tasks}
              projectId={props.project.id}
              issuedDate={props.project.issueddate}
              dueDate={props.project.duedate}
              userId={props.project.userid}
              hourlog={props.hourlog}
              edit={edit}
              setEdit={setEdit}
              setEditedTask={setEditedTask}
              setDeletedTask={setDeletedTask}
              setOpenEditTaskModal={setOpenEditTaskModal}
              setOpenDeleteWarningModal={setOpenDeleteWarningModal}
              setEmployees={setEmployeeList}
              setOpenTaskModal={setOpenTaskModal}
              setTask={setTask}
              fetchData={props.fetchData}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectTask;
