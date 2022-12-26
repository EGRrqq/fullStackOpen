import React from 'react'

import {
    TableContainer,
    Paper,
    Table,
    TableBody,
    TableRow,
    TableCell
} from '@mui/material'

const Comments = ({ comments }) => {
    return (
        <TableContainer component={Paper}>
            {comments.length > 0 ? (
                <Table>
                    <TableBody>
                        {comments.map((comment) => (
                            <TableRow key={comment.id}>
                                <TableCell>{comment.content}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>no comments yet...</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            )}
        </TableContainer>
    )
}

export default Comments
