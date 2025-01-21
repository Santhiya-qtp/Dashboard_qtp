import React from "react";
import location from "../assets/location.svg";
import mail from "../assets/mail.svg";
import phone from "../assets/phone.svg";
import organization from "../assets/organization.svg";
import call_icon from "../assets/call_icon-1.svg";
const TeamDetailsGrid = ({ teamDetails }) => {
  return (
    <>
      <div className="main-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-3">
        {teamDetails.map((item, index) => {
          return (
            <div className="card bg-[#F5FAFD] p-3 rounded-lg border">
              <div className="header pb-4 border-bottom flex items-center gap-4">
                <img
                  src={`http://localhost:8000/${item.employee_photo}`}
                  className="w-[30px] rounded-full"
                />
                <div className="details">
                  <h1 className="font-medium">{item.employee_first_name}</h1>
                  <p className="text-sm">{item.designation}</p>
                </div>
              </div>
              <div className="content-container mt-3 space-y-5">
                <div className="container-1 flex items-center gap-3">
                  <img src={organization} alt="" />
                  <p>{item.departmant}</p>
                </div>
                <div className="container-1 flex items-center gap-3">
                  <img src={location} alt="" />
                  <p>Sri eshwar college of engineering</p>
                </div>
                <div className="container-1 flex items-center gap-3">
                  <img src={mail} alt="" />
                  <p>{item.email}</p>
                </div>
                <div className="container-1 flex items-center gap-3">
                  <img src={phone} alt="" />
                  <p>{item.contact_number}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TeamDetailsGrid;
