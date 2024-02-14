import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
import  {Twitter, signup}  from "../assets";
import SignUp from "../components/SignUp";
import { Toaster } from "react-hot-toast";




const Auth = () => {
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // const destinationPath = location?.state?.from?.pathname || "/";

  // if (user.token) {
    
  //   return navigate(destinationPath);
  // }
  let from = location?.state?.from?.pathname || "/";

  if (user.token) {
    return navigate(from);
  }

  

  
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className="flex flex-col">
      <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] justify-center items-center text-richblack-5">Join the millions to find the Dream Job.</h1>
      <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
      <span className="text-richblack-100">Build skills for today, tomorrow, and beyond.</span>
      </p>
      <span className="font-edu-sa font-bold italic text-blue-500">Education to future-proof your career.</span>
      <img src={signup} alt='Office' className='object-contain ' />
      </div>


      <SignUp open={open} setOpen={setOpen} />
      <Toaster/>
    </div>
  );
};

export default Auth;
