import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import BlogList from './components/BlogList'
import UserList from './components/UserList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
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
            <h2>blogs</h2>

            <Notification />
            <LogoutForm />

            <Routes>
                <Route path='/' element={<BlogList />} />
                <Route path='/users' element={<UserList />} />
            </Routes>
        </div>
    )
}

export default App
