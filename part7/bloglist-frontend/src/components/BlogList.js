import React, { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { initializeBlogs } from '../reducers/blogReducer'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'

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
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm changeVisibility={handleVisibility} />
            </Togglable>

            {[...blogs]
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <Blog key={blog.id} blog={blog} />
                ))}
        </>
    )
}

export default BlogList
