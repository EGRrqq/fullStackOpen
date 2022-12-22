import React, { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { initializeBlogs } from '../reducers/blogReducer'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'

const BlogList = () => {
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blogs)
    const blogFormRef = useRef()

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [])

    const handleVisibility = () => {
        blogFormRef.current.toggleVisibility()
    }

    return (
        <>
            <h2>create new</h2>

            <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm changeVisibility={handleVisibility} />
            </Togglable>

            {[...blogs]
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <div
                        key={blog.id}
                        style={blogStyle}
                        className="blog-container"
                    >
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </div>
                ))}
        </>
    )
}

export default BlogList
