import React, { useState } from "react";

const SearchBox = ({ onSearch, searchText, setSearchText }) => {
  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        type="text"
        placeholder="Search..."
        className="px-3 py-2 border rounded-lg focus:outline-none"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBox;
