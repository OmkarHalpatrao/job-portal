import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall, FiEdit3, FiUpload } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { companies, jobs } from "../utils/data";
import { CustomButton, JobCard, Loading, TextInput } from "../components";
import { useForm } from 'react-hook-form';
import { apiRequest, handleFileUpload } from "../utils";
import { Login } from "../redux/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from 'bootstrap'; 
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';


const CompanyForm = ({ open, setOpen }) => {
  const { user } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
    } = useForm({ 
      mode: "onChange",
      defaultValues:{ ...user},
     });

     const dispatch = useDispatch();
     const [profileImage, setProfileImage] = useState("");
     const [uploadCv, setUploadCv] = useState("");
     const [isLoading, setIsLoading] = useState(false);
     const [errMsg, setErrMsg] = useState({ status: false})
     const navigate = useNavigate();
   
     const onSubmit = async (data) => {
      setIsLoading(true);
      
      try {
        const uri = profileImage && (await handleFileUpload(profileImage));
        const newData = uri ? { ...data, profileUrl: uri } : data;
        const res = await apiRequest({
          url: "/companies/update-company",
          token: user?.token,
          data: newData,
          method: "PUT",
        });
        setIsLoading(false);
    
        if (res.status === "failed") {
          setErrMsg({ ...res });
        } else {
          setErrMsg({ status: "success", message: res.message });
          dispatch(Login(newData));
          localStorage.setItem("userInfo", JSON.stringify(data));

           setTimeout(() => {
            window.location.reload();
           },1500);
        }
        // if (res) {
        //   const newData = { token: res?.token, ...res?.user };
        //   localStorage.setItem("companyInfo", JSON.stringify(res));
        //   navigate('/company-profile');
        // }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    // Function to fetch applicants for a selected job
  

    
   
     const closeModal = () => setOpen(false);
   
     return (
      <>
      {/* Button to open the modal */}
      {/* <button onClick={() => setOpen(true)}>Edit Company Profile</button> */}

      {/* Modal */}
      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={setOpen}>
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />

            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>

            <div className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
              <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900 mb-4">
                Edit Company Profile
              </Dialog.Title>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <TextInput
                  name="name"
                  label="Company Name"
                  type="text"
                  register={register('name', {
                    required: 'Company Name is required',
                  })}
                  error={errors.name ? errors.name?.message : ''}
                />

                <TextInput
                  name="location"
                  label="Location/Address"
                  placeholder="eg. California"
                  type="text"
                  register={register('location', {
                    required: 'Address is required',
                  })}
                  error={errors.location ? errors.location?.message : ''}
                />

                <div className="w-full flex gap-2">
                  <div className="w-1/2">
                    <TextInput
                      name="contact"
                      label="Contact"
                      placeholder="Phone Number"
                      type="text"
                      register={register('contact', {
                        required: 'Contact is required!',
                      })}
                      error={errors.contact ? errors.contact?.message : ''}
                    />
                  </div>

                  <div className="w-1/2 mt-2">
                    <label className="text-gray-600 text-sm mb-1">Company Logo</label>
                    <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-600 text-sm mb-1">About Company</label>
                  <textarea
                    className="rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 resize-none"
                    rows={4}
                    cols={6}
                    {...register('about', {
                      required: 'Write a little bit about your company.',
                    })}
                    aria-invalid={errors.about ? 'true' : 'false'}
                  ></textarea>
                  {errors.about && (
                    <span role="alert" className="text-xs text-red-500 mt-0.5">
                      {errors.about?.message}
                    </span>
                  )}
                </div>

                <div className="mt-4">
                  {isLoading ? (
                    <loading />
                  ) : (
                    <CustomButton
                      type="submit"
                      containerStyles="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-blue-700 hover:text-white focus:outline-none"
                      title="Submit"
                    />
                  )}
                </div>
              </form>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
     );
   };   

  

  

const CompanyProfile = () => {
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  const [info, setInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const companyInfo = user;

  const [applicants, setApplicants] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(''); // Track the selected job ID

  const fetchApplicants = async () => {
    try {
      const res = await apiRequest({
        url: `/companies/get-applicants/${selectedJobId}`, // Backend route to fetch applicants
        method: 'GET',
        // Include necessary authentication headers/token
      });
      if (res?.success) {
        setApplicants(res.data.applicants); // Assuming the response includes applicant details
      }
    } catch (error) {
      console.error(error);
      // Handle error scenarios
    }
  };

  // Function to handle clicking on the "Applicants" button
  const handleApplicantsClick = (jobId) => {
    setSelectedJobId(jobId);
    fetchApplicants();
  };



  const fetchCompany = async() => {
    setIsLoading(true);
    let id = null;
      if (params.id && params.id !== undefined)
      {
        id = params?.id;
      }
      else {
        id = user?._id;
      }
      try{
        const res = await apiRequest({
          url: "/companies/get-company/" + id,
          method: "GET",
        });

        setInfo(res?.data);
        setIsLoading(false);
      }catch(error){
        console.log(error);
        toast("Failed to load company info");
        setIsLoading(false);
      }
  }

  useEffect(() => {
      fetchCompany();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, []);

    if (isLoading) {
      return <Loading />;
    }

  return (
    <div className="container mx-auto p-5">
      <div className="">
        <div className="w-full flex flex-col md:flex-row gap-3 justify-between">
          <h2 className="text-gray-600 text-xl font-semibold">
            Welcome, {info?.name}
          </h2>

          {user?.user?.accountType === undefined && info?._id === user?._id && (
            <div className="flex items-center justify-center py-5 md:py-0 gap-4">
              <CustomButton
                onClick={() => setOpenForm(true)}
                iconRight={<FiEdit3 />}
                containerStyles="py-1.5 px-3 md:px-5 focus:outline-none bg-blue-600 hover:bg-blue-700 text-white rounded text-sm md:text-base border border-blue-600"
              />

              <Link to="/upload-job">
                <CustomButton
                  title="Upload Job"
                  iconRight={<FiUpload />}
                  containerStyles="text-blue-600 py-1.5 px-3 md:px-5 focus:outline-none rounded text-sm md:text-base border border-blue-600"
                />
              </Link>
            </div>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row justify-start md:justify-between mt-4 md:mt-8 text-sm">
          {/* ... other info ... */}
          <p className="flex gap-1 items-center px-3 py-1 text-slate-600 rounded-full">
            <HiLocationMarker /> {info?.location ?? "No Location"}
          </p>
          <p className="flex gap-1 items-center px-3 py-1 text-slate-600 rounded-full">
            <AiOutlineMail /> {info?.email ?? "No Email"}
          </p>
          <p className="flex gap-1 items-center px-3 py-1 text-slate-600 rounded-full">
            <FiPhoneCall /> {info?.contact ?? "No Contact"}
          </p>

          <div className="flex flex-col items-center mt-10 md:mt-0">
            <span className="text-xl">{info?.jobPosts?.length}</span>
            <p className="text-blue-600 ">Job Post</p>
          </div>
        </div>
      </div>

      <div className="w-full mt-20 flex flex-col gap-2">
        <p>Jobs Posted</p>

        <div className="flex flex-wrap gap-3">
          {info?.jobPosts?.map((job, index) => {
            const data = {
              name: info?.name,
              email: info?.email,
              logo: info?.profileUrl,
              ...job,
            };
            return <JobCard job={data} key={index} />;
          })}
        </div>
        <button onClick={() => handleApplicantsClick(selectedJobId)}>
        Applicants
      </button>
      {/* Display applicants */}
      <div className="applicant-list">
        {applicants.map((applicant) => (
          <div key={applicant._id}>
            <p>Name: {applicant.name}</p>
            <p>Email: {applicant.email}</p>
            {/* Display other applicant details */}
          </div>
        ))}
      </div>
      </div>

      <CompanyForm open={openForm} setOpen={setOpenForm} />
    </div>
  );
};

export default CompanyProfile;
