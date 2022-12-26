import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'

import {
    Input,
    Button
} from '@mui/material'

import CommentIcon from '@mui/icons-material/Comment'

const CommentForm = ({ blog }) => {
    const [content, setContent] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = async (event) => {
        event.preventDefault()
        dispatch(commentBlog(content, blog))
        setContent('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input
                placeholder='add a comment…'
                type="text"
                name="content"
                id="comment-content-input"
                onChange={(event) => setContent(event.target.value)}
                value={content}
            />
            <Button variant="contained" size='small' color="primary" type="submit" endIcon={<CommentIcon />}>comment</Button>
        </form>
    )
}

export default CommentForm
