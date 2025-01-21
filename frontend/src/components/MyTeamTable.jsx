import React from "react";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import eye from "../assets/eye-icon-new.svg";
import TeamDetailsGrid from "./TeamDetailsGrid";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
const MyTeamTable = () => {
  const token = localStorage.getItem("jwtToken");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;
  const [teamDetails, setTeamDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [isOn, setIsOn] = useState(false);
  const [openGridView, setopenGridView] = useState(false);
  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/employees/team/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Team details : --------------> ", response.data);
        setTeamDetails(response.data);
      });
  }, [token]);
  // Filtered and searched employees
  const filteredTeamDetails = teamDetails.filter(
    (employee) =>
      employee.employee_first_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) &&
      (filterDepartment === "" || employee.departmant === filterDepartment)
  );
  return (
    <>
      <div className="main-container w-[940px] translate-y-[-100px]">
        <div className="header flex items-center justify-between mb-4  ">
          <div className="first-container flex items-center gap-5 w-[80%]">
            {/* Search Bar */}
            <div className="search-container flex gap-2 items-center w-[50%] border py-1 px-2 rounded-lg">
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
                <option value="EEE">EEE</option>
                <option value="Mechanic">Mechanic</option>
                <option value="Management">Management</option>
              </select>
            </div>
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
            <span className="text-gray-800 font-medium">Grid View</span>
          </div>
        </div>
        {/*-------------- table starts here -------------- */}
        {isOn ? (
          <TeamDetailsGrid teamDetails={filteredTeamDetails}/>
        ) : (
          <div className="overflow-x-auto max-h-[360px] overflow-y-auto hide-scrollbar rounded-lg border ">
            <table className="min-w-full table-auto">
              <thead className="bg-blue-100">
                <tr>
                  <th className=" border-gray-300 px-4 py-2 text-sm">
                    Employee ID
                  </th>
                  <th className=" border-gray-300 px-4 py-2 text-sm">
                    Employee Name
                  </th>
                  <th className=" border-gray-300 px-4 py-2 text-sm">
                    Designation
                  </th>
                  <th className=" border-gray-300 px-4 py-2 text-sm">
                    Department
                  </th>
                  <th className=" border-gray-300 px-4 py-2 text-sm">
                    Email ID
                  </th>
                  <th className=" border-gray-300 px-4 py-2 text-sm">
                    Phone Number
                  </th>
                  <th className=" border-gray-300 px-4 py-2 text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeamDetails.length > 0 ? (
                  filteredTeamDetails.map((employee, index) => (
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
                        <button className="text-blue-500 hover:underline">
                          <img src={eye} alt="" />
                        </button>
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
      </div>
    </>
  );
};

export default MyTeamTable;
