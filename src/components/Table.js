import React, { useState, useEffect } from "react";
import SelectBox from "./shared/SelectBox";
import SearchBox from "./shared/SearchBox";

const Table = ({ data, titles, source }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [clickCount, setClickCount] = useState(0);
  const [selectedTitle, setSelectedTitle] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const ascendingIcon = "🔽";
  const descendingIcon = "🔼";
  const noSortIcon = "☰";

  useEffect(() => {
    if (selectedTitle === "All") {
      setFilteredData(data);
    } else {
      const newFilteredData = data.filter(
        (item) =>
          item?.title?.toLowerCase() === selectedTitle?.toLowerCase() ||
          item?.name?.toLowerCase() === selectedTitle?.toLowerCase()
      );
      setFilteredData(newFilteredData);
    }
    setSearchText("");
  }, [selectedTitle, data]);

  const requestSort = (key) => {
    if (sortConfig.key === key) {
      if (clickCount >= 2) {
        setSortConfig({ key: null, direction: "asc" });
        setClickCount(0);
      } else {
        const direction = sortConfig.direction === "asc" ? "desc" : "asc";
        setSortConfig({ key, direction });
        setClickCount(clickCount + 1);
      }
    } else {
      setSortConfig({ key, direction: "asc" });
      setClickCount(1);
    }
  };

  const handleSearch = () => {
    const searchLower = searchText.toLowerCase();
    const newFilteredData = data.filter((item) => {
      const titleIncludesSearch =
        item?.title?.toLowerCase().includes(searchLower) ||
        item?.name?.toLowerCase().includes(searchLower);
      const bodyIncludesSearch = item?.body
        ?.toLowerCase()
        .includes(searchLower);
      return titleIncludesSearch || bodyIncludesSearch;
    });

    setFilteredData(newFilteredData);
    setSelectedTitle("All");
  };

  const sortedData = filteredData.concat().sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col items-center justify-center">
          <SearchBox
            onSearch={handleSearch}
            searchText={searchText}
            setSearchText={setSearchText}
          />
        </div>
        <div className="flex flex-col items-center justify-center mb-[22px]">
          <SelectBox
            options={titles}
            selectedValue={selectedTitle}
            onChange={(e) => setSelectedTitle(e.target.value)}
          />
        </div>
      </div>
      <table className="table-auto w-full mt-8">
        <thead>
          <tr>
            <th
              className="cursor-pointer w-[30%]"
              onClick={() => {
                source === "post" ? requestSort("title") : requestSort("name");
              }}
            >
              Title{" "}
              {sortConfig.key === "title" || sortConfig.key === "name"
                ? sortConfig.direction === "asc"
                  ? ascendingIcon
                  : descendingIcon
                : noSortIcon}
            </th>
            <th
              className="cursor-pointer w-[60%]"
              onClick={() => requestSort("body")}
            >
              Body
              {sortConfig.key === "body"
                ? sortConfig.direction === "asc"
                  ? ascendingIcon
                  : descendingIcon
                : noSortIcon}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index}>
              <td>{item.title || item.name}</td>
              <td>{item.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
