import React from "react";

const   ProfileMainContent = ({ employee }) => {
  if (!employee) {
    return <div>Loading ....</div>;
  }
  return (
    <>
      <div className="main-container mt-4 bg-[#FAFAFA] p-4 rounded-lg border md:h-[330px]">
        <div className="subnav-container flex items-center gap-4">
          <button className="bg-blue-500 py-2 px-4 border text-white font-medium rounded-lg">
            Personal Info
          </button>
          {/* <button className="border py-2 px-4 border-gay-600 font-medium rounded-lg">
            Asset Details
          </button> */}
        </div>
        <div className="content-container grid  md:grid-cols-12 gap-4 mt-6 ">
          <div className="list-main-container md:col-span-4 space-y-3 border-right">
            <div className="list-1   ">
              <label className="text-[#8B9AA9] text-lg ">Full Name</label>
              <p className="text-lg text-[#222222]">
                {employee.employee_first_name} {employee.employee_last_name}
              </p>
            </div>
            <div className="list-1 col-span-4">
              <label className="text-[#8B9AA9] text-lg">Email</label>
              <p className="text-lg text-[#222222]">{employee.email}</p>
            </div>
            <div className="list-1 col-span-4">
              <label className="text-[#8B9AA9] text-lg">Mobile Number</label>
              <p className="text-lg text-[#222222]">
                {employee.contact_number}
              </p>
            </div>
          </div>

          <div className="main-containaer col-span-4 space-y-3 md:px-4 border-right">
            <div className="list-1 ">
              <label className="text-[#8B9AA9] text-lg">Address</label>
              <p className="text-lg text-[#222222]">{employee.address}</p>
            </div>
            <div className="list-1 col-span-4">
              <label className="text-[#8B9AA9] text-lg">Designation</label>
              <p className="text-lg text-[#222222]">{employee.designation}</p>
            </div>
            <div className="list-1 col-span-4">
              <label className="text-[#8B9AA9] text-lg">Experience</label>
              <p className="text-lg text-[#222222]">{employee.experience}</p>
            </div>
          </div>
          <div className="main-containaer col-span-4 space-y-3 md:px-4 ">
            <div className="list-1 ">
              <label className="text-[#8B9AA9] text-lg">States</label>
              <p className="text-lg text-[#222222]">{employee.state}</p>
            </div>
            <div className="list-1 col-span-4">
              <label className="text-[#8B9AA9] text-lg">Qualification</label>
              <p className="text-lg text-[#222222]">{employee.qualification}</p>
            </div>
            <div className="list-1 col-span-4">
              <label className="text-[#8B9AA9] text-lg">Zip</label>
              <p className="text-lg text-[#222222]">{employee.zip}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileMainContent;
