import React, { useContext, useState, useEffect } from "react";
import { Data } from "../context/store";
import closeIcon from "../assets/close-icon.svg";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
const ApplyLeaveFormModal = ({ handleCloseModal, closeTheForm }) => {
  const token = localStorage.getItem("jwtToken");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;
  const [openDeleteConfrimation, setOpenDeleteConfirmation] = useState(false);
  const [deleteTint, setDeleteTint] = useState(false);
  const { employeeLeaveDetails, setEmployeeLeaveDetails, userName } =
    useContext(Data);
  const { deletingLeaveId, setDeletingLeaveId } = useContext(Data);
  // const [filterStatus, setFilterStatus] = useState("");
  const [selectedTime, setSelectedTime] = useState("fullDay");
  const [newSickLeave, setNewSickLeave] = useState(7);
  const [newCasualLeave, setNewCasualLeave] = useState(12);
  const [newVacationLeave, setNewVacationLeave] = useState(6);
  const [LOP, setLOP] = useState(0);

  const [sickLeaveCount, setSickLeaveCount] = useState(0);
  const [casualLeaveCount, setCasualLeaveCount] = useState(0);
  const [vacationLeaveCount, setVacationLeaveCount] = useState(0);

  const [leaveCounts, setLeaveCounts] = useState({});

  const [dateErrorMessage, setDateErrorMessage] = useState(false);
  const [dateError, setDateError] = useState(""); // State for error message
  function handleCloseDeleteModal() {
    setOpenDeleteConfirmation(false);
    setDeleteTint(false);
  }
  console.log("Employee leave details :", employeeLeaveDetails);
  function handleDeleteModal() {
    // Make an API call to delete the leave from the database
    axios
      .delete(`http://127.0.0.1:8000/api/leave/delete/${deletingLeaveId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("leave id :", deletingLeaveId);
        // If deletion was successful, filter the local state and update context
        const updatedLeaves = employeeLeaveDetails.filter(
          (leave) => leave.leave_id !== deletingLeaveId
        );
        setEmployeeLeaveDetails(updatedLeaves); // Update the context with filtered data
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          console.error("Error:", error.response.data.detail);
          alert(error.response.data.detail);
          // Show an error message or update UI here
        } else {
          console.error("Error:", error.message);
        }
      });

    setOpenDeleteConfirmation(false);
    setDeleteTint(false);
  }
  const handleDeleteLeave = (leaveId) => {
    setOpenDeleteConfirmation(true);
    setDeleteTint(true);
  };

  const [showLeaveApplyModal, setShowLeaveApplyModal] = useState(false);

  function handleTint() {
    setShowTint(true);
  }
  function handleCloseTint() {
    // setShowTint(false);
  }
  function handleCloseModal() {
    setShowLeaveApplyModal(false);
  }
  function handleModal() {
    setShowLeaveApplyModal(true);
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [filteredLeaves, setFilteredLeaves] = useState(employeeLeaveDetails);
  useEffect(() => {
    const filtered = employeeLeaveDetails.filter((leave) => {
      const leaveType = leave.leave_type || ""; // Default to empty string if undefined
      const leaveFromDate = leave.from || "";
      const leaveToDate = leave.to || "";
      const leaveReason = leave.reason || "";

      // Check if the search term is found in any of the relevant fields (leaveType, fromDate, toDate, reason)
      const matchesSearch =
        leaveType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        leaveFromDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        leaveToDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        leaveReason.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter by status if selected
      const matchesFilter =
        filterStatus === "" || leave.status === filterStatus;

      return matchesSearch && matchesFilter;
    });

    setFilteredLeaves(filtered); // Set the filtered leave data to be displayed
  }, [searchTerm, filterStatus, employeeLeaveDetails]);

  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    leaveType: "",
    timePeriod: selectedTime,
    notes: "",
    notify: "",
  });
  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Validate the dates if "fromDate" or "toDate" is changed
    if (name === "fromDate" || name === "toDate") {
      validateDates(
        name === "fromDate" ? value : formData.fromDate,
        name === "toDate" ? value : formData.toDate
      );
    }
  };

  const validateDates = (fromDate, toDate) => {
    if (fromDate && toDate && new Date(toDate) < new Date(fromDate)) {
      setDateError("To Date cannot be earlier than From Date.");
    } else {
      setDateError(""); // Clear the error if dates are valid
    }
  };

  const isDateOverlapping = (fromDate, toDate) => {
    const newFromDate = new Date(fromDate);
    const newToDate = new Date(toDate);

    return employeeLeaveDetails.some((leave) => {
      const existingFromDate = new Date(leave.fromDate);
      const existingToDate = new Date(leave.toDate);

      // Check for overlap
      return (
        (newFromDate >= existingFromDate && newFromDate <= existingToDate) ||
        (newToDate >= existingFromDate && newToDate <= existingToDate) ||
        (newFromDate <= existingFromDate && newToDate >= existingToDate)
      );
    });
  };

  const handleSubmitLeave = async () => {
    const token = localStorage.getItem("jwtToken");
    const decoded = jwtDecode(token);
    const user_id = decoded.user_id;
    const { fromDate, toDate } = formData;

    // Check for empty fields
    if (
      !fromDate ||
      !toDate ||
      !formData.leaveType ||
      !formData.notes ||
      !formData.notify
    ) {
      alert("All fields are required.");
      return; // Prevent submission if any field is empty
    }

    // Check for overlapping leave dates
    if (isDateOverlapping(fromDate, toDate)) {
      alert("You already have leave applied during the selected date range.");
      return; // Prevent submission
    }

    // Fetch the department from the first API call
    const getResponse = await axios.get(
      `http://127.0.0.1:8000/api/employees/${user_id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const dept = getResponse.data.departmant;
    console.log("Department:", dept);
    // Prepare the data to be sent to the API
    const requestData = {
      leave_type: formData.leaveType,
      fromDate: formData.fromDate,
      user_id: user_id,
      toDate: formData.toDate,
      notes: formData.notes,
      notify: formData.notify,
      time_period: formData.timePeriod,
      user_name: userName,
      user_department: dept, // Pass the department here
      // status: "Pending",
    };
    console.log("requestData : ", requestData);
    if (dateError) {
      // Prevent submission if there is an error
      // alert("To date should not be earlier than the From date");
      setDateErrorMessage(true);
      setTimeout(() => {
        setDateErrorMessage(false);
      }, 2000);
      return;
    }
    axios
      .post("http://127.0.0.1:8000/api/leave/submit/", requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const newLeave = response.data; // Assume the server responds with the saved leave data

        // Update the context state with the new leave
        setEmployeeLeaveDetails((prevDetails) => [...prevDetails, newLeave]);

        // Reset the form and close modal
        setFormData({
          fromDate: "",
          toDate: "",
          leaveType: "",
          timePeriod: "fullDay",
          notes: "",
          notify: "",
        });
        setShowLeaveApplyModal(false);
        handleCloseTint();
      })
      .catch((error) => {
        console.error("Error applying leave:", error);
        alert(error.response.data.error);
        // alert("All fields re required..")
      });
    closeTheForm();
  };

  useEffect(() => {
    // Helper function to calculate leave count by type
    const calculateLeaveCount = (type) => {
      return employeeLeaveDetails.reduce((total, leave) => {
        if (leave.status === "Approved" && leave.leave_type === type) {
          return (
            total +
            (leave.time_period === "firstHalf" ||
            leave.time_period === "secondHalf"
              ? 0.5
              : 1)
          );
        }
        return total;
      }, 0);
    };

    const calculateLOP = () => {
      const casualLeavesThisMonth = employeeLeaveDetails.filter(
        (leave) =>
          leave.leave_type === "Casual Leave" &&
          leave.status === "Approved" &&
          new Date(leave.date).getMonth() === new Date().getMonth()
      );

      const totalCasualLeaveDays = casualLeavesThisMonth.reduce(
        (total, leave) => {
          return (
            total +
            (leave.time_period === "firstHalf" ||
            leave.time_period === "secondHalf"
              ? 0.5
              : 1)
          );
        },
        0
      );

      return totalCasualLeaveDays > 3
        ? Math.floor((totalCasualLeaveDays - 3) / 3)
        : 0;
    };

    setSickLeaveCount(calculateLeaveCount("Sick Leave"));
    setCasualLeaveCount(calculateLeaveCount("Casual Leave"));
    setVacationLeaveCount(calculateLeaveCount("Annual Leave"));

    const lop = calculateLOP();
    setLOP(lop);
  }, [employeeLeaveDetails]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/leave_count/${user_id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("leave count response :", response.data);
        setLeaveCounts(response.data);
      });
  }, []);

  return (
    <>
      <div className="leave-apply-modal  font-lato  text-[#222222] fixed top-[2%] sm:top-[1%] left-[50%] translate-x-[-50%] bg-white shadow-lg rounded-lg border sm:w-[95%]  md:w-[80%] h-[96vh] max-sm:w-[95%] max-sm:h-[95%]">
        <div className="header flex items-center justify-between p-3 border-bottom">
          <h1 className="text-[20px] text-[#222222]">Apply Leave</h1>
          <div
            onClick={() => {
              // handleCloseModal();
              // handleCloseTint();
              closeTheForm();
            }}
            className="close-icon bg-[#D9D9D9] px-[10px] py-[10px] rounded-full w-fit cursor-pointer"
          >
            <img src={closeIcon} alt="" />
          </div>
        </div>
        <div className="form max-sm:mt-0  px-2 sm:p-6  ">
          <div className="form-header grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="from-date">
              <label htmlFor="fromDate" className="text-md ">
                From
              </label>{" "}
              <span className="text-red-500 text-lg">*</span>
              <br />
              <input
                type="date"
                className="rounded-lg mt-1 outline-none border w-full border-gray-800 py-2 sm:py-2 px-4 text-md"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleFormDataChange}
              />
            </div>
            <div className="to-date">
              <label htmlFor="toDate" className=" text-md  ">
                To
              </label>{" "}
              <span className="text-red-500 text-lg">*</span>
              <br />
              <input
                type="date"
                className="rounded-lg mt-1 w-full outline-none border border-gray-800 py-2 sm:py-2 px-4 text-md "
                name="toDate"
                value={formData.toDate}
                onChange={handleFormDataChange}
              />
            </div>
            {dateErrorMessage ? (
              <div className="text-red-500">
                To date should not be earlier than From Date
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="form-body-content mt-2 sm:space-y-2">
            <label htmlFor="leaveType" className="text-md">
              Select Leave Type
            </label>{" "}
            <span className="text-red-500 text-lg">*</span>
            <br />
            <select
              name="leaveType"
              id="leaveType"
              className="mt-1 border outline-none  w-[100%] bg-transparent sm:py-2 py-2 px-2 sm:px-4 text-md  rounded-lg border-gray-800"
              value={formData.leaveType}
              onChange={handleFormDataChange}
            >
              <option value="">Select Leave Type</option>
              <option value="Medical Leave">Medical Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              {/* <option value="Annual Leave"> </option> */}
            </select>
            <div className="time-period flex items-center gap-3 bg-gray-50 px-2 py-2 w-[300px] rounded-lg">
              <div className="full-time w-[50%]">
                <button
                  onClick={() => {
                    setSelectedTime("fullDay");
                    setFormData((prev) => ({ ...prev, timePeriod: "" })); // Reset dropdown if Full Day is selected
                  }}
                  disabled={
                    formData.timePeriod === "firstHalf" ||
                    formData.timePeriod === "secondHalf"
                  } // Disable if First or Second Half is selected
                  className={`w-[100%] px-3 py-1 rounded-lg ${
                    selectedTime === "fullDay" &&
                    !["firstHalf", "secondHalf"].includes(formData.timePeriod)
                      ? "bg-white shadow-sm text-black"
                      : "text-gray-400 bg-gray-100"
                  } ${
                    ["firstHalf", "secondHalf"].includes(formData.timePeriod)
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Full Day
                </button>
              </div>
              <div className="custom w-[50%]">
                <select
                  value={formData.timePeriod || "custom"} // Default to "custom"
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData((prev) => ({ ...prev, timePeriod: value }));
                    if (value !== "custom") {
                      setSelectedTime(""); // Reset Full Day if any option other than Custom is selected
                    }
                  }}
                  name="timePeriod"
                  className={`w-full px-3 py-1 rounded-lg outline-none ${
                    formData.timePeriod === "firstHalf" ||
                    formData.timePeriod === "secondHalf"
                      ? "bg-white shadow-sm text-black"
                      : "text-gray-500"
                  }`}
                >
                  <option value="custom">Custom</option>
                  <option value="firstHalf">First Half</option>
                  <option value="secondHalf">Second Half</option>
                </select>
              </div>
            </div>
            <div className="notes-section mt-4">
              <label htmlFor="notes" className="text-md ">
                Notes
              </label>{" "}
              <span className="text-red-500 text-lg">*</span>
              <br />
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleFormDataChange}
                className="w-[100%] outline-none border border-gray-800 rounded-lg px-2 sm:px-4 text-sm  py-2 sm:py-2 sm:mt-2"
              ></textarea>
            </div>
            <label htmlFor="notify" className="text-md ">
              Notify
            </label>{" "}
            <span className="text-red-500 text-lg">*</span>
            <br />
            <select
              name="notify"
              id="notify"
              className="border border-black w-[100%] px-2 sm:px-4 py-2 sm:py-2 text-md  rounded-lg mt-1"
              value={formData.notify}
              onChange={handleFormDataChange}
            >
              <option value="">Select Reporting Manager</option>
              <option>SARFARAZ AHMED A</option>
              <option>Dr. H. Anandakumar</option>
            </select>
            <div className="button-parent-section  relative ">
              <div className="button-section w-fit absolute  right-0  flex items-center gap-4 mt-3">
                <button
                  onClick={() => {
                    handleCloseModal();
                    handleCloseTint();
                  }}
                  className="border border-gray-400 rounded-lg px-4 py-2 text-md font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitLeave}
                  className="rounded-lg px-4 py-2 border border-[#2986CE] text-md text-white bg-[#2986CE] font-semibold"
                >
                  Request
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplyLeaveFormModal;
