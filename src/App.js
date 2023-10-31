// App.js
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import PostList from "./pages/PostList";
import CommentList from "./pages/CommentList";

function App() {
  const location = useLocation();
  return (
    <>
      <header className="bg-blue-500 p-4 text-white text-2xl font-bold">
        <Link
          to="/"
          className={location.pathname === "/" ? "underline" : "no-underline"}
        >
          Posts
        </Link>{" "}
        |{" "}
        <Link
          to="/comments"
          className={location.pathname === "/comments" ? "underline" : "no-underline"}
        >
          Comments
        </Link>{" "}
      </header>
      <Routes>
        <Route index element={<PostList />} />
        <Route path="comments" element={<CommentList />} />
      </Routes>
    </>
  );
}

export default App;
