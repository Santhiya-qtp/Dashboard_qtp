import axios from "axios";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const PermissionRequestTable = () => {
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [employees, setEmployees] = useState({});
  const token = localStorage.getItem("jwtToken");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;

  useEffect(() => {
    // Fetch permission requests
    axios
      .get("http://127.0.0.1:8000/api/permission/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const requests = response.data;

        // Filter for requests with status 'approved' or 'rejected'
        const approvedOrRejectedRequests = requests.filter(
          (item) => item.status === "approved" || item.status === "rejected"
        );

        setFilteredRequests(approvedOrRejectedRequests);

        // Fetch employee details for departments
        const employeeIds = approvedOrRejectedRequests.map(item => item.user_id);
        return axios.get(`http://127.0.0.1:8000/api/employees/${employeeIds.join(',')}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      })
      // .then((response) => {
      //   console.log("Employee data response:", response.data); // Debugging line
        
      //   // Assuming response.data is a JSON object, we will iterate through its keys
      //   let employeeData = {};
      //   if (response.data) {
      //     const employee = response.data;
      //     // Assuming employee data includes employee_id and department
      //     employeeData[employee.user] = employee.departmant;
      //   }

      //   setEmployees(employeeData);

      // })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [token]);

  return (
    <div className="overflow-x-auto mt-4 rounded-lg">
      <table className="min-w-full border border-gray-300 text-sm text-left">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-6 py-3 border-b border-gray-300">Employee Name</th>
            <th className="px-6 py-3 border-b border-gray-300">Department</th>
            <th className="px-6 py-3 border-b border-gray-300">From</th>
            <th className="px-6 py-3 border-b border-gray-300">To</th>
            <th className="px-6 py-3 border-b border-gray-300">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-3 border-b">{item.user_name}</td>
              <td className="px-6 p y-3 border-b">{item.user_department || 'N/A'}</td> {/* Display Department */}
              <td className="px-6 py-3 border-b">{item.time_from.split(':').slice(0, 2).join(':')}</td>
              <td className="px-6 py-3 border-b">{item.time_to.split(':').slice(0, 2).join(':')}</td>
              <td
                className={`px-6 py-3 border-b ${
                  item.status === "approved" ? "text-green-500" : "text-red-500"
                }`}
              >
                 {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PermissionRequestTable;
