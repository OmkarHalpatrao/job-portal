import express, { Router } from "express";
import { rateLimit } from "express-rate-limit";


import {
  getCompanies,
  getCompanyById,
  getCompanyJobListing,
  getCompanyProfile,
  updateCompanyProfile,
  register,
  getApplicantsForJob,
  signIn
} from "../controllers/companiesController.js";
import userAuth from "../middlewares/authMiddleware.js";

const router = express.Router();

//ip rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// REGISTER
router.post("/register", limiter, register);

// LOGIN
router.post("/login", limiter, signIn);

// GET DATA
router.post("/get-company-profile", userAuth, getCompanyProfile);
router.post("/get-company-joblisting", userAuth, getCompanyJobListing);
router.get("/", getCompanies);
router.get("/get-company/:id", getCompanyById);

// UPDATE DATA
router.put("/update-company", userAuth, updateCompanyProfile);

// router.get("/get-applicants/:jobId", userAuth, async (req, res) => {
//   try {
//     const jobId = req.params.jobId;
//     // Logic to fetch applicants based on the jobId
//     // Example: query the database to get applicants for the specified job ID

//     // Replace this with your logic to fetch applicants
//     const applicants = await fetchApplicantsByJobId(jobId); // Replace with your actual logic

//     res.status(200).json({ success: true, data: { applicants } });
//   } catch (error) {
//     res.status(500).json({ success: false, error: "Failed to fetch applicants" });
//   }
// });

router.get("/get-applicants/:jobId", userAuth, getApplicantsForJob);


export default router;
