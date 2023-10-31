// src/components/TodoList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import SortTable from "../components/SortTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CommentList = () => {
  const [todos, setTodos] = useState([]);
  const [names, setNames] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((response) => {
        const uniqueNames = [
          ...new Set(response.data.map((item) => item.name)),
        ];
        setNames(uniqueNames);
        setTodos(response.data);
      })
      .catch((error) => {
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">List of Comments</h1>
      <SortTable data={todos} titles={names} source={"comment"} />
      <ToastContainer />
    </div>
  );
};

export default CommentList;
