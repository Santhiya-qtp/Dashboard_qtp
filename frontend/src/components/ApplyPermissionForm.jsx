import React, { useContext, useState, useEffect } from "react";
import closeIcon from "../assets/close-icon.svg";
import { Data } from "../context/store";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ApplyPermissionForm = ({ closeForm, closeMyPermissionForm }) => {
  const token = localStorage.getItem("jwtToken");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;

  // states
  const { userName } = useContext(Data);
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState(""); // State for duration (1 Hour or 2 Hours)
  const [timeOption, setTimeOption] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [existingPermissions, setExistingPermissions] = useState([]);
  const [department, setDepartment] = useState(null);

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const getResponse = await axios.get(
          `http://127.0.0.1:8000/api/employees/${user_id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const dept = getResponse.data.departmant; // Corrected spelling
        setDepartment(dept); // Set department state
        console.log("Department:", dept);
      } catch (error) {
        console.error("Error fetching department:", error);
      }
    };

    fetchDepartment();
  }, [user_id, token]);

  // Fetch existing permissions on component mount
  useEffect(() => {
    const fetchExistingPermissions = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/permission/${user_id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setExistingPermissions(response.data); // Store existing permissions
      } catch (error) {
        console.error("Failed to fetch existing permissions:", error);
      }
    };

    fetchExistingPermissions();
  }, [token, user_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!date || !timeOption || !reason) {
      setError("All fields are required!");
      setSuccessMessage(""); // Clear success message on error
      return;
    }

    // Check if selected date is earlier than today
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    if (date < today) {
      setError("The date cannot be earlier than today!");
      setSuccessMessage(""); // Clear success message on error
      return;
    }

    // Check for duplicate entries (assuming existingPermissions is defined)
    const isDuplicate = existingPermissions.some((permission) => {
      return permission.date === date && permission.time_option === timeOption;
    });

    if (isDuplicate) {
      setError("A permission request for this date and time already exists.");
      setSuccessMessage(""); // Clear success message on error
      return;
    }

    setError(""); // Clear any previous errors
    console.log({
      user_name: userName,
      date: date,
      session: timeOption, // Send selected time option
      duration: duration, // Send selected duration
      reason: reason,
      user_id: user_id,
      user_department : department
    });
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/permission/submit/",
        {
          user_name: userName,
          date: date,
          session: timeOption, // Send selected time option
          duration: duration, // Send selected duration
          reason: reason,
          user_id: user_id,
          user_department: department,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization Header
          },
        }
      );

      // Handle success response
      console.log(response.data);
      setSuccessMessage("Permission request submitted successfully!");
      // Optionally reset form fields
      setDate("");
      setTimeOption("");
      setDuration("");
      setReason("");
      closeForm();
    } catch (error) {
      // Handle error response
      console.error("Error submitting the form", error.response.data);
      setError(error.response.data.error);
      setSuccessMessage(""); // Clear success message on error
    }
  };

  return (
    <>
      <div className="w-[90%] z-[100] sm:w-[80%] md:w-[70%] mx-auto p-4 bg-white border rounded-lg shadow-md fixed top-[5%] left-[50%] translate-x-[-50%]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl">Apply New Permission</h2>
          <button
            onClick={() => {
              closeForm();
              closeMyPermissionForm();
            }}
            className="text-gray-200 p-2 rounded-full bg-gray-200"
          >
            <img src={closeIcon} alt="" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Time Selection */}
          {/* <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">From</label>
              <input
                type="time"
                value={fromTime}
                onChange={(e) => setFromTime(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">To</label>
              <input
                type="time"
                value={toTime}
                onChange={(e) => setToTime(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div> */}
          <div className="time-selection flex items-center gap-4">
            <div className="fore-noon">
              <input
                type="radio"
                id="fore-noon"
                name="timeOption"
                value="FN"
                checked={timeOption === "FN"}
                onChange={() => setTimeOption("FN")}
              />
              <label htmlFor="fore-noon" className="ml-2">
                FN
              </label>
            </div>
            <div className="afternoon">
              <input
                type="radio"
                id="afternoon"
                name="timeOption"
                value="AN"
                checked={timeOption === "AN"}
                onChange={() => setTimeOption("AN")}
              />
              <label htmlFor="afternoon" className="ml-2">
                AN
              </label>
            </div>
          </div>
          <div className="hour-selection mt-2">
            <select
              className="w-[200px] border px-2 py-2 rounded-lg"
              value={duration}
              onChange={(e) => {
                setDuration(e.target.value);
              }}
            >
              <option>Select Duration</option>
              <option value="1">1 Hour</option>
              <option value="2">2 Hour</option>
            </select>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 text-sm text-red-500 bg-red-100 p-2 rounded-md flex items-center">
              <span>⚠️</span>
              <span className="ml-2">{error}</span>
            </div>
          )}

          {/* Reason */}
          <div className="mb-4 mt-3">
            <label className="block text-sm font-medium mb-1">
              Reason for permission
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows="3"
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              onClick={closeForm}
              className="px-4 py-2 border rounded-md text-gray-500 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Request
            </button>
          </div>
        </form>
      </div>
      <div className="permission-tint fixed top-0 right-0 bottom-0 left-0"></div>
    </>
  );
};

export default ApplyPermissionForm;
