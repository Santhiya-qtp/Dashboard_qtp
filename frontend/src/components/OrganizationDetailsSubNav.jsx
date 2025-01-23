import React from "react";
import { NavLink } from "react-router-dom";
const OrganizationDetailsSubNav = () => {
  return (
    <>
      <div className="main-container mt-4 gap-2 flex  items-center">
        <NavLink
          to="/organizationDetails"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#2986CE" : "",
            color: isActive ? "white" : "black",
            border: "1px solid #D9D9D9",
          })}
          className="text-white  px-4 py-2 font-medium rounded-lg "
        >
          Employee Details
        </NavLink>
        <NavLink
          to="/OrgChart"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#2986CE" : "",
            color: isActive ? "white" : "black",
          })}
          className="text-black bg-gray-100 px-4 py-2 rounded-lg border border-gray-300"
        >
          Organisation Structure
        </NavLink>
        {/* <NavLink
          to="employeeDetails"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#2986CE" : "",
          })}
          className="text-black bg-gray-100 px-4 py-2 rounded-lg border border-gray-300"
        >
          Organisation Documents
        </NavLink> */}

        {/* <NavLink
          to="employeeDetails"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#2986CE" : "",
          })}
          className="text-black bg-gray-100 px-4 py-2  rounded-lg border border-gray-300"
        >
          Articles
        </NavLink> */}
        {/* <NavLink
          to="employeeDetails"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#2986CE" : "",
          })}
          className="text-black bg-gray-100 px-4 py-2  rounded-lg border border-gray-300"
        >
          Polls
        </NavLink> */}
        {/* <NavLink
          to="employeeDetails"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#2986CE" : "",
          })}
          className="text-black bg-gray-100 px-4 py-2  rounded-lg border border-gray-300"
        >
          Announcements
        </NavLink> */}
        {/* <NavLink
          to="employeeDetails"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#2986CE" : "",
          })}
          className="text-black bg-gray-100 px-4 py-2  rounded-lg border border-gray-300"
        >
          Events
        </NavLink> */}
      </div>
    </>
  );
};

export default OrganizationDetailsSubNav;
