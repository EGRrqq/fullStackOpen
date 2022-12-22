import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import BlogList from './components/BlogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import { initializeUser } from './reducers/userReducer'

const App = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(initializeUser())
    }, [])

    if (user === null) {
        return (
            <div>
                <h2>log in to application</h2>

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

            <h2>create new</h2>
            <BlogList />
        </div>
    )
}

export default App
