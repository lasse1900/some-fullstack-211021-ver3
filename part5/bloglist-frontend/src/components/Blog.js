import React, { useState } from "react";

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
          <li>likes: {blog.likes}</li>
          <li>{blog.author}</li>
        </ul>
      </div>
    );
  }

  if (hidden) {
    return (
      <div style={{ listStyle: "none", blogStyle }}>
        <li>
          {blog.title} {blog.author}{" "}
          <button onClick={() => toggle()}>view</button>
        </li>
      </div>
    );
  }
};

export default Blog;
