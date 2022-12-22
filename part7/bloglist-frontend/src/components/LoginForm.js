import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(loginUser({ username, password }))
        setUsername('')
        setPassword('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>log in to application</h2>

            <div>
                username
                <input
                    id="username"
                    type="text"
                    name="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </div>
            <div>
                password
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <button type="submit" id="login-button">
                login
            </button>
        </form>
    )
}

export default LoginForm
