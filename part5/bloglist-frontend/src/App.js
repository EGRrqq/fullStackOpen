import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedBloglistUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBloglistUser')
        setUser(null)
    }

    const handleCreate  = async (event) => {
        event.preventDefault()
        const blogObject = {
            title, author, url
        }

        const createdBlog = await blogService.create(blogObject)
        setBlogs(blogs.concat(createdBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    const handleBlogUrlChange = (event) => {
        setUrl(event.target.value)
    }

    if (user === null) {
        return (
            <div>
                <h2>Log in to application</h2>

                <Notification message={errorMessage}/>

                <LoginForm
                    handleLogin={handleLogin}
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                />
            </div>
        )
    }

    return (
        <div>
            <h2>blogs</h2>

            <p>
                {user.username} logged in
                <button onClick={handleLogout}>logout</button>
            </p>

            <h2>create new</h2>

            <BlogForm
                handleCreate={handleCreate}
                handleTitleChange={handleTitleChange}
                handleAuthorChange={handleAuthorChange}
                handleBlogUrlChange={handleBlogUrlChange}
                title={title}
                author={author}
                url={url}
            />

            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default App
