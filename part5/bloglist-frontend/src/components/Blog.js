import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
    const [visible, setVisible] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const hideDetails = { display: visible ? '' : 'none' }

    const toggleDetails = () => {
        setVisible(!visible)
    }

    const incrementLikes = () => {
        const blogObj = { ...blog, likes: blog.likes + 1 }
        updateBlog(blogObj)
    }

    const removeBlog = () => {
        if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)) {
            deleteBlog(blog.id)
        }
    }

    return (
        <div style={blogStyle}>
            {blog.title} {blog.author}
            <button onClick={toggleDetails}>{visible ? 'hide' : 'show'}</button>
            <div style={hideDetails}>
                <div>{blog.url}</div>
                <div>
                    likes: {blog.likes}
                    <button onClick={incrementLikes}>like</button>
                </div>
                <div>{blog.user.name}</div>
                <button onClick={removeBlog}>remove</button>
            </div>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    updateBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
}

export default Blog