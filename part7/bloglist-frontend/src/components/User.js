import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import {
    TableCell, TableRow
} from '@mui/material'

const User = ({ user }) => {
    return (
        <TableRow>
            <TableCell>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
            </TableCell>
            <TableCell>
                {user.blogs.length}
            </TableCell>
        </TableRow>
    )
}

User.propTypes = {
    user: PropTypes.object.isRequired,
}

export default User
