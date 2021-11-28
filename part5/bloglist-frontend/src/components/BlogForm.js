import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const BlogForm = ({ blogs, setBlogs, notify }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [state, setState] = useState(false)

  const addBlog = async (event) => {
    try {
      event.preventDefault()
      let blogObject = {}
      for (const input of event.target.querySelectorAll('input')) {
        blogObject[input.name] = input.value
      }

      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      notify(`Added a new blog: ${blog.title}`, true)
      setTitle('')
      setAuthor('')
      setUrl('')
      setState(!state)
    } catch (error) {
      notify(`${error.response.data.error}`, false)
    }
  }

  const toggle = () => {
    setState(!state)
  }

  return (
    <div>
      <div style={{ display: state ? null : 'none' }}>
        <form onSubmit={(event) => addBlog(event)}>
          <div>
            title:
            <input
              type='text'
              name='title'
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              type='text'
              name='author'
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              type='text'
              name='url'
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <br></br>
          <button type='submit'>create</button>
          <br></br>
        </form>
      </div>
      <button
        onClick={toggle}
        className={'toggle--button' + (state ? 'toggle--close' : '')}
      >
        {state ? 'cancel' : 'create new blog'}
      </button>
    </div>
  )
}

BlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
}

export default BlogForm
