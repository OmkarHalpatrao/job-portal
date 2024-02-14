import React, { useState } from "react";
import { BsCheck2, BsChevronExpand } from "react-icons/bs";

const types = ["Full-Time", "Part-Time", "Contract", "Intern"];

const JobTypes = ({ jobTitle, setJobTitle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (type) => {
    setJobTitle(type);
    setIsOpen(false);
  };

  return (
    <div className='w-full'>
      <div className='relative'>
        <button
          onClick={handleToggle}
          className='relative w-full cursor-default rounded bg-white py-2.5 pl-3 pr-10 text-left focus:outline-none border border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm'
        >
          <span className='block truncate'>{jobTitle}</span>
          <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
            <BsChevronExpand className='h-5 w-5 text-gray-500' aria-hidden='true' />
          </span>
        </button>

        {isOpen && (
          <div className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {types.map((type, index) => (
              <div
                key={index}
                onClick={() => handleSelect(type)}
                className={`relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                  jobTitle === type ? "bg-amber-100 text-amber-900 font-medium" : "text-gray-900"
                }`}
              >
                <span className='block truncate'>{type}</span>
                {jobTitle === type && (
                  <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                    <BsCheck2 className='h-5 w-5' aria-hidden='true' />
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobTypes;
