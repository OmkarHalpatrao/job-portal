import React from 'react';

const ListBox = ({ setSort }) => {
  const handleOptionClick = (sortOption) => {
    setSort(sortOption);
    // Additional logic related to sorting options if needed
  };

  return (
    <div>
      {/* Example of handling a click event for a sorting option */}
      <button onClick={() => handleOptionClick('Newest')}>
        Sort by Newest
      </button>
      <button onClick={() => handleOptionClick('Oldest')}>
        Sort by Newest
      </button>
      <button onClick={() => handleOptionClick('A-Z')}>
        Sort by A-Z
      </button>
      <button onClick={() => handleOptionClick('Z-A')}>
        Sort by Z-A
      </button>
      
    </div>
  );
};

export default ListBox;
