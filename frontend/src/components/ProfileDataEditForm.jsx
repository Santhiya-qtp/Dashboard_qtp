import React, { useState, useEffect } from "react";
import close_btn from "../assets/cls_btn.png";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { use } from "react";
import { Axis3D, CodeSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
const ProfileDataEditForm = ({ employee, openEdit, setOpenEdit }) => {
  const navigate = useNavigate();
  // Authorization
  const token = localStorage.getItem("jwtToken");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;

  // states
  const [employeeData, setEmployeeData] = useState([]);
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
  const [fetchedUsers, setFetchedUser] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [usernameState, setUsernameState] = useState("");
  const [reportingManagerName, setReportingManagerName] = useState([]);
  const [selectedReportingManager, setselectedReportingManager] = useState("");

  useEffect(() => {
    console.log("manager :", employee);
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/employees/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("hai employee: --------------> ", response.data);
        setEmployeeData(response.data);
      });
  }, [token]);

  //   fetching all the username
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/get_all_user/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFetchedUser(response.data);
        const usernames = response.data.map((item) => item.username);
        setAllUsers(usernames);
      });
  }, [token]);

  // //   fetching reporting manager name
  // useEffect(() => {
  //   if (Array.isArray(employeeData)) {
  //     // Extract reporting managers' first names
  //     const managerFirstNames = employeeData.map(
  //       (employee) => employee.employee_first_name
  //     ); // Map to first name

  //     setReportingManagerName(managerFirstNames); // Update the state
  //     console.log("Reporting managers:", managerFirstNames);
  //   } else {
  //     console.error("employeeDetails is not an array:");
  //   }
  // }, []);

  useEffect(() => {
    if (Array.isArray(employeeData)) {
      // Extract first names of employees who are reporting managers
      const managerFirstNames = employeeData.map(
        (emp) => emp.employee_first_name
      );
      console.log("Reporting managers:", managerFirstNames);
      // Update the state with the extracted first names
      setReportingManagerName(managerFirstNames);
    } else {
      console.error("employee is not an array:", employeeData);
    }
  }, [employeeData]);

  // Load previous data into input fields when component mounts
  useEffect(() => {
    if (employee) {
      setFristName(employee.employee_first_name || "");
      setLastName(employee.employee_last_name || "");
      setMobile_number(employee.contact_number || "");
      setEmail(employee.email || "");
      setCity(employee.city || "");
      setState(employee.state || "");
      setAddress(employee.address || "");
      setCountry(employee.country || "");
      setzip(employee.zip || "");
      setdob(employee.date_of_birth || "");
      setgender(employee.gender || "");
      setQualification(employee.qualification || "");
      setExperience(employee.experience || "");
      setMaritialStatus(employee.marital_status || "");
      setWorkstream(employee.Workstream || "");
      setDepartment(employee.departmant || "");
      setDesignation(employee.designation || "");
      setDateOfJoining(employee.date_of_joining || "");
      setEmergencyContact(employee.emergency_contact || "");
      setEmergencyContactName(employee.emergency_contact_name || "");
      setRelation(employee.emergency_contact_relation || "");
      setemployeeUserId(employee.employee_user_id || "");
      setSalutation(employee.Salutation);
      // setReportingManagerName(employee.reporting_manager)
    }
  }, [employee]);

  function handleSubmit() {
    const employee_details = {
      employee_first_name: firstName,
      employee_last_name: lastName,
      contact_number: mobile_number,
      email: email,
      // user_id: user_id,
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
      // reporting_manager: reportingManager,
      reporting_manager: selectedReportingManager,
      designation: designation,
      date_of_joining: dateOfJoining,
      emergency_contact: emergencyContact,
      emergency_contact_name: emergencyContactName,
      relation: relation,
      user: usernameState,
    };
    console.log("updated data from the frontend : ", employee_details);
    if (selectedReportingManager == "") {
      alert("Please select the reporting managaer");
    }
    if (selectedReportingManager !== "") {
      if (usernameState == "") {
        alert("Please select the user");
      }
    }

    axios
      .put(
        `http://127.0.0.1:8000/api/employees/${employee.employee_id}/`,
        employee_details,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setResponseFromBackend(response.data);
      })
      .then(() => {
        window.location.reload();
        setOpenEdit(false);
      });
  }
  return (
    <>
      <div className="form-container w-[90%] md:w-[90%]  bg-white rounded-lg absolute top-[30px] left-[50%] translate-x-[-50%] z-[200] xl:h-[90%]">
        <div className="header border-bottom pb-4 flex justify-between p-4">
          <h1 className="font-medium text-lg">Add Employee</h1>
          <div
            onClick={() => {
              setOpenEdit(false);
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
        <div className="form w-[95%] m-auto mt-5 ">
          <div className="form-field-container h-[300px] overflow-auto hide-scrollbar grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="box-1 ">
              <label htmlFor="">Employee user id</label> <br />
              <input
                value={employeeUserId}
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
                  setLastName(e.target.value);
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
                  setEmail(e.target.value);
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
                  setState(e.target.value);
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
              <select
                onChange={(e) => {
                  setgender(e.target.value);
                }}
                className="w-[100%] outline-none border border-gray-600 py-1 rounded-lg mt-2"
              >
                <option>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Female">Other</option>
              </select>
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
              <label htmlFor="">Maritial status</label> <br />
              <select
                onChange={(e) => {
                  setMaritialStatus(e.target.value);
                }}
                className="border outline-none rounded-lg w-[100%] mt-2 py-1 border-gray-600"
              >
                <option>Select the marital status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
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
              <label htmlFor="">Date of Joining</label> <br />
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
            <div className="box-6">
              <label htmlFor="">User</label> <br />
              <select
                onChange={(e) => {
                  setUsernameState(e.target.value);
                }}
                className="border border-gray-600 p-2 rounded-lg w-[100%]  outline-none "
              >
                <option value="">Select User</option>
                {allUsers.map((item) => {
                  return <option value={item}>{item}</option>;
                })}
              </select>
            </div>
            <div className="box-6">
              <label htmlFor="">Reporting manager</label> <br />
              <select
                onChange={(e) => {
                  setselectedReportingManager(e.target.value);
                }}
                className="border border-gray-600 p-2 rounded-lg w-[100%]  outline-none "
              >
                {console.log("rep :", reportingManagerName[1])}
                <option>Select Reporting Manager</option>
                {reportingManagerName.length > 0 ? (
                  reportingManagerName.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No reporting managers available
                  </option>
                )}
              </select>
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

      <div className="edit_tint fixed top-0 right-0 left-0 bottom-0 "></div>
    </>
  );
};

export default ProfileDataEditForm;
