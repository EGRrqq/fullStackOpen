const BlogForm = ({ handleCreate, handleTitleChange, handleAuthorChange, handleBlogUrlChange, title, author, url }) => {
    return(
        <form onSubmit={handleCreate}>
            <div>
                <label>
                    title:
                    <input
                        type="text"
                        onChange={handleTitleChange}
                        value={title}
                    />
                </label>
            </div>
            <div>
                <label>
                    author:
                    <input
                        type="text"
                        onChange={handleAuthorChange}
                        value={author}
                    />
                </label>
            </div>
            <div>
                <label>
                    url:
                    <input
                        type="text"
                        onChange={handleBlogUrlChange}
                        value={url}
                    />
                </label>
            </div>
            <button type="submit">create</button>
        </form>
    )
}

export default BlogForm