import React, { useEffect, useState } from "react";
import ring from "../assets/ring.png";
import { Gift, Briefcase, Axis3D } from "lucide-react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const MyTeamStatCard = () => {
  const token = localStorage.getItem("jwtToken");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;
  const [celeberationData, setSetCeleberationData] = useState([]);

  const [filter, setFilter] = useState("all");
  // Filter the data based on the selected filter option
  const filteredCelebrationData = celeberationData.filter((celebration) => {
    if (filter === "all") return true;
    return celebration.event_type.toLowerCase() === filter.toLowerCase();
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/employees/team/celebration/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Celeberation Data : ", response.data);
        setSetCeleberationData(response.data);
      });
  }, [token]);
  return (
    <>
      <div className="main-container mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 md:grid-cols-4 col-span-12">
        <div className="container-1 bg-[#FAECEB] h-[80px] rounded-xl flex items-center gap-4 p-4 col-span-1">
          <div className="icon-container bg-[#FEA9AC] w-fit rounded-full px-2 py-2">
            <svg
              width="26"
              height="26"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 15C19.5913 15 21.1174 14.3679 22.2426 13.2426C23.3679 12.1174 24 10.5913 24 9C24 7.4087 23.3679 5.88258 22.2426 4.75736C21.1174 3.63214 19.5913 3 18 3C16.4087 3 14.8826 3.63214 13.7574 4.75736C12.6321 5.88258 12 7.4087 12 9C12 10.5913 12.6321 12.1174 13.7574 13.2426C14.8826 14.3679 16.4087 15 18 15ZM8.25 19.5C9.24456 19.5 10.1984 19.1049 10.9017 18.4017C11.6049 17.6984 12 16.7446 12 15.75C12 14.7554 11.6049 13.8016 10.9017 13.0983C10.1984 12.3951 9.24456 12 8.25 12C7.25544 12 6.30161 12.3951 5.59835 13.0983C4.89509 13.8016 4.5 14.7554 4.5 15.75C4.5 16.7446 4.89509 17.6984 5.59835 18.4017C6.30161 19.1049 7.25544 19.5 8.25 19.5ZM31.5 15.75C31.5 16.7446 31.1049 17.6984 30.4016 18.4017C29.6984 19.1049 28.7446 19.5 27.75 19.5C26.7554 19.5 25.8016 19.1049 25.0984 18.4017C24.3951 17.6984 24 16.7446 24 15.75C24 14.7554 24.3951 13.8016 25.0984 13.0983C25.8016 12.3951 26.7554 12 27.75 12C28.7446 12 29.6984 12.3951 30.4016 13.0983C31.1049 13.8016 31.5 14.7554 31.5 15.75ZM18 16.5C19.9891 16.5 21.8968 17.2902 23.3033 18.6967C24.7098 20.1032 25.5 22.0109 25.5 24V33H10.5V24C10.5 22.0109 11.2902 20.1032 12.6967 18.6967C14.1032 17.2902 16.0109 16.5 18 16.5ZM7.5 24C7.5 22.9605 7.65 21.957 7.932 21.009L7.677 21.03C6.39132 21.1712 5.203 21.782 4.33989 22.7453C3.47679 23.7086 2.99966 24.9566 3 26.25V33H7.5V24ZM33 33V26.25C33.0002 24.9126 32.4899 23.6255 31.5733 22.6515C30.6567 21.6775 29.403 21.09 28.068 21.009C28.3485 21.957 28.5 22.9605 28.5 24V33H33Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="content-container">
            <h1 className="text-md font-">Total Team Members</h1>
            <h1 className="text-md font-">10</h1>
          </div>
        </div>
        <div className="container-1 bg-[#FCF4E9] h-[80px] rounded-xl flex items-center gap-4 p-4">
          <div className="icon-container bg-[#FFD59C] w-fit rounded-full px-2 py-2">
            <svg
              width="26"
              height="26"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29.1137 18.24V18.2378L29.1074 18.2301C29.08 18.1649 29.0405 18.1055 28.9911 18.0549L22.2053 11.3153C22.1528 11.2633 22.0906 11.222 22.0222 11.194C21.9538 11.1659 21.8806 11.1516 21.8067 11.1519C21.7328 11.1521 21.6596 11.1669 21.5914 11.1954C21.5233 11.224 21.4614 11.2656 21.4093 11.3181C21.3572 11.3705 21.3159 11.4327 21.2879 11.5011C21.2598 11.5695 21.2455 11.6427 21.2458 11.7167C21.246 11.7906 21.2609 11.8637 21.2894 11.9319C21.3179 12.0001 21.3596 12.062 21.412 12.1141L27.2293 17.8919H8.34436C8.19518 17.8919 8.0521 17.9511 7.94661 18.0566C7.84112 18.1621 7.78186 18.3052 7.78186 18.4544C7.78186 18.6035 7.84112 18.7466 7.94661 18.8521C8.0521 18.9576 8.19518 19.0169 8.34436 19.0169H27.2436L21.4093 24.8934C21.3041 24.9993 21.2453 25.1427 21.2458 25.292C21.2464 25.4413 21.3062 25.5842 21.4121 25.6894C21.518 25.7946 21.6614 25.8534 21.8106 25.8529C21.9599 25.8524 22.1029 25.7926 22.2081 25.6866L28.9918 18.852L28.9935 18.8509C29.0613 18.779 29.1083 18.6901 29.1294 18.5935C29.135 18.5719 29.1391 18.55 29.1419 18.5278C29.1579 18.4311 29.1482 18.3318 29.1137 18.24Z"
                fill="white"
              />
              <path
                d="M6.72875 18.4542C6.72875 18.0066 6.90654 17.5774 7.223 17.2609C7.53947 16.9445 7.9687 16.7667 8.41625 16.7667H15.6931V3.92627C15.6931 3.77709 15.6338 3.63401 15.5283 3.52852C15.4228 3.42303 15.2798 3.36377 15.1306 3.36377H4.96936C4.52195 3.36425 4.09301 3.54219 3.77664 3.85855C3.46028 4.17492 3.28234 4.60386 3.28186 5.05127V32.0513C3.28234 32.4987 3.46028 32.9276 3.77664 33.244C4.09301 33.5604 4.52195 33.7383 4.96936 33.7388H15.1306C15.2798 33.7388 15.4228 33.6795 15.5283 33.574C15.6338 33.4685 15.6931 33.3255 15.6931 33.1763V20.1417H8.41625C7.9687 20.1417 7.53947 19.9639 7.223 19.6474C6.90654 19.331 6.72875 18.9017 6.72875 18.4542Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="content-container">
            <h1 className="text-md font-">On Leave Today</h1>
            <h1 className="text-md font-">3</h1>
          </div>
        </div>
        <div className="container-1 bg-[#E2E9F3] h-[80px] rounded-xl flex items-center gap-4 p-4">
          <div className="icon-container bg-[#BFCFD7] w-fit rounded-full px-2 py-2">
            <svg
              width="26"
              height="26"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29.1137 18.24V18.2378L29.1074 18.2301C29.08 18.1649 29.0405 18.1055 28.9911 18.0549L22.2053 11.3153C22.1528 11.2633 22.0906 11.222 22.0222 11.194C21.9538 11.1659 21.8806 11.1516 21.8067 11.1519C21.7328 11.1521 21.6596 11.1669 21.5914 11.1954C21.5233 11.224 21.4614 11.2656 21.4093 11.3181C21.3572 11.3705 21.3159 11.4327 21.2879 11.5011C21.2598 11.5695 21.2455 11.6427 21.2458 11.7167C21.246 11.7906 21.2609 11.8637 21.2894 11.9319C21.3179 12.0001 21.3596 12.062 21.412 12.1141L27.2293 17.8919H8.34436C8.19518 17.8919 8.0521 17.9511 7.94661 18.0566C7.84112 18.1621 7.78186 18.3052 7.78186 18.4544C7.78186 18.6035 7.84112 18.7466 7.94661 18.8521C8.0521 18.9576 8.19518 19.0169 8.34436 19.0169H27.2436L21.4093 24.8934C21.3041 24.9993 21.2453 25.1427 21.2458 25.292C21.2464 25.4413 21.3062 25.5842 21.4121 25.6894C21.518 25.7946 21.6614 25.8534 21.8106 25.8529C21.9599 25.8524 22.1029 25.7926 22.2081 25.6866L28.9918 18.852L28.9935 18.8509C29.0613 18.779 29.1083 18.6901 29.1294 18.5935C29.135 18.5719 29.1391 18.55 29.1419 18.5278C29.1579 18.4311 29.1482 18.3318 29.1137 18.24Z"
                fill="white"
              />
              <path
                d="M6.72875 18.4542C6.72875 18.0066 6.90654 17.5774 7.223 17.2609C7.53947 16.9445 7.9687 16.7667 8.41625 16.7667H15.6931V3.92627C15.6931 3.77709 15.6338 3.63401 15.5283 3.52852C15.4228 3.42303 15.2798 3.36377 15.1306 3.36377H4.96936C4.52195 3.36425 4.09301 3.54219 3.77664 3.85855C3.46028 4.17492 3.28234 4.60386 3.28186 5.05127V32.0513C3.28234 32.4987 3.46028 32.9276 3.77664 33.244C4.09301 33.5604 4.52195 33.7383 4.96936 33.7388H15.1306C15.2798 33.7388 15.4228 33.6795 15.5283 33.574C15.6338 33.4685 15.6931 33.3255 15.6931 33.1763V20.1417H8.41625C7.9687 20.1417 7.53947 19.9639 7.223 19.6474C6.90654 19.331 6.72875 18.9017 6.72875 18.4542Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="content-container">
            <h1 className="text-md font-">On Work from Home</h1>
            <h1 className="text-md font-">3</h1>
          </div>
        </div>
        <div className="container-1 bg-[#F5FAFD] h-[200px] rounded-xl px-4 ">
          <h1 className="m-auto w-fit mt-4 text-md font-medium  ">
            Overall Team Attendance Percentage
            <img src={ring} className="m-auto w-[120px]" />
          </h1>
          <div className="celeberation-container translate-x-[-14px] mt-12 h-[200px]">
            <div className="mx-auto w-[315px] border h-[300px] rounded-xl overflow-auto hide-scrollbar">
              <div className="px-4 py-1">
                <div className="flex items-center justify-between mb-6 sticky top-0 pt-3 bg-white pb-5">
                  <h2 className="text-md font-semibold text-gray-800">
                    Celebrations
                  </h2>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-3 text-md py-1 border border-gray-200 rounded-md text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Work Anniversary">Work Anniversary</option>
                  </select>
                </div>

                <div className="space-y-4 mt-[-20px]">
                  {filteredCelebrationData.map((celebration) => (
                    <div
                      key={celebration.id}
                      className="flex items-center space-x-4 p-3 bg-[#FAFAFA] hover:bg-gray-50 rounded-lg transition-colors duration-150"
                    >
                      <div className="flex-shrink-0">
                        <img
                          src={`http://localhost:8000${celebration.employee_photo}`}
                          alt={celebration.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {celebration.employee_name}
                        </p>
                        <div className="flex items-center space-x-1">
                          {celebration.type === "Birthday" ? (
                            <Gift className="w-4 h-4 text-purple-500" />
                          ) : (
                            <Briefcase className="w-4 h-4 text-green-500" />
                          )}
                          <p className="text-sm text-gray-500">
                            {celebration.event_type}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyTeamStatCard;
