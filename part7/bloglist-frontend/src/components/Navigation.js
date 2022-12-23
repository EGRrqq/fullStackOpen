import React from 'react'
import { Link } from 'react-router-dom'
import LogoutForm from './LogoutForm'

const navigationStyle = {
    background: '#E0E0E0'
}

const Navigation = () => {
    return (
        <div style={navigationStyle}>
            <Link style={{ paddingRight: 10 }} to="/">
                blogs
            </Link>
            <Link style={{ paddingRight: 10 }} to="/users">
                users
            </Link>
            <LogoutForm />
        </div>
    )
}

export default Navigation
