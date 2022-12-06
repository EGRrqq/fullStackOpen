import React, { useState } from 'react'

const LoginForm = ({ submitUser }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        submitUser({ username, password })
        setUsername('')
        setPassword('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                username
                <input
                    type='text'
                    name='username'
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </div>
            <div>
                password
                <input
                    type='password'
                    name='password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )
}

export default LoginForm

