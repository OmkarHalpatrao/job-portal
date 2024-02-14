import mongoose, { Schema } from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
    {
      jobId: { type: Schema.Types.ObjectId, ref: "Jobs" },
      name: String,
      email: String,
      contact: String,
      // resume: String, // or another suitable type to store file paths
      
      // other fields as needed
    },
    { timestamps: true }
  );
  
  const JobApplications = mongoose.model("JobApplications", jobApplicationSchema);
  export default JobApplications;
  