import React, { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { initializeBlogs } from '../reducers/blogReducer'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
} from '@mui/material'

const BlogList = () => {
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blogs)
    const blogFormRef = useRef()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [])

    const handleVisibility = () => {
        blogFormRef.current.toggleVisibility()
    }

    return (
        <>
            <Togglable buttonLabel="create new" ref={blogFormRef}>
                <BlogForm changeVisibility={handleVisibility} />
            </Togglable>

            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {[...blogs]
                            .sort((a, b) => b.likes - a.likes)
                            .map((blog) => (
                                <TableRow key={blog.id} className="blog-container">
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

export default BlogList
