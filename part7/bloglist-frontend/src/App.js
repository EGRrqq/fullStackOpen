import { useState, useEffect } from 'react'

import BlogList from './components/BlogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

import blogService from './services/blogs'
import loginService from './services/login'

import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
    const [user, setUser] = useState(null)
    const dispatch = useDispatch()

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
            <BlogList />
        </div>
    )
}

export default App
