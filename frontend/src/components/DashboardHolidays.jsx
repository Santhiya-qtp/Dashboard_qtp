import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const DashboardHolidays = () => {
  const [holidays, setHolidays] = useState([]);
  const token = localStorage.getItem("jwtToken");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;

  // Define an array of colors for alternating backgrounds
  const bgColors = [
    "bg-red-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-yellow-300",
    "bg-orange-400",
    "bg-teal-300",
    "bg-violet-300",
  ];
  // const holidays = [
  //   {
  //     id: 1,
  //     name: "Diwali",
  //     date: { month: "APR", day: "27" },
  //     color: "bg-[#FEA9AC]",
  //   },
  //   {
  //     id: 2,
  //     name: "Saraswathi Pooja",
  //     date: { month: "APR", day: "27" },
  //     color: "bg-[#2986CE]",
  //   },
  //   {
  //     id: 3,
  //     name: "Pongal",
  //     date: { month: "APR", day: "27" },
  //     color: "bg-[#FFD59C]",
  //   },
  //   {
  //     id: 4,
  //     name: "Christmas",
  //     date: { month: "APR", day: "27" },
  //     color: "bg-[#BFCFD7]",
  //   },
  //   {
  //     id: 5,
  //     name: "New Year",
  //     date: { month: "APR", day: "27" },
  //     color: "bg-[#72CEFC]",
  //   },
  // ];
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/holiday/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setHolidays(response.data);
        console.log("Holidays : ", response.data);
      });
  }, []);

  return (
    <>
      {/* <div className="min-h-screen bg-gray-50 p-6"> */}
      <div className="rounded-xl hide-scrollbar h-[344px] border overflow-auto ">
        <div className="p-4 ">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6  py-1 bg-white ">
              List of Upcoming Holidays
            </h2>
          </div>

          <div className="main-container mt-[35px] h-[240px] overflow-auto hide-scrollbar">
            {holidays.map((item, index) => {
              // Select a color based on the index
              const bgColor = bgColors[index % bgColors.length];
              return (
                <div
                  key={index}
                  className="card bg-gray-50 w-[100%] rounded-lg mb-4 p-4 flex items-center  gap-4"
                >
                  <div
                    className={`date-container w-[70px] text-center px-3 py-1 rounded-lg font-semibold text-white  ${bgColor}`}
                  >
                    <h1>{item.month}</h1>
                    <h1>{item.date}</h1>
                  </div>
                  <div className="description">
                    <h1 className="font-semibold text-gray-700 text-lg">
                      {item.description}
                    </h1>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default DashboardHolidays;
