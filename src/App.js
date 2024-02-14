import "./App.css";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.jsx";

import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Auth,
  Companies,
  CompanyProfile,
  FindJobs,
  JobDetail,
  UploadJob,
  Userprofile,
  About,
} from "./pages";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";

function App() {
  
  const { user } = useSelector((state) => state.user);
  console.log("app render");

  return (
    <main className='bg-[#f7fdfd]'>
      <Navbar />
      <Routes>
        <Route path='*' element={<Navigate to='/find-jobs' replace={true} />} />
        <Route path='/find-jobs' element={<FindJobs />} />
        <Route path='/companies' element={<Companies />} />
        <Route
          path={
            user?.accountType === "seeker"
              ? "/user-profile"
              : "/user-profile/:id"
          }
          element={<Userprofile />}
        />
        <Route path={"/company-profile"} element={<CompanyProfile />} />
        <Route path={"/company-profile/:id"} element={<CompanyProfile />} />
        <Route path={"/upload-job"} element={<UploadJob />} />
        <Route path={"/job-detail/:id"} element={<JobDetail />} />
        <Route path='/about-us' element={<About />} />
        <Route path='/user-auth' element={<Auth />} />
      </Routes>
      {user && <Footer />}
      <ToastContainer/>
    </main>
  );
}

export default App;
