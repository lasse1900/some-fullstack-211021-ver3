import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, removeBlog, user }) => {
  const [hidden, setHidden] = useState(true)

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

  const blogStyle = {
    paddingTop: 2,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 2,
  }

  const toggle = () => {
    setHidden(!hidden)
  }

  // const refreshPage = () => {
  //   window.location.reload(false)
  // }

  const like = async () => {
    blog.likes += 1
    try {
      await blogService.update(blog.id,blog)
      // refreshPage()
      toggle()
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
      <div style={blogStyle}>
        <ul style={{ listStyle: 'none' }}>
          <li className='title-value'>
            {blog.title}{' '}
            <button className="submit-toggleHide" onClick={() => toggle()}>hide</button>
          </li>
          <li>
            <a style={{ display: 'table-cell' }} href={blog.url} target='_blank' rel='noreferrer'>{blog.url}</a>
          </li>
          likes: {blog.likes}{' '}
          <button data-cy='like-submit' onClick={() => like()}>like</button>
          <li>{blog.author}</li>
          <button id='remove-button' style={buttonShow} onClick={remove}> remove</button>
        </ul>
      </div>
    )
  }

  if (hidden) {
    return (
      <div style={blogStyle}>
        <div style={{ listStyle: 'none' }}>
          <li>
            {blog.title} @{blog.author}{' '}
            <button className='submit-toggleView' onClick={() => toggle()}>view</button>
          </li>
        </div>
      </div>
    )
  }
}

export default Blog
