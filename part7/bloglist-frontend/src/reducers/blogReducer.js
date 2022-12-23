import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
        removeBlog(state, action) {
            return state.filter((blog) => blog.id !== action.payload)
        },
        updateFor(state, action) {
            return state.map((blog) =>
                blog.id === action.payload.id ? action.payload : blog
            )
        },
    },
})

export const initializeBlogs = () => {
    return async (dispatch) => {
        try {
            const blogs = await blogService.getAll()
            dispatch(setBlogs(blogs))
        } catch (exception) {
            console.log(exception)
            dispatch(setNotification(exception.response.data.error, 5))
        }
    }
}

export const createBlog = (blogObj) => {
    return async (dispatch) => {
        try {
            const newBlog = await blogService.create(blogObj)
            dispatch(appendBlog(newBlog))
            dispatch(
                setNotification(
                    `a new blog '${blogObj.title}' by ${blogObj.author} added`,
                    5
                )
            )
        } catch (exception) {
            console.log(exception)
            dispatch(setNotification(exception.response.data.error, 5))
        }
    }
}

export const deleteBlog = (blogId) => {
    return async (dispatch) => {
        try {
            await blogService.remove(blogId)
            dispatch(removeBlog(blogId))
        } catch (exception) {
            console.log(exception)
            dispatch(setNotification(exception.response.data.error, 5))
        }
    }
}

export const likeBlog = (updatedBlogObj) => {
    return async (dispatch) => {
        try {
            const updatedBlog = await blogService.update(updatedBlogObj)
            dispatch(updateFor(updatedBlog))
        } catch (exception) {
            console.log(exception)
            dispatch(setNotification(exception.response.data.error, 5))
        }
    }
}

export const commentBlog = (content, blog) => {
    return async (dispatch) => {
        try {
            const savedComment = await blogService.addComment(
                { content },
                blog.id
            )
            delete savedComment.blog
            dispatch(
                updateFor({
                    ...blog,
                    comments: [...blog.comments, savedComment],
                })
            )
        } catch (exception) {
            console.log(exception)
            dispatch(setNotification(exception.response.data.error, 5))
        }
    }
}

export const { setBlogs, appendBlog, removeBlog, updateFor } = blogSlice.actions
export default blogSlice.reducer
