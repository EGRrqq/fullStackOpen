import React from 'react'
import { useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserDetail = () => {
    const users = useSelector((state) => state.users)

    const userMatch = useMatch('/users/:id')
    const matchedUser = userMatch
        ? users.find(user => user.id === userMatch.params.id)
        : null

    if (!matchedUser) {
        return null
    }

    return (
        <>
            <h2>{matchedUser.username}</h2>
            <h3>added blogs</h3>
            <ul>
                {matchedUser.blogs.map((blog) => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </>
    )
}

export default UserDetail
