import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { useMatch, useNavigate } from 'react-router-dom'
import Comments from './Comments'
import CommentForm from './CommentForm'

const Blog = () => {
    const blogs = useSelector((state) => state.blogs)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const blogMatch = useMatch('/blogs/:id')
    const matchedBlog = blogMatch
        ? blogs.find((blog) => blog.id === blogMatch.params.id)
        : null

    const incrementLikes = () => {
        const blogObj = { ...matchedBlog, likes: matchedBlog.likes + 1 }
        dispatch(likeBlog(blogObj))
    }

    const removeBlog = () => {
        if (
            window.confirm(
                `Remove blog '${matchedBlog.title}' by ${matchedBlog.author}?`
            )
        ) {
            dispatch(deleteBlog(matchedBlog.id))
            navigate('/')
        }
    }

    if (!matchedBlog) {
        return null
    }

    return (
        <div className="blog-details">
            <h2>{matchedBlog.title}</h2>
            <div>{matchedBlog.url}</div>
            <div>
                likes: {matchedBlog.likes}
                <button onClick={incrementLikes} id="like-button">
                    like
                </button>
            </div>
            <div>added by {matchedBlog.author}</div>
            <button onClick={removeBlog} id="remove-button">
                remove
            </button>
            <h3>comments</h3>
            <CommentForm blog={matchedBlog} />
            <Comments comments={matchedBlog.comments} />
        </div>
    )
}

export default Blog
