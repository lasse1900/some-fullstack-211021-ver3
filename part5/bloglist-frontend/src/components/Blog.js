import React, { useState } from "react";
import blogService from '../services/blogs'

const Blog = ({ blog, removeBlog, user }) => {
  const [hidden, setHidden] = useState(false);
  const hideDeleteButton = (blog.author === user.name)

  console.log('blog author', blog.author, user.name)

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

  const refreshPage = () => {
    window.location.reload(false);
  };

  const like = async () => {
    blog.likes += 1;
    try {
      await blogService.update(blog.id,blog);
      refreshPage();
      // toggle()
    } catch (error) {
      console.log("error", error);
    }
  };

  const deleteBlog = async () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) return;
    try {
      removeBlog(blog)
      await blogService.remove(blog.id)
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
            <a style={{display: "table-cell"}} href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a>
          </li>
          likes: {blog.likes} <button onClick={like}>like</button>
          <li>{blog.author}</li>
          <button style={{ display: hideDeleteButton ? false : "none"}} onClick={deleteBlog}>remove</button>
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
