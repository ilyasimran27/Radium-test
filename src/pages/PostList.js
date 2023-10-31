// src/components/PostList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../components/Table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        const uniqueTitles = [
          ...new Set(response.data.map((item) => item.title)),
        ];
        setTitles(uniqueTitles);
        setPosts(response.data);
      })
      .catch((error) => {
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">List of Posts</h1>
      <Table data={posts} titles={titles} source={"post"} />
      <ToastContainer />
    </div>
  );
};

export default PostList;
