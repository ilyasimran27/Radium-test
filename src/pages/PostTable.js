// src/components/PostTable.js
import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';

const PostTable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Body',
        accessor: 'body',
      },
    ],
    []
  );

  const {
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  return (
    <table className="table-auto w-full">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                className="p-2 cursor-pointer"
              >
                {column.render('Header')}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr className="odd:bg-gray-200">
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} className="p-2">
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

// import React, { useState, useEffect } from "react";
// import SelectBox from "./shared/SelectBox";
// const SortTable = ({ data, titles, source }) => {
//   const [listData, setListData] = useState([]);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
//   const [clickCount, setClickCount] = useState(0);
//   const [selectedTitle, setSelectedTitle] = useState("All");
//   const ascendingIcon = "🔽";
//   const descendingIcon = "🔼";
//   const noSortIcon = "☰";

//   useEffect(() => {
//     setListData(data);
//   }, [data]);

//   const requestSort = (key) => {
//     let sortedConfig = { ...sortConfig };
//     if (sortConfig.key === key) {
//       if (clickCount >= 2) {
//         sortedConfig = { key: null, direction: "asc" };

//         setClickCount(0);
//       } else {
//         const direction = sortConfig.direction === "asc" ? "desc" : "asc";
//         sortedConfig = { key, direction };

//         setClickCount(clickCount + 1);
//       }
//     } else {
//       sortedConfig = { key, direction: "asc" };

//       setClickCount(1);
//     }
//     const sortedData = listData.concat().sort((a, b) => {
//       if (a[sortedConfig.key] < b[sortedConfig.key]) {
//         return sortedConfig.direction === "asc" ? -1 : 1;
//       }
//       if (a[sortedConfig.key] > b[sortedConfig.key]) {
//         return sortedConfig.direction === "asc" ? 1 : -1;
//       }
//       return 0;
//     });
//     console.log("sorted config===>", sortedConfig);
//     // console.log("sorted data",sortedData)
//     setListData(sortedData);
//     setSortConfig(sortedConfig);
//   };

//   const selectionFilter = (value) => {
//     const filteredData =
//       value === "All"
//         ? data
//         : data
//             .concat()
//             .filter((item) => item.title === value || item.name === value);
//     setSelectedTitle(value);
//     setListData(filteredData);
//   };

//   return (
//     <div>
//       <div className="flex flex-col items-center justify-center">
//         <label htmlFor="titleSelect">Select a Title: </label>
//         <SelectBox
//           options={titles}
//           selectedValue={selectedTitle}
//           onChange={(e) => {
//             selectionFilter(e.target.value);
//           }}
//         />
//       </div>
//       <table className="table-auto w-full mt-8">
//         <thead>
//           <tr>
//             <th
//               className="cursor-pointer w-[30%]"
//               onClick={() => {
//                 source === "post" ? requestSort("title") : requestSort("name");
//               }}
//             >
//               Title{" "}
//               {sortConfig.key === "title" || sortConfig.key === "name"
//                 ? sortConfig.direction === "asc"
//                   ? ascendingIcon
//                   : descendingIcon
//                 : noSortIcon}
//             </th>
//             <th
//               className="cursor-pointer w-[60%]"
//               onClick={() => requestSort("body")}
//             >
//               Body
//               {sortConfig.key === "body"
//                 ? sortConfig.direction === "asc"
//                   ? ascendingIcon
//                   : descendingIcon
//                 : noSortIcon}
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {listData.map((item, index) => (
//             <tr key={index}>
//               <td>{item.title || item.name}</td>
//               <td>{item.body}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SortTable;


export default PostTable;
