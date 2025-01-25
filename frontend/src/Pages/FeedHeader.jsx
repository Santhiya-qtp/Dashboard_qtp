import React from "react";

const FeedHeader = () => {
  return (
    <>
      <div className="main-container mt-4 flex items-center gap-3">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">
          Organization
        </button>
        <button className="border py-2 px-4 rounded-lg font-medium">Office</button>
      </div>
    </>
  );
};

export default FeedHeader;
