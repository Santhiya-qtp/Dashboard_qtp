import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Data } from "../context/store";
import bg from "../assets/greetings-bg.png";
import { Gift, Briefcase } from "lucide-react";

import inboxImg from "../assets/inbox-img.png";
import StatCard from "../components/StatCard";
import DashboardHolidays from "../components/DashboardHolidays";
import UserQuickAction from "../components/UserQuickAction";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const Dashboard = () => {
  const [celebrations, setcelebrations] = useState([]);
  const [filter, setFilter] = useState("all");
  const { userName, setUserName } = useContext(Data);
  const token = localStorage.getItem("jwtToken");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;
  // Fetch celebrations from the API
  useEffect(() => {
    const fetchCelebrations = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/employee/event/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response from employee:", response.data);
        setcelebrations(response.data);
      } catch (error) {
        console.error("Error fetching celebrations:", error);
      }
    };

    fetchCelebrations();
  }, []); // Dependency array includes token to refetch if it changes

  // Function to filter celebrations based on selected type
  const filteredCelebrations = celebrations.filter((celebration) => {
    if (filter === "all") return true; // Show all celebrations
    return celebration.event_type.toLowerCase() === filter; // Filter by event type
  });
  return (
    <>
      <div className="main-contaier">
        <Navbar />
        <div className="first-section lato mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 ">
          <div className="greetings-section lato bg-[#FAFAFA] flex items-center p-5 rounded-lg">
            <div className="first-container">
              <h1 className="weight-500 text-[24px] text-[#222222] font-semibold">
                Good Morning,
              </h1>
              <p className="name  weight-600 text-[#2986CE] text-[24px]">
                {userName} !
              </p>
              <p className="text-[16px] text-[#222222] w-[80%] ">
                Welcome aboard! We're thrilled to have you with us and look
                forward to working together to achieve success!
              </p>
            </div>
            <div className="second-container ">
              <img src={bg} className="w-[280px] h-[200px] object-cover" />
            </div>
          </div>

          <div className="inbox-section bg-[#F5FAFD] flex items-center p-5 rounded-lg">
            <div className="first-container">
              <h1 className="text-[24px]">Inbox</h1>
              <h1 className="text-[#2986CE] text-[24px] weight-400">0</h1>
              <p className="text-[16px] w-[80%]">
                Tasks waiting for your approval. Please click on take action for
                more details.
              </p>
              <button className="bg-[#2986CE] text-[#FFFFFF] rounded-lg text-[16px] weight-600 px-3 py-2 mt-2 hover:bg-blue-500">
                Click to open
              </button>
            </div>
            <div className="img-container">
              <img src={inboxImg} className="w-[300px] h-full" />
            </div>
          </div>
        </div>
        {/* ---------------------------------------Second Section------------------------  */}

        <div className="second-section mt-4 ">
          <UserQuickAction />
          <div className="main-container grid md:grid-cols-3 gap-3  sm:grid-cols-2 grid-cols-1  mt-3">
            {/* stat-cards starts here  */}
            <StatCard />
            {/* stat-cards ends here  */}

            <div className="mx-auto w-[100%] border h-[344px] rounded-xl overflow-auto hide-scrollbar">
              <div className="p-4  ">
                <div className="flex items-center gap-3 justify-between mb-6 bg-white py-1">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Celebrations
                  </h2>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="sm:w-[100px] lg:w-auto px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All</option>
                    <option value="birthday">Birthday</option>
                    <option value="work anniversary">Work Anniversary</option>
                  </select>
                </div>

                {/* <div className="space-y-4 h-[244px] overflow-auto hide-scrollbar">
                  
                </div> */}
                <div className="space-y-4 h-[244px] overflow-auto hide-scrollbar">
                  {filteredCelebrations.length > 0 ? (
                    filteredCelebrations.map((celebration) => (
                      <div
                        key={celebration.id}
                        className="flex items-center space-x-4 p-3 bg-[#FAFAFA] hover:bg-gray-50 rounded-lg transition-colors duration-150"
                      >
                        <div className="flex-shrink-0">
                          <img
                            src={`http://localhost:8000${celebration.employee_photo}`}
                            alt={`${celebration.employee_name}'s photo`}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {celebration.employee_name}
                          </p>
                          <div className="flex items-center space-x-1">
                            {celebration.event_type === "Birthday" ? (
                              <Gift className="w-4 h-4 text-purple-500" />
                            ) : (
                              <Briefcase className="w-4 h-4 text-green-500" />
                            )}
                            <p className="text-sm text-gray-500">
                              {celebration.event_type}
                            </p>
                          </div>
                        </div>

                        <div className="flex-shrink-0">
                          <span className="text-sm font-medium text-blue-500">
                            {celebration.date}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-[100%]">
                      <p className="text-gray-600 font-medium text-lg w-[70%] text-center">Looks like it’s a quiet day—no celebrations today!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Holiday section  */}
            <DashboardHolidays />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
