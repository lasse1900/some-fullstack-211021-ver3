import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import { connect } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = (props) => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type = 'success') => {
    props.setNotification({ message: message, type: type }, 2)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
    } catch (exception) {
      console.log('käyttäjätunnus tai salasana virheellinen')
      notify('käyttäjätunnus tai salasana virheellinen', 'error')
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const removeBlog = (removedBlog) => {
    const newBlogs = blogs.filter(blog => blog.id !== removedBlog.id)
    setBlogs(newBlogs)
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <div style={{ color: 'green', fontSize: '24px' }}>
            Logged in as {user.name}{' '}
            <button id='logout-button' onClick={() => handleLogout()}>logout</button>
          </div>
          <br></br>
          <BlogForm
            blogs={blogs}
            setBlogs={setBlogs}
            notify={notify}
            user={user}
          />
        </div>
      )}
      <div>
        <br></br>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              username={username}
              removeBlog={removeBlog}
            />
          ))}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log('state: ', state)

  return {
    notification: state.notification,
  }
}
const mapDispatchToProps = { setNotification }

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp
