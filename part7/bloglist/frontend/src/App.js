import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { useField } from './hooks'
import { setMessage } from './reducers/notificationReducer'

const App = ({ setMessage }) => {
  const [blogs, setBlogs] = useState([])
  const username = useField('username')
  const password = useField('password')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, error) => {
    setMessage({ message, error }, 4)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    const credentials = {
      username: username.value,
      password: password.value
    }

    try {
      // console.log('credentials', credentials)
      const user = await loginService.login(
        credentials
      )
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      setUser(user)
      blogService.setToken(user.token)
      notify(`${username.value} logged in`, false)
      username.reset('')
      password.reset('')
    } catch (exception) {
      console.log('käyttäjätunnus tai salasana virheellinen')
      notify(`${exception.response.data.error}`, true)
    }
  }

  const omitReset = (hook) => {
    // eslint-disable-next-line no-unused-vars
    let { reset, ...hookWithoutReset } = hook
    // console.log('hookWitoutReset', JSON.stringify(hookWithoutReset))
    return hookWithoutReset
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    notify(`${user.username} logged out`, false)
    setUser(null)
  }

  const removeBlog = (removedBlog) => {
    const newBlogs = blogs.filter(blog => blog.id !== removedBlog.id)
    setBlogs(newBlogs)
  }

  if (user) {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification />
        <p>{`Logged in as ${user.name}`}</p>
        <br></br>
        <BlogForm
          blogs={blogs}
          setBlogs={setBlogs}
          notify={notify}
        />
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => (
            <Blog key={blog.id} blog={blog} user={user} removeBlog={removeBlog} notify={notify} />
          ))}
        <br></br>
        <button onClick={() => handleLogout()}>logout</button>
      </div>
    )
  }

  return (
    <div>
      <Notification />
      <LoginForm className='loginform'
        username={omitReset(username)}
        password={omitReset(password)}

        handleSubmit={handleLogin}
      />
    </div>

  )
}

const mapDispatchToProps = {
  setMessage
}

const ConnectApp = connect(null, mapDispatchToProps)(App)

export default ConnectApp