import { useState, useRef,useEffect } from "react";
import { BsCheck2, BsChevronExpand } from "react-icons/bs";

const options = ["Newest", "Oldest", "A-Z", "Z-A"];

const ListBox = ({ sort, setSort }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (selectedOption) => {
    setSort(selectedOption);
    setIsOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  // Add an event listener to close the dropdown when clicking outside
  // This is optional and can be adjusted based on your specific requirements
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className='w-[8rem] md:w-[10rem]' ref={dropdownRef}>
      <div className='relative mt-1'>
        <button
          onClick={toggleDropdown}
          className={
            "relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
          }
        >
          <span className='block truncate'>{sort}</span>

          <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
            <BsChevronExpand
              className='h-5 w-5 text-gray-500'
              aria-hidden='true'
            />
          </span>
        </button>

        {isOpen && (
          <div className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {options.map((op, index) => (
              <div
                key={index}
                onClick={() => handleOptionClick(op)}
                className={`relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                  sort === op
                    ? "bg-[#1d4fd830] text-[#1d4ed8]"
                    : "text-gray-900"
                }`}
              >
                <span className={`block truncate`}>{op}</span>
                {sort === op && (
                  <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-[#1d4ed8]'>
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

export default ListBox;
