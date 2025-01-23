import React, { useEffect, useState } from "react";
import { OrganizationChart } from "primereact/organizationchart";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Navbar from "./Navbar";
import OrganizationDetailsSubNav from "./OrganizationDetailsSubNav";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const OrgChart = () => {
  // Token decoding
  const token = localStorage.getItem("jwtToken");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;

  // States
  const [data, setData] = useState(null); // Start with `null`
  const [selection, setSelection] = useState(null);

  // Transform API Data
  const transformData = (nodes) => {
    return nodes.map((node) => ({
      label: node.name,
      role: node.label,
      department: node.department,
      profile_img: node.profileimg, // Add profile images based on name
      expanded: true, // Nodes expanded by default
      children: node.subordinates ? transformData(node.subordinates) : [],
    }));
  };

  // Profile images based on node names
  const getImage = (name) => {
    const images = {
      John: "/path-to-ceo-profile-image.jpg", // Update with actual image paths
      Santhiya: "/path-to-developer1-profile.jpg",
      Nishanth: "/path-to-developer2-profile.jpg",
    };
    return images[name] || null; // Return image URL if available
  };

  // Fetch data and transform
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/employees/chart/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const transformedData = transformData(response.data);
        setData(transformedData);
        console.log("transformedData :", transformedData);
      })
      .catch((error) => console.error("Error fetching org chart data:", error));
  }, [token]);

  // Custom Node Template
  const nodeTemplate = (node) => {
    return (
      <div className="border rounded-lg p-3 w-[280px] text-center bg-blue-50 shadow-lg relative">
        {node.profile_img && (
          <img
            src={`http://localhost:8000${node.profile_img}`}
            className="w-[40px] h-[40px] rounded-full mx-auto mb-2 object-cover absolute top-[-25px] left-[50%] translate-x-[-50%]"
          />
        )}
        <p className="font-medium text-black">{node.label}</p>
        <p className="text-sm text-gray-500 font-medium">{node.role}</p>
        {node.department && (
          <p className="text-xs text-gray-700 mt-1">{node.department}</p>
        )}
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <OrganizationDetailsSubNav />
      <div className="main-container ">
        {data ? (
          <div className="mt-3 h-[500px] overflow-auto hide-scrollbar ">
            <OrganizationChart
              value={data}
              selectionMode="single"
              selection={selection}
              onSelectionChange={(e) => setSelection(e.data)}
              nodeTemplate={nodeTemplate}
              className="mt-4"
            />
          </div>
        ) : (
          <p>Loading organization chart...</p>
        )}
      </div>
    </div>
  );
};

export default OrgChart;
