import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreate = (event) => {
        event.preventDefault()
        createBlog({ title, author, url })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return(
        <form onSubmit={handleCreate}>
            <div>
                title:
                <input
                    type='text'
                    name='title'
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
            </div>
            <div>
                author:
                <input
                    type='text'
                    name='author'
                    value={author}
                    onChange={(event) => setAuthor(event.target.value)}
                />
            </div>
            <div>
                url:
                <input
                    type='text'
                    name='url'
                    onChange={(event) => setUrl(event.target.value)}
                    value={url}
                />
            </div>
            <button type="submit">create</button>
        </form>
    )
}

export default BlogForm