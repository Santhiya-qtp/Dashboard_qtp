import React from "react";
import Navbar from "../components/Navbar";
import MyTeamStatCard from "../components/MyTeamStatCard";
import MyTeamTable from "../components/MyTeamTable";

const MyTeam = () => {
  return (
    <>
      <div className="main-container">
        <Navbar />
        <MyTeamStatCard />
        <MyTeamTable />
      </div>
    </>
  );
};

export default MyTeam;
