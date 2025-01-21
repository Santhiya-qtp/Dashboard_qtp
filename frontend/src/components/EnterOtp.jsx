import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Eye, EyeOff, Lock, Mail, Key, NavigationOff } from "lucide-react";
import bg from "../assets/enterOtp-bg.svg";
import { useNavigate } from "react-router-dom";
import { Data } from "../context/store";
import axios from "axios";
const EnterOtp = () => {
  const { globalEmail, globalUserName, setGlobalUserName } = useContext(Data);
  const { globalOtp, setGlobalOtp } = useContext(Data);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isExpired, setIsExpired] = useState(false);
  const [otp, setOpt] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Start the countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // function to handle OTP
  function handleValidateOtpAndRedirect(e) {
    e.preventDefault();
    if (isExpired) {
      alert("OTP has expired. Please request a new one.");
      return;
    }
    setGlobalOtp(otp);
    axios
      .post("http://127.0.0.1:8000/api/verify_otp/", {
        email: globalEmail,
        otp: otp,
      })
      .then((response) => {
        console.log(response.data);
        // If OTP is valid, navigate to the re-enter password page
        navigate("/re-enterPassword");
      })
      .catch((error) => {
        // Check if the error is due to a response (e.g., 400/500 errors)
        if (error.response) {
          alert(`Error: ${error.response.data.error}`);
        } else {
          // Handle other types of errors like network issues
          alert("Error: Something went wrong. Please try again later.");
        }
      });
  }

  // Convert time left to minutes and seconds for display
  const formatTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <>
      <div className=" lato  flex justify-center ">
        <div className="w-full  grid grid-cols-1 md:grid-cols-2 items-center bg-white  ">
          {/* Left Side - Form */}
          <div className="p-8 h-fit md:mt-[60px] ">
            <div className="mb-8 logo">
              <img src={logo} className="w-[140px]" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2 mt-2">
                Verify Password
              </h2>
            </div>

            <form className="space-y-6 ">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-lg font-semibold text-gray-700"
                >
                  Enter OTP
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="number"
                    value={otp}
                    onChange={(e) => {
                      setOpt(e.target.value);
                    }}
                    className="block number-box outline-none w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter your OTP here"
                    // required
                  />
                </div>
                {/* Display countdown timer */}
                <div className="text-text-md text-red-600">
                  {isExpired
                    ? "OTP expired! Please request a new one."
                    : `Time left: ${formatTimeLeft()}`}
                </div>
              </div>
              <div className="text-center text-md text-gray-600">
                Didn’t receive the code ?{" "}
                <a className="text-[#2986CE] hover:text-blue-800 hover:underline font-semibold cursor-pointer">
                  Resend
                </a>
              </div>
              <button
                onClick={handleValidateOtpAndRedirect}
                className="w-full bg-[#2986CE] text-white py-2.5 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all font-semibold text-lg"
              >
                Verify
              </button>
            </form>
          </div>

          {/* Right Side - Illustration */}
          <div className="hidden md:block h-[164.8%]  bg-[#2986CE]     ">
            <div className="h-full flex items-center justify-center">
              <img
                src={bg}
                alt="Login illustration"
                className="w-[70%] h-[80%] "
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnterOtp;
