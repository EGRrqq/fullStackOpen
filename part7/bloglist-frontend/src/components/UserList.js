import React from 'react'
import { useSelector } from 'react-redux'
import User from './User'

import {
    TableContainer,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    Paper
} from '@mui/material'

const UserList = () => {
    const users = useSelector((state) => state.users)

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <strong>users</strong>
                        </TableCell>
                        <TableCell>
                            <strong>blogs created</strong>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <User key={user.id} user={user} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default UserList
