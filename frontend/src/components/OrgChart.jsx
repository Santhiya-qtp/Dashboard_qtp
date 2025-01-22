import React, { useEffect, useState } from "react";
import { OrganizationChart } from "primereact/organizationchart";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Navbar from "./Navbar";
import OrganizationDetailsSubNav from "./OrganizationDetailsSubNav";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

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
      profile_img: getImage(node.name), // Add profile images based on name
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
      })
      .catch((error) => console.error("Error fetching org chart data:", error));
  }, [token]);

  // Custom Node Template
  const nodeTemplate = (node) => {
    return (
      <div className="border rounded-lg p-3 w-[220px] text-center bg-[#F5FAFD] shadow-lg">
        {/* {node.profile_img && (
          <img
            src={node.profile_img}
            alt={node.label}
            className="w-[60px] h-[60px] rounded-full mx-auto mb-3 object-cover"
          />
        )} */}
        <p className="font-bold">{node.label}</p>
        <p className="text-sm text-gray-500">{node.role}</p>
        {node.department && (
          <p className="text-xs text-gray-400 mt-1">{node.department}</p>
        )}
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <OrganizationDetailsSubNav />
      <div className="main-container">
        {data ? (
          <div className="mt-3 h-[500px] overflow-auto">
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
