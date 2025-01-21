import React from "react";
import { NavLink } from "react-router-dom";
import OrganizationDetailsSubNav from "./OrganizationDetailsSubNav";
import EmployeeDetailsTable from "./EmployeeDetailsTable";

const OrganizationEmployeeDetails = () => {
  return (
    <>
      <div className="main-container mt-4">
        <OrganizationDetailsSubNav />
        <EmployeeDetailsTable/>
      </div>
    </>
  );
};

export default OrganizationEmployeeDetails;
