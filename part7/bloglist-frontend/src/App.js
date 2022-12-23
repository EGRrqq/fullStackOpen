import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import Blog from './components/Blog'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import UserDetails from './components/UserDetails'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Navigation from './components/Navigation'
import { initializeUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(initializeUser())
        dispatch(initializeUsers())
    }, [])

    if (user === null) {
        return (
            <div>
                <Notification />
                <LoginForm />
            </div>
        )
    }

    return (
        <div>
            <Navigation />
            <h2>blog app</h2>
            <Notification />

            <Routes>
                <Route path="/" element={<BlogList />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/users/:id" element={<UserDetails />} />
                <Route path="/blogs/:id" element={<Blog />} />
            </Routes>
        </div>
    )
}

export default App
