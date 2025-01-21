import React, { useState } from "react";
import { useEffect } from "react";
import user from "../assets/user-1.png";
import location from "../assets/location.svg";
import mail from "../assets/mail.svg";
import phone from "../assets/phone.svg";
import organization from "../assets/organization.svg";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const EmployeeDetailsGrid = () => {
  const token = localStorage.getItem("jwtToken");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;
  const [empDetails, setEmpDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered and searched employees
  const filteredEmployees = empDetails.filter((employee) =>
    employee.employee_first_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  const employees = [
    {
      id: "101010231331",
      name: "Surya Chandran",
      designation: "Designer",
      department: "EEE",
      email: "abc@gmail.com",
      phone: "102343223232",
    },
    {
      id: "101010231332",
      name: "John Doe",
      designation: "Engineer",
      department: "Mechanic",
      email: "john@gmail.com",
      phone: "9876543210",
    },
    {
      id: "101010231333",
      name: "Jane Smith",
      designation: "Manager",
      department: "Management",
      email: "jane@gmail.com",
      phone: "1234567890",
    },
    {
      id: "101010231333",
      name: "Jane Smith",
      designation: "Manager",
      department: "Management",
      email: "jane@gmail.com",
      phone: "1234567890",
    },
    {
      id: "101010231333",
      name: "Jane Smith",
      designation: "Manager",
      department: "Management",
      email: "jane@gmail.com",
      phone: "1234567890",
    },
    {
      id: "101010231333",
      name: "Jane Smith",
      designation: "Manager",
      department: "Management",
      email: "jane@gmail.com",
      phone: "1234567890",
    },
    {
      id: "101010231333",
      name: "Jane Smith",
      designation: "Manager",
      department: "Management",
      email: "jane@gmail.com",
      phone: "1234567890",
    },
    {
      id: "101010231333",
      name: "Jane Smith",
      designation: "Manager",
      department: "Management",
      email: "jane@gmail.com",
      phone: "1234567890",
    },
    {
      id: "101010231333",
      name: "Jane Smith",
      designation: "Manager",
      department: "Management",
      email: "jane@gmail.com",
      phone: "1234567890",
    },
    {
      id: "101010231333",
      name: "Jane Smith",
      designation: "Manager",
      department: "Management",
      email: "jane@gmail.com",
      phone: "1234567890",
    },
    {
      id: "101010231333",
      name: "Jane Smith",
      designation: "Manager",
      department: "Management",
      email: "jane@gmail.com",
      phone: "1234567890",
    },
    {
      id: "101010231333",
      name: "Jane Smith",
      designation: "Manager",
      department: "Management",
      email: "jane@gmail.com",
      phone: "1234567890",
    },
  ];

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/employees/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("hai emp details : --------------> ", response.data);
        setEmpDetails(response.data);
      });
  }, [token]);
  return (
    <>
      <div className="main-container h-[360px] overflow-auto hide-scrollbar">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4">
          {filteredEmployees.map((item, index) => {
            return (
              <div className="card bg-[#F5FAFD] p-3 rounded-lg border">
                <div className="header pb-4 border-bottom flex items-center gap-4">
                  <img src={`http://localhost:8000/${item.employee_photo}`} className="w-[30px] rounded-full" />
                  <div className="details">
                    <h1 className="font-medium">{item.employee_first_name}</h1>
                    <p className="text-sm">{item.designation}</p>
                  </div>
                </div>
                <div className="content-container mt-3 space-y-5">
                  <div className="container-1 flex items-center gap-3">
                    <img src={organization} alt="" />
                    <p>{item.departmant}</p>
                  </div>
                  <div className="container-1 flex items-center gap-3">
                    <img src={location} alt="" />
                    <p>Sri eshwar college of engineering</p>
                  </div>
                  <div className="container-1 flex items-center gap-3">
                    <img src={mail} alt="" />
                    <p>{item.email}</p>
                  </div>
                  <div className="container-1 flex items-center gap-3">
                    <img src={phone} alt="" />
                    <p>{item.contact_number}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default EmployeeDetailsGrid;
