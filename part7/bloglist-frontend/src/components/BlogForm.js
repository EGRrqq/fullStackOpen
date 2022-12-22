import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = ({ changeVisibility }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const dispatch = useDispatch()

    const handleCreate = async (event) => {
        event.preventDefault()
        try {
            dispatch(createBlog({ title, author, url }))
            dispatch(
                setNotification(`a new blog '${title}' by ${author} added`, 5)
            )
            setTitle('')
            setAuthor('')
            setUrl('')
            changeVisibility()
        } catch (exception) {
            console.log(exception)
            dispatch(setNotification(exception.response.data.error, 5))
        }
    }

    return (
        <form onSubmit={handleCreate}>
            <div>
                title:
                <input
                    id="title"
                    type="text"
                    name="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
            </div>
            <div>
                author:
                <input
                    id="author"
                    type="text"
                    name="author"
                    value={author}
                    onChange={(event) => setAuthor(event.target.value)}
                />
            </div>
            <div>
                url:
                <input
                    id="url"
                    type="text"
                    name="url"
                    onChange={(event) => setUrl(event.target.value)}
                    value={url}
                />
            </div>
            <button type="submit">create</button>
        </form>
    )
}

BlogForm.propTypes = {
    changeVisibility: PropTypes.func.isRequired,
}

export default BlogForm
