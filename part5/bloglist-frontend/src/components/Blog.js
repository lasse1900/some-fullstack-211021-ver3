import React, { useState } from 'react'
import blogService from '../services/blogs'
import '../index.css'

const Blog = ({ blog, removeBlog, user }) => {
  const [hidden, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const blogOwner = () => {
    let Boolean = false
    try {
      Boolean = blog.author === user.username
      return Boolean
    } catch (error) {
      // console.log(error)
      return
    }
  }

  const buttonShow = { display: blogOwner() ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!hidden)
  }

  const like = async () => {
    blog.likes += 1
    try {
      blogService.update(blog.id, blog)
    } catch (error) {
      console.log('error', error)
    }
  }

  const remove = async () => {
    if (window.confirm(`remove blog ${blog.title}? by ${blog.author}`)) {
      try {
        removeBlog(blog)
        await blogService.remove(blog.id)
      } catch (error) {
        console.log('error', error)
      }
    }
  }

  if (!hidden) {
    return (
      <div style={blogStyle} >
        <div onClick={toggleVisibility}>
          {blog.title} {blog.author}
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div onClick={toggleVisibility}>
        {blog.title}
        <br />
        <a
          style={{ display: 'table-cell' }}
          href={blog.url}
          target='_blank'
          rel='noreferrer'
        >
          {blog.url}
        </a>
        {blog.likes} - likes <button onClick={like}>like</button>
        <br /> added by: {blog.author}
        <br />{' '}
        <button style={buttonShow} onClick={remove}>
          remove
        </button>
      </div>
    </div>
  )
}

export default Blog
