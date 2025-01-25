import React from "react";
import close from "../assets/close-icon.svg";
import { useState, useEffect } from "react";
import landscape from "../assets/landscape.avif";
import comment_icon from "../assets/comment_icon.svg";
import like_icon from "../assets/like_icon.png";
const AnnouncementSlidrer = ({
  setOpenAnnouncementSidebar,
  announcementDetails,
  openAnnouncementSidebar,
}) => {
  console.log("Announcement details : ", announcementDetails);
  const [isAnimating, setIsAnimating] = useState(false);

  // Trigger animation when component is rendered
  useEffect(() => {
    if (openAnnouncementSidebar) {
      setIsAnimating(true); // Start animation
    }
  }, [openAnnouncementSidebar]);
  return (
    <>
      <div
        className={`main-container w-[50%] bg-white h-[100%] absolute top-0 right-0 z-[300] shadow-lg transform transition-transform duration-200  ${
          isAnimating ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="header flex justify-between p-4">
          <h1 className="text-lg font-medium">{announcementDetails.title}</h1>
          <div className="close-section">
            <div
              onClick={() => {
                setOpenAnnouncementSidebar(false);
              }}
              className="icon-container bg-gray-200 p-2 rounded-full w-fit cursor-pointer"
            >
              <img src={close} alt="" />
            </div>
          </div>
        </div>
        <div className="content-container px-4 ">
          <img src={landscape} className="w-[100%] h-[189px] rounded-lg" />
          <div
            className={`content mt-2 px-2 announcement-section overflow-auto ${
              announcementDetails.description.length > 200
                ? "min-h-[180px] max-h-[240px]"
                : "min-h-auto"
            }`}
          >
            <p className="text-md mt-1 text-gray-600 text-justify">
              {announcementDetails.description}
            </p>
          </div>
        </div>
        <div className="footer px-6 mt-6 ">
          <div className="header flex items-center justify-between">
            <h1 className="text-sm text-gray-700">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim
              odio
            </h1>
            <button className="bg-blue-600 px-3 text-white font-medium py-1 rounded-md">
              Acknowledge
            </button>
          </div>
          <div className="like-comment-section mt-2 flex gap-4 items-center">
            <button className="flex items-center gap-2">
              <img src={like_icon} className="w-5" /> <span>1k</span>
            </button>
            <button className="flex items-center gap-2">
              <img src={comment_icon} className="w-5" /> <span>1k</span>
            </button>
          </div>
        </div>
      </div>
      <div className="announcement-tint basic_tint absolute top-0 left-0 right-0 bottom-0 z-[200]"></div>
    </>
  );
};

export default AnnouncementSlidrer;
