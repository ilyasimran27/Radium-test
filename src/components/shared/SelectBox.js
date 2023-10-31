import React from "react";

const SelectBox = ({ options, selectedValue, onChange }) => {
  return (
    <>
      <label htmlFor="titleSelect">Select a Title: </label>
      <select
        className="p-2 rounded border border-[#ccc] bg-white font text-sm"
        onChange={onChange}
        value={selectedValue}
      >
        <option value="All">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectBox;
