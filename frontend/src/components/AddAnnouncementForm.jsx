import React, { useState } from "react";
import close from "../assets/close-icon.svg";
import { useActionState } from "react";
const AddAnnouncementForm = ({ openForm, setOpenForm }) => {
  //  states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null); // State for the file

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Store the selected file
    console.log("Selected file: ", e.target.files[0]);
  };

  // Handle file removal
  const handleRemoveFile = () => {
    setFile(null); // Clear the selected file
  };
  return (
    <>
      <div className="main-container fixed top-[10%] left-[50%] translate-x-[-50%] bg-white w-[90%] sm:w-[80%] lg:w-[60%] z-[400] rounded-lg transition-all duration-300">
        <div className="header flex items-center justify-between pb-3 border-bottom px-3 py-3">
          <h1 className="text-lg font-semibold">Add New Announcement</h1>
          <div
            onClick={() => {
              setOpenForm(false);
            }}
            className="icon-container w-fit rounded-full bg-gray-300 p-2 cursor-pointer"
          >
            <img src={close} className="" />
          </div>
        </div>
        <div className="input-section p-3">
          <h1 className="font-medium">Annoucement Title</h1>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            className="text-md border outline-none border-gray-600 w-[100%] mt-1 py-2 px-2 rounded-md"
          />
          <h1 className="mt-4 font-medium">Detailed Description</h1>
          <textarea
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="text-md w-[100%] border border-gray-600 outline-none mt-1 p-2 rounded-lg "
          ></textarea>
          <h1 className="font-medium mt-4">Attach Files</h1>

          <div className="w-full p-4 border-dashed border-2 border-gray-300 rounded-md text bg-gray-50 mt-1 ">
            {!file ? (
              <div className="flex flex-col items-center">
                <div className="text-gray-400 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16l4-4m0 0l4 4m-4-4v12m5-5.4a5.1 5.1 0 01-3.5-8.6M16.5 5.9a5.1 5.1 0 013.5 8.6m-4.2 5.4H5.7a5.1 5.1 0 010-10.2"
                    />
                  </svg>
                </div>
                <p className="text-gray-500">
                  Drag & drop files or{" "}
                  <span className="text-blue-600 cursor-pointer hover:underline">
                    Browse
                  </span>
                </p>
                <input
                  type="file"
                  onChange={handleFileChange} // Call handleFileChange
                  className="absolute  opacity-0 w-[90%] h-[18%] cursor-pointer"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <p className="text-gray-700 mb-2 font-medium">
                  {file.name} ({(file.size / 1024).toFixed(2)} KB)
                </p>
                <button
                  onClick={handleRemoveFile}
                  className="border font-medium px-4 py-2 rounded-lg text-red-600 border-red-500 hover:bg-red-100"
                >
                  Cancel File
                </button>
              </div>
            )}
          </div>
          <div className="footer mt-4 flex items-center justify-end gap-3">
            <button onClick={()=>{setOpenForm(false)}} className="border font-medium px-4 py-2 rounded-lg">
              cancel
            </button>
            <button className="border font-medium px-6 py-2 text-white bg-blue-600 rounded-lg">
              Post
            </button>
          </div>
        </div>
      </div>
      <div className="basic_tint fixed top-0 right-0 bottom-0 left-0 z-[300]"></div>
    </>
  );
};

export default AddAnnouncementForm;
