import React, { useState } from "react";
import user from "../assets/user-1.png";
import { NavLink } from "react-router-dom";
import { Data } from "../context/store";
import { useContext } from "react";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
// import { Data } from "./store";
const MyDetailsSidebar = () => {
  const { userName } = useContext(Data);
  const myDetails = { name: "Surya Chandran", img: user };
  const [details, setDetails] = useState(null);

  // token
  const token = localStorage.getItem("jwtToken");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/employees/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("resp for  : --------------> ", response.data);
        // Find the object that matches the username
        const matchedObject = response.data.find(
          (item) => item.employee_first_name === userName
        );
        console.log("Matched object: ", matchedObject);

        // Set the matched object to state
        setDetails(matchedObject);
      });
  }, [token]);
  return (
    <>
      <div className="main-container max-sm:hidden border border-gray-200 rounded-lg p-2 w-[250px] h-[82vh] font-lato">
        <div className="header text-center pb-3 border-bottom mt-1">
          <h1 className="text-[#222222] text-[20px]">{userName}</h1>
          {/* <h1 className="text-[#222222] text-[20px]">
            {userName}</h1> */}
          {/* <img
            src={`http://localhost:8000${celebration.employee_photo}`}
            alt={`${celebration.employee_name}'s photo`}
            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
          /> */}
          {details ? (
            <div>
              <img
                src={`http://localhost:8000${details.employee_photo}`}
                className="m-auto mt-2 w-[35px] h-[35px] rounded-full object-cover"
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="links text-center mt-4 flex flex-col gap-4 items-center">
          <NavLink className="text-[16px] text-[#222222] w-[160px]  px-5 py-1 hover:bg-[#F5FAFD] hover:text-[#2986CE] ">
            Attendance
          </NavLink>

          <NavLink
            to="/myDetails"
            className="text-[16px] text-[#222222] w-[160px] px-5 py-1 hover:bg-[#F5FAFD] hover:text-[#2986CE]"
            style={({ isActive }) =>
              isActive
                ? {
                    backgroundColor: "#F5FAFD",
                    color: "#2986CE",
                    borderRadius: "0.375rem",
                  }
                : {}
            }
          >
            Leaves
          </NavLink>
          <NavLink
            to="/permissions"
            className="text-[16px] text-[#222222] w-[160px] px-5 py-1 hover:bg-[#F5FAFD] hover:text-[#2986CE]"
            style={({ isActive }) =>
              isActive
                ? {
                    backgroundColor: "#F5FAFD",
                    color: "#2986CE",
                    borderRadius: "0.375rem",
                  }
                : {}
            }
          >
            Permission
          </NavLink>
          <NavLink className="text-[16px] text-[#222222] w-[160px]  px-5 py-1 hover:bg-[#F5FAFD] hover:text-[#2986CE]">
            Performance
          </NavLink>
          <NavLink className="text-[16px] text-[#222222] w-[160px]  px-5 py-1 hover:bg-[#F5FAFD] hover:text-[#2986CE]">
            Expense & Travel
          </NavLink>
          <NavLink className="text-[16px] text-[#222222] w-[160px]  px-5 py-1 hover:bg-[#F5FAFD] hover:text-[#2986CE]">
            Tickets
          </NavLink>
          <NavLink className="text-[16px] text-[#222222] w-[160px]  px-5 py-1 hover:bg-[#F5FAFD] hover:text-[#2986CE]">
            Finance
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default MyDetailsSidebar;
