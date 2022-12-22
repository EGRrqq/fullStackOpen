import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch()

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    const hideDetails = { display: visible ? '' : 'none' }

    const toggleDetails = () => {
        setVisible(!visible)
    }

    const incrementLikes = () => {
        const blogObj = { ...blog, likes: blog.likes + 1 }
        dispatch(likeBlog(blogObj))
    }

    const removeBlog = () => {
        if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)) {
            dispatch(deleteBlog(blog.id))
        }
    }

    return (
        <div style={blogStyle} className="blog-container">
            {blog.title} {blog.author}
            <button onClick={toggleDetails} id="details-button">
                {visible ? 'hide' : 'show'}
            </button>
            <div style={hideDetails} className="blog-details">
                <div>{blog.url}</div>
                <div>
                    likes: {blog.likes}
                    <button onClick={incrementLikes} id="like-button">
                        like
                    </button>
                </div>
                <div>{blog.user.name}</div>
                <button onClick={removeBlog} id="remove-button">
                    remove
                </button>
            </div>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
}

export default Blog
