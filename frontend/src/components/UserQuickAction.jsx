import React, { useContext, useState } from "react";
import icon1 from "../assets/icon-1.svg";
import icon2 from "../assets/icon-2.svg";
import icon3 from "../assets/icon-3.svg";
import { Data } from "../context/store";
import ApplyLeaveFormModal from "./ApplyLeaveFormModal";
import ApplyPermissionForm from "./ApplyPermissionForm";
import PermissionApplyFormOne from "./PermissionApplyFormOne";
import { Codepen } from "lucide-react";
const UserQuickAction = () => {
  const { setQuickActionModal } = useContext(Data);
  const [openModal, setOpenModal] = useState(false);
  const [openApplyForm, setOpenApplyForm] = useState(false);
  const [tint, setTint] = useState(false);
  function handleOpenModal() {
    setTint(true);
    setOpenModal(true);
    console.log(openModal);
  }
  function handleCloseModal() {
    console.log("Running man");
    setTint(false);
    setOpenModal(false);
  }
  function openForm() {
    setOpenApplyForm(true);
  }
  function closeForm() {
    setOpenApplyForm(false);
  }
  function closeTheForm() {
    setOpenModal(false);
    setTint(false);
  }
  return (
    <>
      <div className="main-container bg-[#FCFCFC] p-2 rounded-lg">
        <div className="heading-container px-3 py-1">
          <h1 className="text-[18px] font-semibold">Quick Actions</h1>
        </div>
        <div className="button-container grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 mt-4 cursor-pointer">
          <div
            onClick={handleOpenModal}
            className="button-1 border rounded-lg px-3 py-4 text-center bg-white "
          >
            <div className="icon-container bg-[#F0FDF4] w-fit p-1 rounded-full m-auto">
              <img src={icon1} alt="" />
            </div>
            <h1 className="text-[12px]">Apply Leave</h1>
          </div>
          <div
            onClick={openForm}
            className="button-2 border rounded-lg px-3 py-4 text-center bg-white "
          >
            <div className="icon-container bg-[#F0FDF4] w-fit p-1 rounded-full m-auto">
              <img src={icon2} alt="" />
            </div>
            <h1 className="text-[12px]">Apply Permission</h1>
          </div>
          <div className="button-3 border rounded-lg px-3 py-4 text-center bg-white">
            <div className="icon-container bg-[#F0FDF4] w-fit p-1 rounded-full m-auto">
              <img src={icon3} alt="" />
            </div>
            <h1 className="text-[12px]">Apply Leave</h1>
          </div>
          <div className="button-4 border rounded-lg px-3 py-4 text-center bg-white">
            <div className="icon-container bg-[#F0FDF4] w-fit p-1 rounded-full m-auto">
              <img src={icon3} alt="" />
            </div>
            <h1 className="text-[12px]">Apply Leave</h1>
          </div>
          <div className="button-5 border rounded-lg px-3 py-4 text-center bg-white">
            <div className="icon-container bg-[#F0FDF4] w-fit p-1 rounded-full m-auto">
              <img src={icon3} alt="" />
            </div>
            <h1 className="text-[12px]">Apply Leave</h1>
          </div>
          <div className="button-6 border rounded-lg px-3 py-4 text-center bg-white">
            <div className="icon-container bg-[#F0FDF4] w-fit p-1 rounded-full m-auto">
              <img src={icon3} alt="" />
            </div>
            <h1 className="text-[12px]">Apply Leave</h1>
          </div>
          <div className="button-7 border rounded-lg px-3 py-4 text-center bg-white">
            <div className="icon-container bg-[#F0FDF4] w-fit p-1 rounded-full m-auto">
              <img src={icon3} alt="" />
            </div>
            <h1 className="text-[12px]">Apply Leave</h1>
          </div>
          <div className="button-8 border rounded-lg px-3 py-4 text-center bg-white">
            <div className="icon-container bg-[#F0FDF4] w-fit p-1 rounded-full m-auto">
              <img src={icon3} alt="" />
            </div>
            <h1 className="text-[12px]">Apply Leave</h1>
          </div>
        </div>
      </div>
      {tint ? (
        <div className="delete-tint fixed h-full top-0 right-0 bottom-0 left-0 "></div>
      ) : (
        ""
      )}
      {openModal ? (
        <ApplyLeaveFormModal
          handleCloseModal={handleCloseModal}
          closeTheForm={closeTheForm}
        />
      ) : (
        ""
      )}

      {openApplyForm ? <PermissionApplyFormOne closeForm={closeForm} /> : ""}
    </>
  );
};

export default UserQuickAction;
