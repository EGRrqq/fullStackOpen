import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })

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

            <p>{user.username} logged in</p>

            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default App
