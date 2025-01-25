import React, { useContext, useEffect } from "react";
import { Search } from "lucide-react";
import { useState } from "react";
import eye from "../assets/eye-icon-new.svg";
import EmployeeDetailsGrid from "./EmployeeDetailsGrid";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Data } from "../context/store";
import AddEmployeeForm from "./AddEmployeeForm";
import { Link } from "react-router-dom";
const EmployeeDetailsTable = () => {
  const { userName } = useContext(Data);

  const token = localStorage.getItem("jwtToken");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;

  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [showAddEmpButton, setShowAddEmpButton] = useState(false);
  const [openAddEmployeeForm, setopenAddEmployeeForm] = useState(false);
  useEffect(() => {
    if (userName.toLowerCase().slice(0, 1) == "h") {
      setShowAddEmpButton(true);
    }
  }, [userName]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/employees/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEmployeeDetails(response.data);
      });
  }, [token]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");

  // Filtered and searched employees
  const filteredEmployees = employeeDetails.filter(
    (employee) =>
      employee.employee_first_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) &&
      (filterDepartment === "" || employee.departmant === filterDepartment)
  );
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };
  return (
    <>
      <div className="main-container mt-4 px-4">
        {/* Search and Filter Section */}
        <div className="header flex items-center justify-between mb-4  gap-4">
          <div className="first-container flex items-center gap-5 w-[80%] ">
            {/* Search Bar */}
            <div className="search-container flex gap-2 items-center  w-[50%] border py-1 px-2 rounded-lg">
              <Search className="w-[20px] text-gray-600" />
              <input
                type="text"
                placeholder="Search Employee"
                className="w-[100%] outline-none "
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* Filter Dropdown */}
            <div className="filter-section">
              <select
                className="w-[200px] border px-2 py-1 rounded-lg outline-none"
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
              >
                <option value="">All</option>
                <option value="ECE">ECE</option>
                <option value="IT">IT</option>
                <option value="MECH">MECH</option>
                <option value="EEE">EEE</option>
                <option value="CSE">CSE</option>
                <option value="Management">Management</option>
              </select>
            </div>
            {showAddEmpButton ? (
              <button
                onClick={() => {
                  setopenAddEmployeeForm(!openAddEmployeeForm);
                }}
                className="bg-blue-500 rounded-md font-medium px-3 py-1 text-white"
              >
                Add Employee
              </button>
            ) : (
              ""
            )}
          </div>
          {/* grid-view button */}
          <div className="flex items-center space-x-3">
            {/* Toggle Switch */}
            <div
              className={`w-12 h-6 flex items-center bg-${
                isOn ? "blue-500" : "gray-200"
              } 
                rounded-full p-1 cursor-pointer transition-colors duration-300`}
              onClick={toggleSwitch}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 
          ${isOn ? "translate-x-6" : "translate-x-0"}`}
              ></div>
            </div>
            {/* Label */}
            <span className="text-gray-800 font-medium text-sm sm:text-md">
              Grid View
            </span>
          </div>
        </div>

        {isOn ? (
          <EmployeeDetailsGrid filteredEmployees={filteredEmployees} />
        ) : (
          <div className="overflow-x-auto max-h-[360px] overflow-y-auto hide-scrollbar rounded-lg border ">
            <table className="min-w-full table-auto">
              <thead className="bg-blue-100">
                <tr>
                  <th className=" border-gray-300 px-4 py-2">Employee ID</th>
                  <th className=" border-gray-300 px-4 py-2">Employee Name</th>
                  <th className=" border-gray-300 px-4 py-2">Designation</th>
                  <th className=" border-gray-300 px-4 py-2">Department</th>
                  <th className=" border-gray-300 px-4 py-2">Email ID</th>
                  <th className=" border-gray-300 px-4 py-2">Phone Number</th>
                  <th className=" border-gray-300 px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee, index) => (
                    <tr
                      key={index}
                      className={`text-center ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className=" border-gray-300 px-4 py-2">
                        {employee.employee_id}
                      </td>
                      <td className=" border-gray-300 px-4 py-2">
                        {employee.employee_first_name}
                      </td>
                      <td className=" border-gray-300 px-4 py-2">
                        {employee.designation}
                      </td>
                      <td className=" border-gray-300 px-4 py-2">
                        {employee.departmant}
                      </td>
                      <td className=" border-gray-300 px-4 py-2">
                        {employee.email}
                      </td>
                      <td className=" border-gray-300 px-4 py-2">
                        {employee.contact_number}
                      </td>
                      <td className=" border-gray-300 px-4 py-2">
                        <Link to={`/profile/${employee.employee_id}`}>
                          <button className="text-blue-500 hover:underline">
                            <img src={eye} alt="" />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                    >
                      No employees found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Employee Table */}
      </div>
      {/* <EmployeeDetailsGrid /> */}
      {openAddEmployeeForm ? (
        <AddEmployeeForm
          setopenAddEmployeeForm={setopenAddEmployeeForm}
          employeeDetails={employeeDetails}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default EmployeeDetailsTable;
