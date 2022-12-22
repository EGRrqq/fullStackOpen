import React from 'react'
import { Link, useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserDetails = () => {
    const users = useSelector((state) => state.users)

    const userMatch = useMatch('/users/:id')
    const matchedUser = userMatch
        ? users.find((user) => user.id === userMatch.params.id)
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
                    <li key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default UserDetails
