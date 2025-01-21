import axios from "axios";
import { ImageOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
const PermissionStatCard = () => {
  const token = localStorage.getItem("jwtToken");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;

  //states

  const [permissionCounts, setPermissionCounts] = useState({});
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/permission/available/${user_id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("respo :", response.data);
        setPermissionCounts(response.data);
      });
  }, [token, user_id]);

  return (
    <>
      <div className="lato grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* <div className="first-container bg-[#FAECEB] p-4 flex items-center gap-2 rounded-lg">
          <div className="icon-container bg-[#FEA9AC] w-fit rounded-full p-2">
            <svg
              width="26"
              height="26"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29.114 18.2386V18.2363L29.1077 18.2287C29.0803 18.1635 29.0409 18.104 28.9915 18.0534L22.2056 11.3139C22.1532 11.2618 22.091 11.2205 22.0226 11.1925C21.9542 11.1644 21.881 11.1501 21.8071 11.1504C21.7331 11.1506 21.66 11.1655 21.5918 11.194C21.5236 11.2225 21.4617 11.2642 21.4096 11.3166C21.3575 11.3691 21.3163 11.4313 21.2883 11.4997C21.2602 11.568 21.2459 11.6413 21.2462 11.7152C21.2464 11.7891 21.2612 11.8623 21.2897 11.9304C21.3183 11.9986 21.3599 12.0605 21.4124 12.1126L27.2297 17.8904H8.34473C8.19554 17.8904 8.05247 17.9497 7.94698 18.0552C7.84149 18.1606 7.78223 18.3037 7.78223 18.4529C7.78223 18.6021 7.84149 18.7452 7.94698 18.8506C8.05247 18.9561 8.19554 19.0154 8.34473 19.0154H27.2439L21.4097 24.8919C21.3045 24.9979 21.2457 25.1412 21.2462 25.2905C21.2467 25.4398 21.3065 25.5828 21.4124 25.6879C21.5184 25.7931 21.6617 25.8519 21.811 25.8514C21.9603 25.8509 22.1032 25.7911 22.2084 25.6852L28.9922 18.8506L28.9939 18.8495C29.0617 18.7776 29.1087 18.6886 29.1298 18.5921C29.1353 18.5704 29.1395 18.5485 29.1423 18.5264C29.1583 18.4296 29.1486 18.3304 29.114 18.2386Z"
                fill="white"
              />
              <path
                d="M6.72911 18.4537C6.72911 18.0061 6.9069 17.5769 7.22337 17.2605C7.53984 16.944 7.96906 16.7662 8.41661 16.7662H15.6935V3.92578C15.6935 3.7766 15.6342 3.63352 15.5287 3.52803C15.4232 3.42254 15.2801 3.36328 15.131 3.36328H4.96973C4.52232 3.36376 4.09337 3.5417 3.77701 3.85806C3.46065 4.17443 3.2827 4.60337 3.28223 5.05078V32.0508C3.2827 32.4982 3.46065 32.9271 3.77701 33.2435C4.09337 33.5599 4.52232 33.7378 4.96973 33.7383H15.131C15.2801 33.7383 15.4232 33.679 15.5287 33.5735C15.6342 33.468 15.6935 33.325 15.6935 33.1758V20.1412H8.41661C7.96906 20.1412 7.53984 19.9634 7.22337 19.6469C6.9069 19.3305 6.72911 18.9012 6.72911 18.4537Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="content">
            <h1 className="text-sm">Total Permission Request</h1>
            <p>10</p>
          </div>
        </div> */}
        {/* <div className="second-container bg-[#F3EED8] p-4 flex items-center gap-2 rounded-lg">
          <div className="icon-container bg-[#FFD59C] w-fit rounded-full p-2">
            <svg
              width="26"
              height="26"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71572 23.2843 0 15 0C6.71572 0 0 6.71572 0 15C0 23.2843 6.71572 30 15 30ZM23.0561 10.2532C23.3341 9.94605 23.3104 9.47175 23.0032 9.19387C22.696 8.91592 22.2218 8.93962 21.9439 9.24682L12.9607 19.1756L8.01788 14.4574C7.71825 14.1715 7.2435 14.1825 6.95745 14.4821C6.67147 14.7817 6.6825 15.2565 6.98212 15.5426L12.4822 20.7925L13.0393 21.3244L13.5562 20.7532L23.0561 10.2532Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="content">
            <h1 className="text-sm">Approved Permission</h1>
            <p>5</p>
          </div>
        </div> */}
        {/* <div className="second-container bg-[#E2E9F3] p-4 flex items-center gap-2 rounded-lg">
          <div className="icon-container bg-[#BFCFD7] w-fit rounded-full p-2">
            <svg
              width="26"
              height="26"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M-2 -2H34V34H-2V-2Z" fill="white" />
            </svg>
          </div>
          <div className="content">
            <h1 className="text-sm">Rejected Permission</h1>
            <p>5</p>
          </div>
        </div> */}
        <div className="first-container bg-[#FAECEB] p-4 flex items-center gap-2 rounded-lg">
          <div className="icon-container bg-[#FEA9AC] w-fit rounded-full p-2">
            <svg
              width="26"
              height="26"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29.114 18.2386V18.2363L29.1077 18.2287C29.0803 18.1635 29.0409 18.104 28.9915 18.0534L22.2056 11.3139C22.1532 11.2618 22.091 11.2205 22.0226 11.1925C21.9542 11.1644 21.881 11.1501 21.8071 11.1504C21.7331 11.1506 21.66 11.1655 21.5918 11.194C21.5236 11.2225 21.4617 11.2642 21.4096 11.3166C21.3575 11.3691 21.3163 11.4313 21.2883 11.4997C21.2602 11.568 21.2459 11.6413 21.2462 11.7152C21.2464 11.7891 21.2612 11.8623 21.2897 11.9304C21.3183 11.9986 21.3599 12.0605 21.4124 12.1126L27.2297 17.8904H8.34473C8.19554 17.8904 8.05247 17.9497 7.94698 18.0552C7.84149 18.1606 7.78223 18.3037 7.78223 18.4529C7.78223 18.6021 7.84149 18.7452 7.94698 18.8506C8.05247 18.9561 8.19554 19.0154 8.34473 19.0154H27.2439L21.4097 24.8919C21.3045 24.9979 21.2457 25.1412 21.2462 25.2905C21.2467 25.4398 21.3065 25.5828 21.4124 25.6879C21.5184 25.7931 21.6617 25.8519 21.811 25.8514C21.9603 25.8509 22.1032 25.7911 22.2084 25.6852L28.9922 18.8506L28.9939 18.8495C29.0617 18.7776 29.1087 18.6886 29.1298 18.5921C29.1353 18.5704 29.1395 18.5485 29.1423 18.5264C29.1583 18.4296 29.1486 18.3304 29.114 18.2386Z"
                fill="white"
              />
              <path
                d="M6.72911 18.4537C6.72911 18.0061 6.9069 17.5769 7.22337 17.2605C7.53984 16.944 7.96906 16.7662 8.41661 16.7662H15.6935V3.92578C15.6935 3.7766 15.6342 3.63352 15.5287 3.52803C15.4232 3.42254 15.2801 3.36328 15.131 3.36328H4.96973C4.52232 3.36376 4.09337 3.5417 3.77701 3.85806C3.46065 4.17443 3.2827 4.60337 3.28223 5.05078V32.0508C3.2827 32.4982 3.46065 32.9271 3.77701 33.2435C4.09337 33.5599 4.52232 33.7378 4.96973 33.7383H15.131C15.2801 33.7383 15.4232 33.679 15.5287 33.5735C15.6342 33.468 15.6935 33.325 15.6935 33.1758V20.1412H8.41661C7.96906 20.1412 7.53984 19.9634 7.22337 19.6469C6.9069 19.3305 6.72911 18.9012 6.72911 18.4537Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="content">
            <h1 className="text-sm">Available Hours</h1>
            <p>{Math.round(permissionCounts.available_leave_hours)}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PermissionStatCard;
