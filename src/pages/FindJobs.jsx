import { useState,useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { BiBriefcaseAlt2 } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import Header from "../components/Header";
import { experience, jobTypes, jobs } from "../utils/data";
import Loading from "../components/Loading";
import CustomButton from "../components/CustomButton";
import JobCard from "../components/JobCard";
import ListBox from "../components/ListBox";
import Testimonials from "./Testimonials";
import { useSelector } from "react-redux";
import { apiRequest,updateURL } from "../utils";


const FindJobs = () => {
  const { user } = useSelector((state) => state.user);
  const [sort, setSort] = useState("Newest");
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(1);
  const [recordCount, setRecordCount] = useState(0);
  const [data, setData] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [filterJobTypes, setFilterJobTypes] = useState([]);
  const [filterExp, setFilterExp] = useState([]);
  const [recentPost, setRecentPost] = useState([]);
  const [expVal, setExpVal] = useState([]);
  
  
  const [isFetching, setIsFetching] = useState(false);
  console.log("find job component")
  
  const location = useLocation();
  const navigate = useNavigate();

  const filterJobs = (val) => {
    if (filterJobTypes.includes(val)) {
      setFilterJobTypes(filterJobTypes.filter((el) => el !== val));
    } else {
      setFilterJobTypes([...filterJobTypes, val]);
    }
  };
  
  const filterExperience = async (e) => {
    if(expVal.includes(e)){
      setExpVal(expVal.filter((el => el !== e)));
    }else{
      setExpVal([...expVal, e]);
    }
  };

  const handleSort = (sortOption) => {
    setSort(sortOption); // Update the sort state based on the selected option
    // You can include additional logic here based on the selected sorting option
  };

  const fetchJobs = async() => {
    setIsFetching(true);


    const newURL = updateURL({
      pageNum:page,
      query: searchQuery,
      cmpLoc: jobLocation,
      sort: sort,
      navigate: navigate,
      location: location,
      jType: filterJobs,
      exp: filterExp,
    });

    try{
      const res = await apiRequest({
        url: "/jobs" + newURL,
        method:"GET",
      });

      setNumPage(res?.numofPage);
      setRecordCount(res?.totalJobs);
      setData(res?.data);

      setIsFetching(false);
    }
    catch(error){

    }
  }
  

    const handleSearchSubmit = async (e) => {
      e.preventDefault();
      await fetchJobs();
    };

    const handleShowMore = async (e) => {
      e.preventDefault();
      setPage((prev) => prev +1); 
    };

  useEffect(() => {
        if(expVal.length > 0) {
          let newExpVal = [];

          expVal?.map((el) => {
            const newE1 = el?.split("-");
            newExpVal.push(Number(newE1[0]), Number(newE1[1]))
          });

          newExpVal?.sort((a,b) => a-b);

          setFilterExp(`${newExpVal[0]}-${newExpVal[newExpVal?.length -1]}`);
        }
  },[expVal]);

  useEffect(() => {
    fetchJobs();
  },[sort, filterJobTypes, filterExp, page]);

  const getRecentPost = async() => {
    try {
      const id = user?.id;

      const res = await apiRequest({
        url: "companies/get-company/" + id,
        method: "GET",

      });
      setRecentPost(res?.data?.jobPosts);
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect( () => {
    getRecentPost();

    
  },[recentPost,]);

  return (
    <div>
      <Header
        title='Find Your Dream Job with Ease'
        type='home'
        handleClick= {handleSearchSubmit}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        location={jobLocation}
        setLocation={setJobLocation}
      />

      <div className='container mx-auto flex gap-6 2xl:gap-10 md:px-5 py-0 md:py-6 bg-[#f7fdfd]'>
        <div className='hidden md:flex flex-col w-1/6 h-fit bg-white shadow-sm'>
          <p className='text-lg font-semibold text-slate-600'>Filter Search</p>

          <div className='py-2'>
            <div className='flex justify-between mb-3'>
              <p className='flex items-center gap-2 font-semibold'>
                <BiBriefcaseAlt2 />
                Job Type
              </p>

              <button>
                <MdOutlineKeyboardArrowDown />
              </button>
            </div>

            <div className='flex flex-col gap-2'>
              {jobTypes.map((jtype, index) => (
                <div key={index} className='flex gap-2 text-sm md:text-base '>
                  <input
                    type='checkbox'
                    value={jtype}
                    className='w-4 h-4'
                    onChange={(e) => filterJobs(e.target.value)}
                  />
                  <span>{jtype}</span>
                </div>
              ))}
            </div>
          </div>

          <div className='py-2 mt-4'>
            <div className='flex justify-between mb-3'>
              <p className='flex items-center gap-2 font-semibold'>
                <BsStars />
                Experience
              </p>

              <button>
                <MdOutlineKeyboardArrowDown />
              </button>
            </div>

            <div className='flex flex-col gap-2'>
              {experience.map((exp) => (
                <div key={exp.title} className='flex gap-3'>
                  <input
                    type='checkbox'
                    value={exp?.value}
                    className='w-4 h-4'
                    onChange={(e) => filterExperience(e.target.value)}
                  />
                  <span>{exp.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='w-full md:w-5/6 px-5 md:px-0'>
          <div className='flex items-center justify-between mb-4'>
            <p className='text-sm md:text-base'>
              Shwoing: <span className='font-semibold'>{recordCount}</span> Jobs
              Available
            </p>

            <div className='flex flex-col md:flex-row gap-0 md:gap-2 md:items-center'>
              <p className='text-sm md:text-base'>Sort By:</p>

            <ListBox sort={sort} setSort={setSort} /> 
            </div>
          </div>

          <div className='w-full flex flex-wrap gap-4'>
            {data?.map((job, index) => {
              const newJob = {
                name: job?.company?.name,
                logo: job?.company?.profileUrl,
                ...job,
              };
              
              return <JobCard job={newJob} key={index} />;
            }
             )}
          </div>

          {isFetching && (
            <div className="py-10">
              <Loading />
            </div>
          )}

          {numPage > page && !isFetching && (
            <div className='w-full flex items-center justify-center pt-16'>
              <CustomButton
                onclick={handleShowMore}
                title='Load More'
                containerStyles={`text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600`}
              />
            </div>
          )}
        </div>
      </div>
      {/* <div className='w-full md:w-1/3 2xl:2/4 p-5 mt-20 md:mt-0'>
        <p className='text-xl font-semibold mb-4'>Recent Job Post</p>

        
        {recentPost && recentPost.length > 0 && (
          <div className='w-full flex flex-row  gap-6'>
            {recentPost.slice(0, 5).map((job, index) => {
              return <JobCard job={recentPost} key={index} />; // Use 'job' instead of 'data'
            })}
          </div>

        )}  
      </div> */}
      {/* <div>
        <Testimonials />
      </div> */}
      
    </div>
  );
};

export default FindJobs;
