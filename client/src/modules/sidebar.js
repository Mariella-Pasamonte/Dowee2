import React, { useState, useEffect, useContext } from "react";
import {
  AddProjectModal,
  EditEmployeesModal,
  EditProjectModal,
  WarningModal,
  Tooltips,
} from "../components";
import { useNavigate } from "react-router-dom";
import AuthContext from "../utilities/AuthContext";
import axios from "axios";

function Sidebar(props) {
  const [openAddProjectModal, setOpenAddProjectModal] = useState(false);
  const [openEditProjectModal, setOpenEditProjectModal] = useState(false);
  const [openDeleteWarningModal, setOpenDeleteWarningModal] = useState(false);
  const [openAddEmployeesModal, setOpenAddEmployeesModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [deleteProject, setDeleteProject] = useState(null);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [dropdownId, setDropdownId] = useState(null);
  const [employees, setEmployees] = useState([]);
  const {userID} = useContext(AuthContext);
  const navigate = useNavigate();

  var projLength = props.projList ? props.projList.length : 0;

  const toggleTooltipEnter = () => {
    setIsTooltipOpen(true);
  };
  const toggleTooltipLeave = () => {
    setIsTooltipOpen(false);
  };

  const getEmployees = (newEmployee) => {
    if (employees.length > 0) {
      const isEmp = employees.find((emp) => emp === newEmployee);
      !isEmp && setEmployees((previous) => [...previous, newEmployee]);
    } else {
      setEmployees([newEmployee]);
    }
  };

  const removeEmployee = (employeeId) => {
    const editedEmployees = employees.filter(
      (employee) => employee !== employeeId
    );
    setEmployees(editedEmployees);
  };

    function addNewProject(newProject){
        axios
        .post("https://dowee2-server2.vercel.app/addProject", newProject)
        // .post("http://localhost:3000/addProject", newProject)
        .then((res) => {
            console.log(newProject);
        })
        .catch((error) => {
            console.log("Error: ", error);
        }); 
        props.fetchData(userID);
        navigate(`/project/${newProject.name}/${newProject.userid}/0`);
    }

    function editedProject(editedProject){
        axios
        .post("https://dowee2-server2.vercel.app/editProject",editedProject)
        // .post("http://localhost:3000/editProject",editedProject)
        .then((res) => {
            console.log(editedProject);
        })
        .catch((error) => {
            console.log("Error: ", error);
        }); 
        props.fetchData(userID);
        navigate(`/project/${editedProject.name}/${editedProject.userid}/0`);
    }

    function deletingProject(deleteProject){
        axios
        .post("https://dowee2-server2.vercel.app/deleteProject",deleteProject)
        // .post("http://localhost:3000/deleteProject",deleteProject)
        .then((res) => {
            console.log(deleteProject);
        })
        .catch((error) => {
            console.log("Error: ", error);
        });
        props.fetchData(userID);
        if(projList!==null){
          navigate(`/project/${props.projList[0].name}/${props.projList[0].userid}/0`);
        };
    }

  const handleButtonClick = (project) => {
    navigate(`/project/${project.name}/${project.userid}/0`);
  };

  const handleOpenDropdown = (projectId) => {
    setDropdownId(projectId);
    setOpenDropdown((prev) => !prev);
  };

  function clickEdit(project) {
    setOpenDropdown(false);
    setOpenEditProjectModal(true);
    setEditProject(project);
  }

  return (
    <>
      <div className="h-full w-full">
        <div className="h-full flex flex-col border-[1px] border-white/20 text-[#D5D8DF] p-3 bg-gradient-to-r from-[#6E797D]/50 via-[#556469]/50 to-[#3B4E54]/50 rounded-lg">
          <div>
            <div className="h-fit flex flex-row justify-between">
              <div className="flex flex-row font-Inter text-xl my-1">
                <div className="flex flex-col justify-center mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5">
                    <path
                      fill-rule="evenodd"
                      d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"
                      clip-rule="evenodd"
                    />
                    <path d="M5.26 17.242a.75.75 0 1 0-.897-1.203 5.243 5.243 0 0 0-2.05 5.022.75.75 0 0 0 .625.627 5.243 5.243 0 0 0 5.022-2.051.75.75 0 1 0-1.202-.897 3.744 3.744 0 0 1-3.008 1.51c0-1.23.592-2.323 1.51-3.008Z" />
                  </svg>
                </div>
                My Projects
              </div>
              <div className="relative w-1/5 flex flex-col justify-center">
                <div className="w-fit">
                  <button
                    onMouseEnter={toggleTooltipEnter}
                    onMouseLeave={toggleTooltipLeave}
                    data-tooltip-target="addProjectTooltip"
                    data-tooltip-placement="bottom"
                    type="button"
                    onClick={() => {
                      setOpenAddProjectModal(true);
                    }}
                    className="p-1 bg-[#23353C] rounded hover:bg-[#3A6576]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5">
                      <path
                        fillRule="evenodd"
                        d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875ZM12.75 12a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V18a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V12Z"
                        clipRule="evenodd"
                      />
                      <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
                    </svg>
                  </button>
                  <Tooltips
                    id="addProjectTooltip"
                    isOpen={isTooltipOpen}
                    tooltipArrowClassName="tooltip-arrow -top-1 pl-2">
                    <div className="w-full px-4 py-2 text-sm text-center hover:bg-slate-500">
                      Add Project
                    </div>
                  </Tooltips>
                </div>
              </div>
            </div>
            <AddProjectModal
              isOpen={openAddProjectModal}
              closeModal={setOpenAddProjectModal}
              setOpenEmpModal={setOpenAddEmployeesModal}
              addNewProject={addNewProject}
              projLength={projLength}
              employees={employees}
              setEmployees={setEmployees}
              users={props.users}
            />
            <EditEmployeesModal
              isOpen={openAddEmployeesModal}
              closeModal={setOpenAddEmployeesModal}
              employees={employees}
              getEmployees={getEmployees}
              removeEmployee={removeEmployee}
              users={props.users}
            />
            {editProject && (
              <EditProjectModal
                isOpen={openEditProjectModal}
                closeModal={setOpenEditProjectModal}
                setOpenEmpModal={setOpenAddEmployeesModal}
                editedProject={editedProject}
                project={editProject}
                setProject={setEditProject}
                employees={employees}
                setEmployees={setEmployees}
                users={props.users}
              />
            )}
            <WarningModal
              isOpen={openDeleteWarningModal}
              closeModal={setOpenDeleteWarningModal}
              delete={deletingProject}
              deleteObject={deleteProject}>
              <div className="text-center">
                <div className="text-xl font-bold">Are you sure?</div>
                <div className="text-sm">
                  You will not be able to recover this project!
                </div>
              </div>
            </WarningModal>
            <div className="mt-2">
              <hr className="w-full border-[#A4C9C5]"></hr>
            </div>
            <div className="flex flex-row my-3">
              <div className="w-full relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </div>
                <input
                  id="searchbar"
                  name="searchbar"
                  type="text"
                  placeholder="Search"
                  className="p-2 pl-8 font-Inter rounded-lg bg-inherit border-[#B2F6FF] border-[1px] placeholder-[#9FADBC]/80 text-white w-full text-sm focus:outline-none dark:text-white focus:text-white"></input>
              </div>
            </div>
            <div>
              {props.projList && (
                <div className="overflow-y-auto w-full max-h-96">
                  {props.projList.map((project) => (
                    <button
                      key={project.id}
                      onClick={(e) => handleButtonClick(project)}
                      className={`flex flex-row w-full justify-between pt-1 px-1 rounded-md ${
                        props.projectFocus === project.id ? "bg-white/20" : null
                      }`}>
                      <div className="flex flex-row">
                        <div className="flex flex-col font-bold">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4 mb-[-3px]">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4 mt-[-3px]">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m4.5 15.75 7.5-7.5 7.5 7.5"
                            />
                          </svg>
                        </div>
                        <div className="ml-2 text-md font-Inter">
                          {" "}
                          {project.name}{" "}
                        </div>
                      </div>
                      {project.userid === userID && (
                        <div className="relative">
                          <div
                            data-tooltip-target={project.id}
                            data-tooltip-placement="bottom"
                            onClick={() => {
                              handleOpenDropdown(project.id);
                              setEditProject(null);
                            }}>
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
                                d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                              />
                            </svg>
                          </div>
                          <Tooltips
                            id={project.id}
                            isOpen={
                              dropdownId === project.id ? openDropdown : false
                            }>
                            <button
                              onClick={() => {
                                clickEdit(project);
                                setEmployees(project.employees);
                                setOpenDropdown(false);
                              }}
                              className="flex flex-row z-20 w-24 px-4 border-b-[1px] border-[#A4C9C5] font-thin py-2 text-sm hover:bg-slate-500">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="#ffffff"
                                viewBox="0 0 256 256"
                                className="mr-1">
                                <path d="M225.9,74.78,181.21,30.09a14,14,0,0,0-19.8,0L38.1,153.41a13.94,13.94,0,0,0-4.1,9.9V208a14,14,0,0,0,14,14H92.69a13.94,13.94,0,0,0,9.9-4.1L225.9,94.58a14,14,0,0,0,0-19.8ZM94.1,209.41a2,2,0,0,1-1.41.59H48a2,2,0,0,1-2-2V163.31a2,2,0,0,1,.59-1.41L136,72.48,183.51,120ZM217.41,86.1,192,111.51,144.49,64,169.9,38.58a2,2,0,0,1,2.83,0l44.68,44.69a2,2,0,0,1,0,2.83Z"></path>
                              </svg>
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                setOpenDeleteWarningModal(true);
                                setDeleteProject(project);
                                setOpenDropdown(false);
                              }}
                              className="flex flex-row z-20 w-24 px-4 py-2 text-sm  hover:bg-slate-500">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-5 h-5 mr-1">
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                              </svg>
                              Delete
                            </button>
                          </Tooltips>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
