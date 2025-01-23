import React from "react";
import Navbar from "./components/Navbar";
import EmployeeDetails from "./components/EmployeeDetails";
import MyDetails from "./Pages/MyDetails";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import AdminDashboard from "./Pages/AdminDashboard";

import EditForm from "./components/EditForm";
import ForgotPassword from "./components/ForgotPassword";
import EnterOtp from "./components/EnterOtp";
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./Pages/Dashboard";
import SignUp from "./components/SignUp";
import AdminLeaveRequest from "./Pages/AdminLeaveRequests";
import UserRequest from "./Pages/UserRequest";
import Permission from "./Pages/Permission";
import PermissionRequest from "./Pages/PermissionRequest";
import OrganizationDetails from "./Pages/OrganizationDetails";
import MyTeam from "./Pages/MyTeam";
import OrgChart from "./components/OrgChart";
import AddEmployee from "./Pages/AddEmployee";
import ProfilePage from "./Pages/ProfilePage";
const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <LoginForm />
            </>
          }
        ></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
        <Route path="/enterOtp" element={<EnterOtp />}></Route>
        <Route path="/re-enterPassword" element={<ResetPassword />}></Route>
      </Routes>
      <div className="main-container mt-2  sm:mt-2 mx-4 sm:mx-[40px]">
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />}></Route>
          <Route path="/MyDetails" element={<MyDetails />}></Route>
          <Route path="/AdminDashboard" element={<AdminDashboard />}></Route>
          <Route path="/employeeDetails" element={<EmployeeDetails />}></Route>
          <Route path="/OrgChart" element={<OrgChart />}></Route>
          <Route path="/profile/:id" element={<ProfilePage />}></Route>
          {/* <Route path="/AddEmployee" element={<AddEmployee/>}></Route> */}
          <Route
            path="AdminLeaveRequests"
            element={<AdminLeaveRequest />}
          ></Route>
          <Route path="/UserRequest" element={<UserRequest />}></Route>
          <Route path="/permissions" element={<Permission />}></Route>
          <Route
            path="/permissionRequest"
            element={<PermissionRequest />}
          ></Route>
          <Route
            path="/organizationDetails"
            element={<OrganizationDetails />}
          ></Route>
          <Route path="/myTeam" element={<MyTeam />}></Route>
        </Routes>

        {/* <EditForm/> */}
      </div>
    </>
  );
};

export default App;
