import React from 'react'
import { Link, useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
} from '@mui/material'

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
            <h3>{matchedUser.username} added blogs</h3>
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {matchedUser.blogs
                            .map((blog) => (
                                <TableRow key={blog.id}>
                                    <TableCell>
                                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default UserDetails
