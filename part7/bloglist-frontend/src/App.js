import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (userCredentials) => {
        try {
            const user = await loginService.login(userCredentials)
            blogService.setToken(user.token)
            window.localStorage.setItem(
                'loggedBloglistUser',
                JSON.stringify(user)
            )
            setUser(user)
        } catch (exception) {
            console.log(exception)
            dispatch(setNotification(exception.response.data.error, 5))
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBloglistUser')
        setUser(null)
    }

    const addBlog = async (blogObject) => {
        try {
            blogFormRef.current.toggleVisibility()
            const createdBlog = await blogService.create(blogObject)
            setBlogs(blogs.concat(createdBlog))
            dispatch(
                setNotification(
                    `a new blog '${createdBlog.title}' by ${createdBlog.author} added`,
                    5
                )
            )
        } catch (exception) {
            console.log(exception)
            dispatch(setNotification(exception.response.data.error, 5))
        }
    }

    const blogFormRef = useRef()

    const handleLike = async (updatedBlogObj) => {
        try {
            const updatedBlog = await blogService.update(updatedBlogObj)
            setBlogs(
                blogs.map((blog) =>
                    blog.id === updatedBlog.id ? updatedBlog : blog
                )
            )
            dispatch(setNotification(`you liked '${updatedBlog.title}'`, 5))
        } catch (exception) {
            console.log(exception)
            dispatch(setNotification(exception.response.data.error, 5))
        }
    }

    const handleRemove = async (blogId) => {
        try {
            await blogService.remove(blogId)
            setBlogs(blogs.filter((blog) => blog.id !== blogId))
        } catch (exception) {
            console.log(exception)
            dispatch(setNotification(exception.response.data.error, 5))
        }
    }

    if (user === null) {
        return (
            <div>
                <h2>log in to application</h2>

                <Notification />
                <LoginForm submitUser={handleLogin} />
            </div>
        )
    }

    return (
        <div>
            <h2>blogs</h2>

            <Notification />

            <p>
                {user.username} logged in
                <button onClick={handleLogout}>logout</button>
            </p>

            <h2>create new</h2>

            <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
            </Togglable>

            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        updateBlog={handleLike}
                        deleteBlog={handleRemove}
                    />
                ))}
        </div>
    )
}

export default App
