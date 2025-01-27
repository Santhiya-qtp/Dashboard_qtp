import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { jwtDecode } from "jwt-decode";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Info,
  Axis3D,
} from "lucide-react";
import plus_icon from "../assets/plus_icon.svg";
import left_arrow from "../assets/left-arrow.svg";
import right_arrow from "../assets/right-arrow.svg";
import axios from "axios";
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const events = [
  {
    id: 1,
    title: "Kids Sports Festival 2k24",
    date: "Thu, April 27,2023",
    time: "4:00 - 5:00 PM IST",
    location: "Sri eshwar college",
    completed: true,
  },
  {
    id: 2,
    title: "Kids Sports Festival 2k24",
    date: "Thu, April 27,2023",
    time: "4:00 - 5:00 PM IST",
    location: "Sri eshwar college",
    completed: false,
  },
  {
    id: 3,
    title: "Kids Sports Festival 2k24",
    date: "Thu, April 27,2023",
    time: "4:00 - 5:00 PM IST",
    location: "Sri eshwar college",
    completed: false,
  },
];

function UpcomingEvents() {
  // Authorization
  const token = localStorage.getItem("jwtToken");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;

  // refs
  const slidebar = useRef(null);

  // states
  const [events, setEvents] = useState([]);

  // functions
  function handleLeftSide() {
    if (slidebar.current) {
      slidebar.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  }

  function handleRightSide() {
    if (slidebar.current) {
      slidebar.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  }
  const [currentMonthIndex, setCurrentMonthIndex] = useState(3); // April

  const handlePrevMonth = () => {
    setCurrentMonthIndex((prev) => (prev === 0 ? 11 : prev - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex((prev) => (prev === 11 ? 0 : prev + 1));
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/events/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEvents(response.data);
        console.log("Events : ", response.data);
      });
  }, [token]);
  return (
    <div className="h-[75vh] border rounded-lg overflow-auto hide-scrollbar mt-4 col-span-6 lg:col-span-3 ">
      <div className="header pb-4 flex items-center justify-between px-2 pt-2 sticky z-[200] bg-white top-0">
        <h1 className="font-medium">Upcoming Events</h1>
        <div className="icon-container bg-blue-600 w-fit p-2 ">
          <img src={plus_icon} alt="" />
        </div>
      </div>
      <div className="max-w-md bg-white rounded-lg shadow-lg">
        {/* Month Navigation */}
        <div className="date-scrollbar flex mt-3 sticky top-[50px] z-[200]">
          <div
            onClick={handleLeftSide}
            className="left-icon-container bg-gray-300 w-fit p-2 h-auto flex items-center"
          >
            <img src={left_arrow} alt="" />
          </div>
          <div
            ref={slidebar}
            className="content-container w-[100%] bg-white border flex items-center gap-4 py-2 overflow-auto hide-scrollbar px-2"
          >
            <div className="box">Jan</div>
            <div className="box">Feb</div>
            <div className="box">Mar</div>
            <div className="box">Apr</div>
            <div className="box">May</div>
            <div className="box">Jun</div>
            <div className="box">Jul</div>
            <div className="box">Aug</div>
            <div className="box">Sep</div>
            <div className="box">Oct</div>
            <div className="box">Nov</div>
            <div className="box">Dec</div>
          </div>

          <div
            onClick={handleRightSide}
            className="right-icon-container bg-gray-300 w-fit p-2 h-auto flex items-center"
          >
            <img src={right_arrow} alt="" />
          </div>
        </div>
        {/* </div> */}

        {/* Timeline */}
        <div className="relative mt-4">
          <div className={`absolute  left-[22px] top-0 bottom-0 w-0.5`} />
          {/* ${
              events[0].completed ? "bg-blue-200" : "bg-gray-200"
            }` */}

          {events.length > 0 ? (
            events.map((event, index) => {
              const isLastEvent = index === events.length - 1;

              return (
                <div key={event.id} className="relative pl-10 pb-8 w-[280px]">
                  {!isLastEvent && (
                    <div
                      className={`absolute left-[22px] top-3 bottom-0 w-0.5 ${
                        event.completed ? "bg-blue-400" : "bg-gray-200"
                      }`}
                    />
                  )}
                  <div className="absolute left-0 w-11 flex items-center justify-center">
                    <div
                      className={`w-3 h-3 ${
                        event.completed ? "bg-blue-500" : "bg-green-400"
                      } rounded-full`}
                    />
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className={`text-sm font-semibold mb-1 text-blue-600`}>
                      APR
                    </div>
                    <div className="text-2xl font-bold mb-1 text-blue-700">
                      27
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {event.title}
                    </h3>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <button
                      className={`mt-3 flex items-center text-sm font-medium ${
                        event.completed ? "text-blue-500" : "text-gray-400"
                      }`}
                    >
                      <span>More Details</span>
                      <Info className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-lg font-semibold w-fit m-auto pb-4">
              No events available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpcomingEvents;
