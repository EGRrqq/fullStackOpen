import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

import { Button, Input } from '@mui/material'

const BlogForm = ({ changeVisibility }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const dispatch = useDispatch()

    const handleCreate = async (event) => {
        event.preventDefault()
        dispatch(createBlog({ title, author, url }))
        setTitle('')
        setAuthor('')
        setUrl('')
        changeVisibility()
    }

    return (
        <form onSubmit={handleCreate}>
            <div>
                <Input
                    placeholder="title"
                    id="title"
                    type="text"
                    name="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
            </div>
            <div>
                <Input
                    placeholder="author"
                    id="author"
                    type="text"
                    name="author"
                    value={author}
                    onChange={(event) => setAuthor(event.target.value)}
                />
            </div>
            <div>
                <Input
                    placeholder="url"
                    id="url"
                    type="text"
                    name="url"
                    onChange={(event) => setUrl(event.target.value)}
                    value={url}
                />
            </div>
            <Button variant="contained" color="primary" type="submit" size='small'>create</Button>
        </form>
    )
}

BlogForm.propTypes = {
    changeVisibility: PropTypes.func.isRequired,
}

export default BlogForm
