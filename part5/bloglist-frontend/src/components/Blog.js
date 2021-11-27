import React, { useState } from "react";
import blogAddition from "../services/blogs";

const Blog = ({ blog }) => {
  const [hidden, setHidden] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggle = () => {
    setHidden(!hidden);
  };

  // const refreshPage = () => {
  //   window.location.reload(false);
  // };

  const like = async () => {
    blog.likes += 1;
    try {
      blogAddition.update(blog.id, blog);
      // refreshPage();
      toggle()
    } catch (error) {
      console.log("error", error);
    }
  };

  if (!hidden) {
    return (
      <div style={blogStyle}>
        <ul style={{ listStyle: "none" }}>
          <li>
            {blog.title} <button onClick={() => toggle()}>hide</button>
          </li>
          <li>
            <a href={blog.url}>{blog.url}</a>
          </li>
          likes: {blog.likes} <button onClick={like}>like</button>
          <li>{blog.author}</li>
        </ul>
      </div>
    );
  }

  if (hidden) {
    return (
      <div style={blogStyle}>
        <div style={{ listStyle: "none" }}>
          <li>
            {blog.title} {blog.author}{" "}
            <button onClick={() => toggle()}>view</button>
          </li>
        </div>
      </div>
    );
  }
};

export default Blog;
