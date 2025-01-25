import React, { useState } from "react";
import { useEffect } from "react";
import user from "../assets/user-1.png";
import location from "../assets/location.svg";
import mail from "../assets/mail.svg";
import phone from "../assets/phone.svg";
import call_icon from "../assets/call_icon-1.svg";
import organization from "../assets/organization.svg";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Axis3D, CodeSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Data } from "../context/store";
import { useContext } from "react";
import ProfileDataEditForm from "./ProfileDataEditForm";
const ProfileHeader = ({ employee }) => {
  const { userName } = useContext(Data);

  // token and Auth
  const token = localStorage.getItem("jwtToken");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;

  // navigate functions
  const navigate = useNavigate();

  // states
  const [employeeId, setEmployeeId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  // rendering
  if (!employee) {
    return <div>Loading...</div>;
  } else {
    console.log("employee : ", employee);
  }
  function handleDelete(empId) {
    setEmployeeId(empId);
    axios
      .delete(`http://127.0.0.1:8000/api/employees/${empId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("deleting : ", response.data);
      })
      .then(() => {
        navigate("/organizationDetails");
      });
  }

  return (
    <>
      <div className="main-container mt-4 border rounded-md bg-[#FAFAFA] grid grid-cols-2 md:grid-cols-12 p-5 gap-3 ">
        <div className="container-1 flex gap-4 items-center border-right col-span-3">
          <img
            src={`http://localhost:8000${employee.employee_photo}`}
            className="w-[100px] object-fit"
          />
          <div className="content-container">
            <h1 className="font-medium font-lg">
              {employee.employee_first_name}
            </h1>
            <h1 className="text-sm text-gray-600">Designer</h1>
          </div>
        </div>
        <div className="container-2 col-span-6 space-y-2 ml-4">
          <div className="list-1 flex items-center gap-2">
            <img src={organization} className="w-4" />
            <h1 className="text-gray-600">{employee.departmant}</h1>
          </div>
          {/* <div className="list-2 flex items-center gap-2">
            <img src={location} className="w-4" />
            <h1 className="text-gray-600">Sri eshwar college of engineering</h1>
          </div> */}
          <div className="list-2 flex items-center gap-2">
            <img src={mail} className="w-4" />
            <h1 className="text-gray-600">{employee.email}</h1>
          </div>
          <div className="list-2 flex items-center gap-2">
            <img src={call_icon} className="w-4" />
            <h1 className="text-gray-600">{employee.contact_number}</h1>
          </div>
        </div>
        <div className="container-3 col-span-3">
          <div
            onClick={() => {
              setOpenEdit(true);
            }}
            className="button-section flex gap-3 items-center mt-4 sm:mt-0 md:justify-end"
          >
            <button className="w-[140px] rounded-lg bg-[#44CF7DCC] text-white font-medium py-2 text-lg flex items-center justify-center gap-2">
              <span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.5 20.1249V24.4999H7.875L20.7783 11.5966L16.4033 7.22159L3.5 20.1249ZM24.1617 8.21326C24.2698 8.10532 24.3556 7.97712 24.4142 7.83598C24.4727 7.69485 24.5029 7.54355 24.5029 7.39076C24.5029 7.23796 24.4727 7.08666 24.4142 6.94553C24.3556 6.80439 24.2698 6.67619 24.1617 6.56826L21.4317 3.83826C21.3237 3.7301 21.1955 3.6443 21.0544 3.58575C20.9133 3.52721 20.762 3.49707 20.6092 3.49707C20.4564 3.49707 20.3051 3.52721 20.1639 3.58575C20.0228 3.6443 19.8946 3.7301 19.7867 3.83826L17.6517 5.97326L22.0267 10.3483L24.1617 8.21326Z"
                    fill="white"
                  />
                </svg>
              </span>
              Edit
            </button>
            {userName == "hruser" ? (
              <button
                onClick={() => {
                  setOpenDeleteModal(true);
                }}
                className="w-[160px] rounded-lg bg-[#D75378CC] text-white font-medium py-2 text-lg flex items-center justify-center gap-2"
              >
                <span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.1665 21.5C3.52484 21.5 2.97573 21.2717 2.51917 20.8152C2.06261 20.3586 1.83395 19.8091 1.83317 19.1667V4H0.666504V1.66667H6.49984V0.5H13.4998V1.66667H19.3332V4H18.1665V19.1667C18.1665 19.8083 17.9382 20.3578 17.4817 20.8152C17.0251 21.2725 16.4756 21.5008 15.8332 21.5H4.1665ZM15.8332 4H4.1665V19.1667H15.8332V4ZM6.49984 16.8333H8.83317V6.33333H6.49984V16.8333ZM11.1665 16.8333H13.4998V6.33333H11.1665V16.8333Z"
                      fill="white"
                    />
                  </svg>
                </span>
                Delete
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      {openDeleteModal ? (
        <div className="delete-modal">
          <div className="delete-confirm-box fixed z-[200] top-[20%] left-[50%] translate-x-[-50%] bg-white p-2 rounded-lg shadow-2xl border w-[80%] sm:w-[40%]">
            <div className="header border-bottom py-2 ">
              <p className="font-semibold text-lg">Delete Confirmation</p>
            </div>
            <div className="body-content p-4">
              <div className="delete-icon bg-[#D75378CC] w-fit rounded-full p-2 m-auto">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.75 26.25C8.0625 26.25 7.47417 26.0054 6.985 25.5163C6.49583 25.0271 6.25083 24.4383 6.25 23.75V7.5H5V5H11.25V3.75H18.75V5H25V7.5H23.75V23.75C23.75 24.4375 23.5054 25.0263 23.0163 25.5163C22.5271 26.0063 21.9383 26.2508 21.25 26.25H8.75ZM21.25 7.5H8.75V23.75H21.25V7.5ZM11.25 21.25H13.75V10H11.25V21.25ZM16.25 21.25H18.75V10H16.25V21.25Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h1 className="font-semibold text-xl w-fit m-auto mt-2 ">
                Are you sure ?
              </h1>
              <p className="font-semibold text-lg mt-4 w-fit m-auto">
                Are you surely want to delete this item ?
              </p>
              <div className="button-section flex gap-2 items-center w-fit m-auto mt-5">
                <button
                  onClick={() => {
                    handleDelete(employee.employee_id);
                  }}
                  className="delete-btn bg-[#D75378] text-white font-semibold rounded-lg px-5 text-lg py-3"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setOpenDeleteModal(false);
                  }}
                  className="cancel cancel-border text-black text-lg font-semibold rounded-lg px-5 py-3"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {openDeleteModal ? (
        <div className="tint_del absolute top-0 right-0 bottom-0 left-0"></div>
      ) : (
        ""
      )}
      {openEdit ? (
        <ProfileDataEditForm
          employee={employee}
          setOpenEdit={setOpenEdit}
          openEdit={openEdit}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default ProfileHeader;
