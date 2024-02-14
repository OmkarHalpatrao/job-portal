import mongoose from "mongoose";
import Users from "../models/userModel.js";
import {toast} from "react-hot-toast"
import JobApplications from "../models/JobApplications.js";

export const updateUser = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    contact,
    location,
    profileUrl,
    jobTitle,
    about,
  } = req.body;

  try {
    if (!firstName || !lastName || !email || !contact || !jobTitle || !about) {
      next("Please provide all required fields");
    }

    const id = req.body.user.userId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No User with id: ${id}`);
    }

    const updateUser = {
      firstName,
      lastName,
      email,
      contact,
      location,
      profileUrl,
      jobTitle,
      about,
      _id: id,
    };

    const user = await Users.findByIdAndUpdate(id, updateUser, { new: true });

    const token = user.createJWT();

    user.password = undefined;

    res.status(200).json({
      sucess: true,
      message: "User updated successfully",
      user,
      token,
    });
    toast("User Profile updated successfully")
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getUser = async (req, res, next) => {
  try {
    const id = req.body.user.userId;

    const user = await Users.findById({ _id: id });

    if (!user) {
      return res.status(200).send({
        message: "User Not Found",
        success: false,
      });
    }

    user.password = undefined;

    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "auth error",
      success: false,
      error: error.message,
    });
  }
};

export const applyForJob = async (req, res, next) => {
  try {
    const { jobId, name, email, contact, resume, coverLetter } = req.body;

    const jobApplication = new JobApplications({
      jobId,
      name,
      email,
      contact,
      resume,
      coverLetter,
    });

    const savedApplication = await jobApplication.save();

    // Update the job model to associate the application with the job
    const newApplication = await JobApplications.create(savedApplication);

    // Update the job's applicants count and push the new application ID to the applications array
    await Jobs.findByIdAndUpdate(jobId, {
      $inc: { applicants: 1 }, // Increment the applicants count by 1
      $push: { applications: savedApplication._id }, // Add the new application ID to the applications array
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application: savedApplication,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to apply for job" });
  }
};


