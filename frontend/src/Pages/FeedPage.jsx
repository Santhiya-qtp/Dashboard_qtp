import React from "react";
import Navbar from "../components/Navbar";
import FeedHeader from "./FeedHeader";
import LatestAnnouncement from "../components/LatestAnnouncement";
import FeedSection from "../components/FeedSection";
import UpcomingEvents from "../components/UpcomingEvents";

const FeedPage = () => {
  return (
    <>
      <div className="main-container">
        <Navbar />
        <FeedHeader />
        <div className="content-container grid grid-cols-12 gap-3">
          <LatestAnnouncement />
          <FeedSection />
          <UpcomingEvents />
        </div>
      </div>
    </>
  ); 
};

export default FeedPage;
