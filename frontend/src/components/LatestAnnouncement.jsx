import React, { useState } from "react";
import plus_icon from "../assets/plus_icon.svg";
import post_img from "../assets/post_img.png";
import profile_img from "../assets/profile_img.png";
import AnnouncementSlidrer from "./AnnouncementSlidrer";
const LatestAnnouncement = () => {
  const [openAnnouncementSidebar, setOpenAnnouncementSidebar] = useState(false);
  const [announcementDetails, setAnnouncementDetails] = useState(null);
  const card_data = [
    {
      title: "Lorem ispum text",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting dummy text ever since the 1500s..Lorem Ipsum is simply dummy text of the printing and typesetting dummy text ever since the 1500s.. Lorem Ipsum is simply dummy text of the printing and typesetting dummy text ever since the 1500s.. Lorem Ipsum is simply dummy text of the printing and typesetting dummy text ever since the 1500s.. Lorem Ipsum is simply dummy text of the printing and typesetting dummy text ever since the 1500s.. Lorem Ipsum is simply dummy text of the printing and typesetting dummy text ever since the 1500s.. Lorem Ipsum is simply dummy text of the printing and typesetting dummy text ever since the 1500s.. Lorem Ipsum is simply dummy text of the printing and typesetting dummy text ever since the 1500s.. Lorem Ipsum is simply dummy text of the printing and typesetting dummy text ever since the 1500s.. Lorem Ipsum is simply dummy text of the printing and typesetting dummy text ever since the 1500s.. Lorem Ipsum is simply dummy text of the printing and typesetting dummy text ever since the 1500s.. Lorem Ipsum is simply dummy text of the printing and typesetting dummy text ever since the 1500s.. Lorem Ipsum is simply dummy text of the printing and typesetting dummy text ever since the 1500s.. Lorem Ipsum is simply dummy text of the printing and typesetting dummy text ever since the 1500s.. Lorem Ipsum is simply dummy text of the printing and typesetting dummy text ever since the 1500s.. Lorem Ipsum is simply dummy text of the printing and typesetting dummy text ever since the 1500s.. Lorem Ipsum is simply dummy text of the printing and typesettiLorem Ipsum is simply dummy text of the printing and typesetting dummy text ever since the 1500s.. Lorem Ipsum is simply dummy text of the printing and typesettiLorem Ipsum is simply dummy text of the printing and typesettiLorem Ipsum is simply dummy text of the printing and typesetting dummy text ever since the 1500s.. ng dummy text ever since the 1500s.. ng dummy text ever since the 1500s.. ng dummy text ever since the 1500s..",
      post_img: post_img,
      profile_img: profile_img,
      postedData: "01 july 2024",
      name: "Surya chandran",
    },
    {
      title: "Lorem ispum text",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      post_img: post_img,
      profile_img: profile_img,
      postedData: "01 july 2024",
      name: "Surya chandran",
    },
    {
      title: "Lorem ispum text",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      post_img: post_img,
      profile_img: profile_img,
      postedData: "01 july 2024",
      name: "Surya chandran",
    },
    {
      title: "Lorem ispum text",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      post_img: post_img,
      profile_img: profile_img,
      postedData: "01 july 2024",
      name: "Surya chandran",
    },
  ];
  function handleOpenSidebar(item) {
    setAnnouncementDetails(item);
    setOpenAnnouncementSidebar(true);
  }
  return (
    <>
      <div className="main-container mt-4 rounded-lg col-span-3 py-2 border h-[75vh] overflow-auto hide-scrollbar">
        <div className="header flex items-center justify-between px-2 pb-3 border-bottom">
          <h1 className="font-medium text-lg">Latest Announcement</h1>
          <div className="add-announcement-icon bg-blue-600 w-fit p-2 rounded-sm">
            <img src={plus_icon} alt="" />
          </div>
        </div>
        <div className="announcement-container mt-2 p-2 h-[90%] hide-scrollbar overflow-auto space-y-2">
          {card_data.map((item) => {
            return (
              <div
                onClick={() => handleOpenSidebar(item)}
                className="card rounded-lg border py-2 px-1 cursor-pointer"
              >
                <div className="card-header border-bottom pb-2">
                  <div className="header flex  gap-3">
                    <img
                      src={item.post_img}
                      className="w-[100px] object-fit rounded-lg "
                    />
                    <div className="content  ">
                      <h1>{item.title}</h1>
                      <p className="text-[12px] text-gray-600 mt-2">
                        {item.description.slice(0, 70)}...
                      </p>
                    </div>
                  </div>
                </div>
                <div className="profile-section mt-2 flex items-center justify-between">
                  <div className="header flex items-center gap-2">
                    <img src={item.profile_img} className="w-[30px]" />
                    <h1 className="text-sm">{item.name}</h1>
                  </div>
                  <h1 className="text-[12px] text-gray-700">
                    {item.postedData}
                  </h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {openAnnouncementSidebar ? (
        <AnnouncementSlidrer
          setOpenAnnouncementSidebar={setOpenAnnouncementSidebar}
          announcementDetails={announcementDetails}
          openAnnouncementSidebar={openAnnouncementSidebar}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default LatestAnnouncement;
