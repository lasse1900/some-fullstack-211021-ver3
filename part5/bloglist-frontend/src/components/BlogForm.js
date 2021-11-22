import React, { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ blogs, setBlogs, notify }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (event) => {
    try {
      event.preventDefault();
      let blogObject = {};
      for (const input of event.target.querySelectorAll("input")) {
        blogObject[input.name] = input.value;
      }
  
      const blog = await blogService.create(blogObject);
      setBlogs(blogs.concat(blog));
      notify(`Added a new blog: ${blog.title}`, true)
      setTitle("");
      setAuthor("");
      setUrl("");
      console.log('Blog added')
    } catch (error) {
      notify(`${error.response.data.error}`, false)
    }

  };

  return (
    <div>
      <form onSubmit={(event) => addBlog(event)}>
        <div>
          title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <br></br>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
