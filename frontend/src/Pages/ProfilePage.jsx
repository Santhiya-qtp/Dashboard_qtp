import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";
import Demo from "../components/Demo";
import ProfileHeader from "../components/ProfileHeader";
import ProfileMainContent from "../components/ProfileMainContent";
import { Data } from "../context/store";
const ProfilePage = () => {


  // token
  const token = localStorage.getItem("jwtToken");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;

  //   employee id
  const { id } = useParams();

  // states
  const [profileData, setProfileData] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/employees/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("profile data : ", response.data);
        setProfileData(response.data);

        // filter the matching employee
        const employee = response.data.find(
          (employee) => employee.employee_id.toString() === id
        );
        setSelectedEmployee(employee);
      });
  }, [token]);
  console.log("selectedEmployee :", selectedEmployee);
  return (
    <>
      <div className="main-container">
        <Navbar />
        <ProfileHeader employee={selectedEmployee} />
        <ProfileMainContent employee={selectedEmployee} />
      </div>
    </>
  );
};

export default ProfilePage;
