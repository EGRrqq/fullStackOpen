import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { useMatch, useNavigate } from 'react-router-dom'
import Comments from './Comments'
import CommentForm from './CommentForm'

import {
    ButtonGroup,
    Button,
    Card,
    CardContent,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

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

            <Card>
                <CardContent>
                    <h2>{matchedBlog.title}</h2>
                    <p>{matchedBlog.url}</p>
                    <p>likes: {matchedBlog.likes}</p>
                    <p>added by {matchedBlog.author}</p>

                    <ButtonGroup>
                        <Button variant="contained" color='error' size='small' startIcon={<DeleteIcon />} onClick={removeBlog} id="remove-button">
                            remove
                        </Button>
                        <Button variant="contained" size='small' endIcon={<ThumbUpIcon />} onClick={incrementLikes} id="like-button">
                            like
                        </Button>
                    </ButtonGroup>
                </CardContent>
            </Card>

            <h3>comments</h3>
            <CommentForm blog={matchedBlog} />
            <Comments comments={matchedBlog.comments} />
        </div>
    )
}

export default Blog
