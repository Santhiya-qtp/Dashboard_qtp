import React, { useState } from "react";
import close_btn from "../assets/cls_btn.png";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const AddEmployeeForm = ({ setopenAddEmployeeForm }) => {
  // Authorization
  const token = localStorage.getItem("jwtToken");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;

  // states
  const [firstName, setFristName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile_number, setMobile_number] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setzip] = useState("");
  const [dob, setdob] = useState("");
  const [gender, setgender] = useState("");
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [maritialStatus, setMaritialStatus] = useState("");
  const [workstream, setWorkstream] = useState("");
  const [Department, setDepartment] = useState("");
  const [reportingManager, setReportingManager] = useState("");
  const [designation, setDesignation] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [relation, setRelation] = useState("");
  const [Salutation, setSalutation] = useState("");
  const [employeeUserId, setemployeeUserId] = useState("");
  const [responseFromBackend, setResponseFromBackend] = useState(null);

  function handleSubmit() {
    const employee_details = {
      employee_first_name: firstName,
      employee_last_name: lastName,
      contact_number: mobile_number,
      email: email,
      user_id: user_id,
      city: city,
      state: state,
      employee_user_id: employeeUserId,
      Salutation: Salutation,
      address: address,
      zip: zip,
      country: country,
      date_of_birth: dob,
      gender: gender,
      qualification: qualification,
      experience: experience,
      marital_status: maritialStatus,
      Workstream: workstream,
      departmant: Department,
      reporting_manager: reportingManager,
      designation: designation,
      date_of_joining: dateOfJoining,
      emergency_contact: emergencyContact,
      emergency_contact_name: emergencyContactName,
      relation: relation,
    };
    axios
      .post("", employee_details, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setResponseFromBackend(response.data);
      });
  }
  return (
    <>
      <div className="main-container">
        <div className="form-container w-[90%] md:w-[90%]  bg-white rounded-lg absolute top-[20px] left-[50%] translate-x-[-50%] z-[200]">
          <div className="header border-bottom pb-4 flex justify-between p-4">
            <h1 className="font-medium text-lg">Add Employee</h1>
            <div
              onClick={() => {
                setopenAddEmployeeForm(false);
              }}
              className="close-button cursor-pointer bg-gray-300 w-fit p-2 rounded-full"
            >
              <img src={close_btn} alt="" />
            </div>
          </div>
          <div className="form-header mt-4 pl-4 w-fit m-auto ">
            <button className="flex items-center gap-3 px-6 py-2 text-white rounded-full w-fit bg-blue-500">
              <span className="bg-white text-black rounded-full px-2">1</span>
              Personal Details
            </button>
          </div>
          <div className="form w-[95%] m-auto mt-5">
            <div className="form-field-container h-[300px] overflow-auto hide-scrollbar grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="box-1 ">
                <label htmlFor="">Employee user id</label> <br />
                <input
                  value={employeeUserId} //####################################################3
                  onChange={(e) => {
                    setemployeeUserId(e.target.value);
                  }}
                  type="text"
                  className="mt-2 border border-gray-600 outline-none rounded-lg p-1 w-[100%]"
                />
              </div>
              <div className="box-2 ">
                <label htmlFor="">Salutation</label> <br />
                <input
                  value={Salutation}
                  onChange={(e) => {
                    setSalutation(e.target.value);
                  }}
                  type="text"
                  className="mt-2 border border-gray-600 outline-none rounded-lg p-1 w-[100%]"
                />
              </div>
              <div className="box-1 ">
                <label htmlFor="">Employee first name</label> <br />
                <input
                  value={firstName}
                  onChange={(e) => {
                    setFristName(e.target.value);
                  }}
                  type="text"
                  className="mt-2 border border-gray-600 outline-none rounded-lg p-1 w-[100%]"
                />
              </div>
              <div className="box-1 ">
                <label htmlFor="">Employee last name</label> <br />
                <input
                  value={lastName}
                  onChange={(e) => {
                    setFristName(e.target.value);
                  }}
                  type="text"
                  className="mt-2 border border-gray-600 outline-none rounded-lg p-1 w-[100%]"
                />
              </div>
              <div className="box-2">
                <label htmlFor="">Email</label> <br />
                <input
                  value={email}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  type="text"
                  className="mt-2 border border-gray-600 outline-none rounded-lg p-1 w-[100%]"
                />
              </div>
              <div className="box-3">
                <label htmlFor="">Contact number</label> <br />
                <input
                  value={mobile_number}
                  onChange={(e) => {
                    setMobile_number(e.target.value);
                  }}
                  type="number"
                  className="mt-2 border border-gray-600 outline-none rounded-lg p-1 w-[100%]"
                />
              </div>
              <div className="box-4">
                <label htmlFor="">Address</label> <br />
                <input
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  type="email"
                  className="mt-2 border border-gray-600 outline-none rounded-lg p-1 w-[100%]"
                />
              </div>
              <div className="box-5">
                <label htmlFor="">City</label> <br />
                <input
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  type="text"
                  className="mt-2 border border-gray-600 outline-none rounded-lg p-1 w-[100%]"
                />
              </div>
              <div className="box-6">
                <label htmlFor="">State</label> <br />
                <input
                  value={state}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="text"
                  className="mt-2 border border-gray-600 outline-none rounded-lg p-1 w-[100%]"
                />
              </div>
              <div className="box-6">
                <label htmlFor="">Zip</label> <br />
                <input
                  value={zip}
                  onChange={(e) => {
                    setzip(e.target.value);
                  }}
                  type="text"
                  className="mt-2 border border-gray-600 outline-none rounded-lg p-1 w-[100%]"
                />
              </div>
              <div className="box-6">
                <label htmlFor="">Date of Birth</label> <br />
                <input
                  value={dob}
                  onChange={(e) => {
                    setdob(e.target.value);
                  }}
                  type="date"
                  className="mt-2 border border-gray-600 outline-none rounded-lg p-1 w-[100%]"
                />
              </div>
              <div className="box-6">
                <label htmlFor="">Gender</label> <br />
                <input
                  value={gender}
                  onChange={(e) => {
                    setgender(e.target.value);
                  }}
                  type="text"
                  className="mt-2 border border-gray-600 outline-none rounded-lg p-1 w-[100%]"
                />
              </div>
              <div className="box-6">
                <label htmlFor="">Qualification</label> <br />
                <input
                  value={qualification}
                  onChange={(e) => {
                    setQualification(e.target.value);
                  }}
                  type="text"
                  className="mt-2 border border-gray-600 outline-none rounded-lg p-1 w-[100%]"
                />
              </div>
              <div className="box-6">
                <label htmlFor="">Year of Experience</label> <br />
                <input
                  value={experience}
                  onChange={(e) => {
                    setExperience(e.target.value);
                  }}
                  type="number"
                  className="mt-2 border border-gray-600 outline-none rounded-lg p-1 w-[100%]"
                />
              </div>
              <div className="box-6">
                <label htmlFor="">Maritial status (Single / Married)</label>{" "}
                <br />
                <input
                  value={maritialStatus}
                  onChange={(e) => {
                    setMaritialStatus(e.target.value);
                  }}
                  type="text"
                  className="mt-2 border border-gray-600 outline-none rounded-lg p-1 w-[100%]"
                />
              </div>
              <div className="box-6">
                <label htmlFor="">Work stream</label> <br />
                <input
                  value={workstream}
                  onChange={(e) => {
                    setWorkstream(e.target.value);
                  }}
                  type="text"
                  className="mt-2 border border-gray-600 outline-none rounded-lg p-1 w-[100%]"
                />
              </div>
              <div className="box-6">
                <label htmlFor="">Department</label> <br />
                <input
                  value={Department}
                  onChange={(e) => {
                    setDepartment(e.target.value);
                  }}
                  type="text"
                  className="mt-2 border border-gray-600 outline-none rounded-lg p-1 w-[100%]"
                />
              </div>
              <div className="box-6">
                <label htmlFor="">Reporting Manager</label> <br />
                <input
                  value={reportingManager}
                  onChange={(e) => {
                    setReportingManager(e.target.value);
                  }}
                  type="text"
                  className="mt-2 border border-gray-600 outline-none rounded-lg p-1 w-[100%]"
                />
              </div>
              <div className="box-6">
                <label htmlFor="">Designation</label> <br />
                <input
                  value={designation}
                  onChange={(e) => {
                    setDesignation(e.target.value);
                  }}
                  type="text"
                  className="mt-2 border border-gray-600 outline-none rounded-lg p-1 w-[100%]"
                />
              </div>
              <div className="box-6">
                <label htmlFor="">Date of Joingin</label> <br />
                <input
                  value={dateOfJoining}
                  onChange={(e) => {
                    setDateOfJoining(e.target.value);
                  }}
                  type="date"
                  className="mt-2 border border-gray-600 outline-none rounded-lg p-1 w-[100%]"
                />
              </div>
              <div className="box-6">
                <label htmlFor="">Emergency Contact</label> <br />
                <input
                  value={emergencyContact}
                  onChange={(e) => {
                    setEmergencyContact(e.target.value);
                  }}
                  type="text"
                  className="mt-2 border border-gray-600 outline-none rounded-lg p-1 w-[100%]"
                />
              </div>
              <div className="box-6">
                <label htmlFor="">Emergency Contact Name</label> <br />
                <input
                  value={emergencyContactName}
                  onChange={(e) => {
                    setEmergencyContactName(e.target.value);
                  }}
                  type="text"
                  className="mt-2 border border-gray-600 outline-none rounded-lg p-1 w-[100%]"
                />
              </div>
              <div className="box-6">
                <label htmlFor="">Emergency contact Relation</label> <br />
                <input
                  value={relation}
                  onChange={(e) => {
                    setRelation(e.target.value);
                  }}
                  type="text"
                  className="mt-2 border border-gray-600 outline-none rounded-lg p-1 w-[100%]"
                />
              </div>
            </div>
            <div className="button-container w-fit m-auto mb-4">
              <button
                onClick={handleSubmit}
                className="mt-4 w-[200px] font-medium text-white bg-blue-500  px-6 rounded-full py-2"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="add_emp_tint fixed top-0 right-0 left-0 bottom-0"></div>
      </div>
    </>
  );
};

export default AddEmployeeForm;
